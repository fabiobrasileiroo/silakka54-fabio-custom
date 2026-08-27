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

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_BASE = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "00-original",
                                             "case-keyboard", "silakka54-baseplate-screwunderneath.stl"))
DEFAULT_FONTS = os.path.join(SCRIPT_DIR, "fonts")

# Área da faixa sólida inferior disponível para gravação na baseplate esquerda:
# x: ~21.5 a 29.5, y: -108.5 a -30.5, face z: 0.60
BASE_Z_BOT = 0.60
DEFAULT_DEPTH = 0.50  # profundidade 0.50mm -> vai de z=0.60 até z=1.10


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


def mirror_x(mesh, xc):
    M = np.array([[-1, 0, 0, 2 * xc],
                  [0, 1, 0, 0],
                  [0, 0, 1, 0],
                  [0, 0, 0, 1]], dtype=float)
    m = mesh.copy()
    m.apply_transform(M)
    m.fix_normals()
    return m


def solid_difference(bodies, label, retries=6):
    cut = trimesh.boolean.difference(bodies, engine="manifold")
    for _ in range(retries):
        if cut.is_watertight:
            break
        print(f"  {label}: difference not watertight, retrying")
        cut = trimesh.boolean.difference(bodies, engine="manifold")
    assert cut.is_watertight, f"{label}: difference not watertight"
    return cut


def build_baseplate_text_solid(text, cap, font, x_center, y_center, rot_deg=90.0, depth=0.50):
    """Cria sólido de corte para a face inferior (z=0.60..0.60+depth).

    IMPORTANTE: O polígono 2D é espelhado no eixo X (xfact=-1) para que,
    quando a base for vista de baixo (bottom view, olhando pelo eixo -Z),
    o texto fique legível e não-invertido.
    """
    p = make_text_polygon(text, cap, font)
    # Espelhamento horizontal para visualização na face inferior:
    p = shapely.affinity.scale(p, xfact=-1, yfact=1, origin="center")
    # Rotação para seguir a borda vertical:
    p = shapely.affinity.rotate(p, rot_deg, origin="center")
    b = p.bounds
    pw, ph = b[2] - b[0], b[3] - b[1]
    p = shapely.affinity.translate(p, x_center - (b[0] + b[2]) / 2.0, y_center - (b[1] + b[3]) / 2.0)

    m = extrude_any(p, height=depth)
    # Posiciona no Z inferior (z_bot até z_bot + depth)
    m.apply_translation([0, 0, BASE_Z_BOT])
    return m


def main():
    ap = argparse.ArgumentParser(description="Silakka54 baseplate engraver (bottom view readable)")
    ap.add_argument("--side", choices=["LH", "RH", "BOTH"], default="BOTH")
    ap.add_argument("--base", default=DEFAULT_BASE)
    ap.add_argument("--fonts-dir", default=DEFAULT_FONTS)
    ap.add_argument("--out-dir", default="out")
    ap.add_argument("--text-lh", default="Foi o JavaScript que me deu")
    ap.add_argument("--text-rh", default="Foi o Java que me deu")
    ap.add_argument("--font", default="jetbrains-mono-bold.ttf")
    ap.add_argument("--cap", type=float, default=2.6)
    ap.add_argument("--depth", type=float, default=0.50)
    ap.add_argument("--x-lh", type=float, default=25.5)
    ap.add_argument("--y-lh", type=float, default=-69.5)
    ap.add_argument("--rot", type=float, default=90.0)
    args = ap.parse_args()

    font_path = os.path.join(args.fonts_dir, args.font)
    os.makedirs(args.out_dir, exist_ok=True)

    base = trimesh.load(args.base)
    xc = (base.bounds[0][0] + base.bounds[1][0]) / 2.0
    print(f"Baseplate original: {base.vertices.shape[0]} verts, wt: {base.is_watertight}, xc={xc:.3f}")

    sides = ["LH", "RH"] if args.side == "BOTH" else [args.side]
    for side in sides:
        text = args.text_lh if side == "LH" else args.text_rh
        tag = "js" if side == "LH" else "java"
        name = f"silakka54-baseplate-{tag}-{side}.stl"
        print(f"== {side}: texto '{text}' -> {name}")

        mirrored = (side == "RH")
        base_mesh = mirror_x(base, xc) if mirrored else base.copy()

        # Posição X da faixa
        # LH x_center ≈ 25.5
        # RH x_center ≈ 2*xc - 25.5 = 2*97.63125 - 25.5 = 169.76
        x_c = (2 * xc - args.x_lh) if mirrored else args.x_lh
        y_c = args.y_lh

        text_solid = build_baseplate_text_solid(
            text=text,
            cap=args.cap,
            font=font_path,
            x_center=x_c,
            y_center=y_c,
            rot_deg=args.rot,
            depth=args.depth
        )

        body = solid_difference([base_mesh, text_solid], f"{side} baseplate")
        out_path = os.path.join(args.out_dir, name)
        body.export(out_path)
        print(f"  Salvo: {out_path} | Watertight: {body.is_watertight}, Volume: {body.volume:.1f} mm³")


if __name__ == "__main__":
    main()
