#!/usr/bin/env python3
"""engrave_slim_cover.py — Gravador para os covers MCU da Slim Screwless Case (Johnny5iv).

Gera:
  - LH: silakka54-slim-mcu-cover-F-linux-LH.stl (F na plaqueta + 'linux' na crista lateral)
  - RH: silakka54-slim-mcu-cover-B-linux-RH.stl (B na plaqueta + 'linux' na crista lateral)
"""
import argparse
import os
import sys

import numpy as np
import shapely
import shapely.affinity
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
import manifold3d
import trimesh

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.path.join(SCRIPT_DIR, "fonts")
SLIM_ORIG_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "00-original", "slim-screwless-case"))
OUT_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "01-final", "slim-screwless-case"))


def extrude_any(poly, height):
    if poly.geom_type == "MultiPolygon":
        parts = [trimesh.creation.extrude_polygon(g, height=height) for g in poly.geoms]
        return trimesh.util.concatenate(parts)
    return trimesh.creation.extrude_polygon(poly, height=height)


def to_manifold(m):
    vp = np.ascontiguousarray(m.vertices, dtype=np.float32)
    tv = np.ascontiguousarray(m.faces, dtype=np.uint32)
    return manifold3d.Manifold(manifold3d.Mesh(vert_properties=vp, tri_verts=tv))


def from_manifold(mani):
    mesh_out = mani.to_mesh()
    return trimesh.Trimesh(vertices=mesh_out.vert_properties[:, :3], faces=mesh_out.tri_verts)


def flatten_mpath(path, n_curve=48):
    from matplotlib.path import Path as MPath
    verts, codes = path.vertices, path.codes
    if codes is None:
        return [verts]
    segs = []
    cur = []
    i = 0
    while i < len(verts):
        c = codes[i]
        if c == MPath.MOVETO:
            if cur:
                segs.append(np.asarray(cur))
            cur = [verts[i]]
            i += 1
        elif c == MPath.LINETO:
            cur.append(verts[i])
            i += 1
        elif c == MPath.CURVE4:
            p0, p1, p2, p3 = cur[-1], verts[i], verts[i + 1], verts[i + 2]
            ts = np.linspace(0, 1, n_curve)
            pts = (np.outer((1 - ts) ** 3, p0) + np.outer(3 * (1 - ts) ** 2 * ts, p1)
                   + np.outer(3 * (1 - ts) * ts ** 2, p2) + np.outer(ts ** 3, p3))
            cur.extend(pts[1:])
            i += 3
        elif c == MPath.CURVE3:
            p0, p1, p2 = cur[-1], verts[i], verts[i + 1]
            ts = np.linspace(0, 1, n_curve)
            pts = (np.outer((1 - ts) ** 2, p0) + np.outer(2 * (1 - ts) * ts, p1)
                   + np.outer(ts ** 2, p2))
            cur.extend(pts[1:])
            i += 2
        elif c == MPath.CLOSEPOLY:
            cur.append(cur[0])
            i += 1
    if cur:
        segs.append(np.asarray(cur))
    return segs


def rings_to_polygons(rings):
    polys = []
    ring_polys = []
    for r in rings:
        if len(r) < 4:
            continue
        p = Polygon(r)
        if not p.is_valid:
            p = p.buffer(0)
        if p.area < 1e-9:
            continue
        ring_polys.append(p)
    for i, out in enumerate(ring_polys):
        contained = False
        for j, other in enumerate(ring_polys):
            if i != j and other.area > out.area and other.contains(out.representative_point()):
                contained = True
                break
        if contained:
            continue
        holes = []
        for h in ring_polys:
            if h is out:
                continue
            if out.contains(h.representative_point()):
                holes.append(h.exterior.coords[:])
        poly = Polygon(out.exterior.coords[:], holes)
        if poly.is_valid:
            polys.append(poly)
    return polys


def make_text_polygon(text, cap, font):
    from matplotlib.textpath import TextPath
    from matplotlib.font_manager import FontProperties
    size = cap / 0.729
    tp = TextPath((0, 0), text, size=size, prop=FontProperties(fname=font))
    rings = flatten_mpath(tp)
    polys = rings_to_polygons(rings)
    if len(polys) == 1 and isinstance(polys[0], Polygon):
        p = polys[0]
    else:
        p = unary_union(polys)
    h = p.bounds[3] - p.bounds[1]
    scale = cap / h
    p = shapely.affinity.scale(p, xfact=scale, yfact=scale, origin=(0, 0))
    tol = min(0.02, cap * 0.004)
    p = p.simplify(tol, preserve_topology=True)
    if not p.is_valid:
        p = p.buffer(0)
    return p


