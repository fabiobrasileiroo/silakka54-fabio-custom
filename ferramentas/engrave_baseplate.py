#!/usr/bin/env python3
"""engrave_baseplate.py — Gravador das baseplates Silakka54 (face inferior).

Garante que o texto fique 100% legível ao olhar o teclado por baixo (espelhamento
2D no eixo X antes da extrusão para compensar a rotação da face inferior).
"""
import argparse
import os
import sys

import numpy as np
import shapely
import shapely.affinity
import trimesh
import trimesh.boolean
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
import manifold3d

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_BASE = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "00-original",
                                             "case-keyboard", "silakka54-baseplate-screwunderneath.stl"))
DEFAULT_FONTS = os.path.join(SCRIPT_DIR, "fonts")
BASE_Z_BOT = 0.60
DEFAULT_DEPTH = 0.45


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


def extrude_any(poly, height):
    if poly.geom_type == "MultiPolygon":
        parts = [trimesh.creation.extrude_polygon(g, height=height) for g in poly.geoms]
        return trimesh.util.concatenate(parts)
    return trimesh.creation.extrude_polygon(poly, height=height)


def engrave_baseplate(side="LH", text="foi javascript que me deu", out_path=None):
    font = os.path.join(DEFAULT_FONTS, "jetbrains-mono-bold.ttf")
    base_m = trimesh.load(DEFAULT_BASE)
    xc_orig = 97.63125

    if side == "RH":
        # Espelha o base mesh original primeiro
        M = np.array([[-1, 0, 0, 2 * xc_orig],
                      [0, 1, 0, 0],
                      [0, 0, 1, 0],
                      [0, 0, 0, 1]], dtype=float)
        base_m.apply_transform(M)
        base_m.fix_normals()
        x_target = 2 * xc_orig - 25.5
        rot = -90.0
    else:
        x_target = 25.5
        rot = 90.0

    p = make_text_polygon(text, cap=3.8, font=font)
    p = shapely.affinity.scale(p, xfact=-1, yfact=1, origin="center")
    p = shapely.affinity.rotate(p, rot, origin="center")
    tb = p.bounds
    txc = (tb[0] + tb[2]) / 2.0
    tyc = (tb[1] + tb[3]) / 2.0
    p = shapely.affinity.translate(p, xoff=x_target - txc, yoff=-69.5 - tyc)

    text_solid = extrude_any(p, height=DEFAULT_DEPTH)
    text_solid.apply_translation([0, 0, BASE_Z_BOT])

    m_base = to_manifold(base_m)
    m_text = to_manifold(text_solid)
    m_cut = m_base - m_text

    tri_out = from_manifold(m_cut)
    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri_out.export(out_path)
    print(f"Generated Baseplate {side} ({text}): wt={tri_out.is_watertight}, vol={tri_out.volume:.1f} mm³")
    return tri_out


def main():
    engrave_baseplate("LH", "foi javascript que me deu", "01-final/LH/silakka54-baseplate-js-LH.stl")
    engrave_baseplate("RH", "foi java que me deu", "01-final/RH/silakka54-baseplate-java-RH.stl")


if __name__ == "__main__":
    main()
