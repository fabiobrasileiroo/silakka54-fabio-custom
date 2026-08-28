#!/usr/bin/env python3
"""engrave_slim_cover.py — Gravador para os covers MCU da Slim Screwless Case (Johnny5iv).

Gera:
  - LH: silakka54-slim-mcu-cover-F-linux-LH.stl (F na plaqueta + 'linux' na crista lateral centralizada longe dos furos)
  - RH: silakka54-slim-mcu-cover-B-linux-RH.stl (B na plaqueta + 'linux' na crista lateral centralizada longe dos furos)
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

import ferramentas.engrave_baseplate as eb

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.path.join(SCRIPT_DIR, "fonts")
SLIM_ORIG_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "00-original", "slim-screwless-case"))
OUT_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "01-final", "slim-screwless-case"))


def to_manifold(m):
    vp = np.ascontiguousarray(m.vertices, dtype=np.float32)
    tv = np.ascontiguousarray(m.faces, dtype=np.uint32)
    return manifold3d.Manifold(manifold3d.Mesh(vert_properties=vp, tri_verts=tv))


def from_manifold(mani):
    mesh_out = mani.to_mesh()
    return trimesh.Trimesh(vertices=mesh_out.vert_properties[:, :3], faces=mesh_out.tri_verts)


def engrave_slim_cover(side="LH", plaque_text="F", side_text="linux", out_path=None):
    font_plaque = os.path.join(FONTS_DIR, "audiowide.ttf")
    font_side = os.path.join(FONTS_DIR, "jetbrains-mono-bold.ttf")

    if side == "LH":
        in_stl = os.path.join(SLIM_ORIG_DIR, "silakka54_mcu_left.stl")
        px0, px1 = 173.0, 193.5
        py0, py1 = -49.5, -34.5
        xc = (px0 + px1) / 2.0  # 183.25
        yc = (py0 + py1) / 2.0  # -42.0
        side_x = 190.7
        side_rot = -90
    else:
        in_stl = os.path.join(SLIM_ORIG_DIR, "silakka54_mcu_right.stl")
        px0, px1 = -193.5, -173.0
        py0, py1 = -49.5, -34.5
        xc = (px0 + px1) / 2.0  # -183.25
        yc = (py0 + py1) / 2.0  # -42.0
        side_x = -190.7
        side_rot = 90

    z_top = 14.60
    plaque_z_top = z_top + 0.35  # 14.95
    plaque_z_bot = 12.0

    # 1. Base mesh
    base_m = trimesh.load(in_stl)

    # 2. Plaque box with rounded corners
    box_2d = Polygon([(px0 + 2, py0), (px1 - 2, py0), (px1, py0 + 2), (px1, py1 - 2),
                      (px1 - 2, py1), (px0 + 2, py1), (px0, py1 - 2), (px0, py0 + 2)]).buffer(0.8)
    plaque_mesh = eb.extrude_any(box_2d, height=plaque_z_top - plaque_z_bot)
    plaque_mesh.apply_translation([0, 0, plaque_z_bot])

    # 3. Union base + plaque
    m_base = to_manifold(base_m)
    m_plaque = to_manifold(plaque_mesh)
    m_combined = m_base + m_plaque

    # 4. Text on plaque
    p_text = eb.make_text_polygon(plaque_text, cap=5.5, font=font_plaque)
    tb = p_text.bounds
    txc = (tb[0] + tb[2]) / 2.0
    tyc = (tb[1] + tb[3]) / 2.0
    p_text = shapely.affinity.translate(p_text, xoff=xc - txc, yoff=yc - tyc)

    text_ext = eb.extrude_any(p_text, height=2.0)
    text_ext.apply_translation([0, 0, plaque_z_top - 0.55])
    m_text = to_manifold(text_ext)
    m_final = m_combined - m_text

    # 5. Side text ("linux") centralizado na ponte em Y = -71.0 (longe dos furos em -80.0 e -60.0)
    if side_text:
        p_side = eb.make_text_polygon(side_text, cap=2.3, font=font_side)
        p_side = shapely.affinity.rotate(p_side, side_rot, origin="center")
        sb = p_side.bounds
        sxc = (sb[0] + sb[2]) / 2.0
        syc = (sb[1] + sb[3]) / 2.0
        p_side = shapely.affinity.translate(p_side, xoff=side_x - sxc, yoff=-71.0 - syc)

        side_ext = eb.extrude_any(p_side, height=2.0)
        side_ext.apply_translation([0, 0, z_top - 0.50])
        m_side = to_manifold(side_ext)
        m_final = m_final - m_side

    tri_out = from_manifold(m_final)

    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri_out.export(out_path)
    print(f"Generated {side} ({plaque_text} + {side_text}): wt={tri_out.is_watertight}, vol={tri_out.volume:.1f} mm³, faces={len(tri_out.faces)}")
    return tri_out


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    engrave_slim_cover("LH", "F", "linux", os.path.join(OUT_DIR, "silakka54-slim-mcu-cover-F-linux-LH.stl"))
    engrave_slim_cover("RH", "B", "linux", os.path.join(OUT_DIR, "silakka54-slim-mcu-cover-B-linux-RH.stl"))


if __name__ == "__main__":
    main()