def engrave_slim_cover(side="LH", plaque_text="F", side_text="linux", out_path=None):
    font_plaque = os.path.join(FONTS_DIR, "audiowide.ttf")
    font_side = os.path.join(FONTS_DIR, "jetbrains-mono-bold.ttf")

    if side == "LH":
        in_stl = os.path.join(SLIM_ORIG_DIR, "silakka54_mcu_left.stl")
        px0, px1 = 173.0, 193.5
        py0, py1 = -49.5, -34.5
        xc = (px0 + px1) / 2.0  # 183.25
        yc = (py0 + py1) / 2.0  # -42.0
        side_x = 192.8
        side_rot = -90
    else:
        in_stl = os.path.join(SLIM_ORIG_DIR, "silakka54_mcu_right.stl")
        px0, px1 = -193.5, -173.0
        py0, py1 = -49.5, -34.5
        xc = (px0 + px1) / 2.0  # -183.25
        yc = (py0 + py1) / 2.0  # -42.0
        side_x = -192.8
        side_rot = 90

    z_top = 14.60
    plaque_z_top = z_top + 0.35  # 14.95
    plaque_z_bot = 12.0

    # 1. Base mesh
    base_m = trimesh.load(in_stl)

    # 2. Plaque box with rounded corners
    box_2d = Polygon([(px0 + 2, py0), (px1 - 2, py0), (px1, py0 + 2), (px1, py1 - 2),
                      (px1 - 2, py1), (px0 + 2, py1), (px0, py1 - 2), (px0, py0 + 2)]).buffer(0.8)
    plaque_mesh = extrude_any(box_2d, height=plaque_z_top - plaque_z_bot)
    plaque_mesh.apply_translation([0, 0, plaque_z_bot])

    # 3. Union base + plaque
    m_base = to_manifold(base_m)
    m_plaque = to_manifold(plaque_mesh)
    m_combined = m_base + m_plaque

    # 4. Text on plaque
    p_text = make_text_polygon(plaque_text, cap=5.5, font=font_plaque)
    tb = p_text.bounds
    txc = (tb[0] + tb[2]) / 2.0
    tyc = (tb[1] + tb[3]) / 2.0
    p_text = shapely.affinity.translate(p_text, xoff=xc - txc, yoff=yc - tyc)

    text_ext = extrude_any(p_text, height=2.0)
    text_ext.apply_translation([0, 0, plaque_z_top - 0.55])
    m_text = to_manifold(text_ext)
    m_final = m_combined - m_text

    # 5. Side text
    if side_text:
        p_side = make_text_polygon(side_text, cap=2.6, font=font_side)
        p_side = shapely.affinity.rotate(p_side, side_rot, origin="center")
        sb = p_side.bounds
        sxc = (sb[0] + sb[2]) / 2.0
        syc = (sb[1] + sb[3]) / 2.0
        p_side = shapely.affinity.translate(p_side, xoff=side_x - sxc, yoff=-80.0 - syc)

        side_ext = extrude_any(p_side, height=2.0)
        side_ext.apply_translation([0, 0, z_top - 0.55])
        m_side = to_manifold(side_ext)
        m_final = m_final - m_side

    tri_out = from_manifold(m_final)

    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri_out.export(out_path)
    print(f"Generated {side} ({plaque_text} + {side_text}): wt={tri_out.is_watertight}, vol={tri_out.volume:.1f} mm³, faces={len(tri_out.faces)}")
    return tri_out


def main():
    parser = argparse.ArgumentParser(description="Gravar covers slim silakka54")
    parser.add_argument("--side", choices=["LH", "RH", "BOTH"], default="BOTH")
    parser.add_argument("--plaque-lh", default="F")
    parser.add_argument("--plaque-rh", default="B")
    parser.add_argument("--side-text", default="linux")
    args = parser.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)
    if args.side in ("LH", "BOTH"):
        engrave_slim_cover("LH", args.plaque_lh, args.side_text,
                           os.path.join(OUT_DIR, f"silakka54-slim-mcu-cover-{args.plaque_lh}-{args.side_text}-LH.stl"))
    if args.side in ("RH", "BOTH"):
        engrave_slim_cover("RH", args.plaque_rh, args.side_text,
                           os.path.join(OUT_DIR, f"silakka54-slim-mcu-cover-{args.plaque_rh}-{args.side_text}-RH.stl"))


if __name__ == "__main__":
    main()
