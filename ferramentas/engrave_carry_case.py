#!/usr/bin/env python3
"""engrave_carry_case.py — Gravação personalizada no Carry Case (67mm).

Personalização:
  - Gravado APENAS na parede reta/lisa externa (sem curvas).
  - A parede oposta com curvas/colunas fica 100% lisa e original.
  - Profundidade suave e elegante de 0.48mm.
  - Topo: "FHMB" (fonte Audiowide, 12.0mm)
  - Embaixo: "silakka54" (fonte cursiva Dancing Script, 8.0mm)
"""
import argparse
import os
import sys

import manifold3d
import numpy as np
import shapely
import shapely.affinity
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
import trimesh

import ferramentas.engrave_cover as ec
import ferramentas.engrave_baseplate as eb

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.path.join(SCRIPT_DIR, "fonts")
CARRY_ORIG_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "00-original", "carry-case"))
OUT_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "01-final", "carry-tent-2em1"))
DOCS_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "docs", "01-final", "carry-tent-2em1"))


def to_manifold(m):
    vp = np.ascontiguousarray(m.vertices, dtype=np.float32)
    tv = np.ascontiguousarray(m.faces, dtype=np.uint32)
    return manifold3d.Manifold(manifold3d.Mesh(vert_properties=vp, tri_verts=tv))


def from_manifold(mani):
    mesh_out = mani.to_mesh()
    return trimesh.Trimesh(vertices=mesh_out.vert_properties[:, :3], faces=mesh_out.tri_verts)


def engrave_carry_case_67mm(name="FHMB", subtitle="silakka54", out_path=None):
    in_stl = os.path.join(CARRY_ORIG_DIR, "silakka-case-67mm.stl")
    case_m = trimesh.load(in_stl)

    font_name = os.path.join(FONTS_DIR, "audiowide.ttf")
    font_script = os.path.join(FONTS_DIR, "dancing-script.ttf")

    # 1. Nome principal
    p_name = ec.make_text_polygon(name, cap=12.0, font=font_name)
    b_name = p_name.bounds

    # 2. Subtítulo cursivo
    p_sub = ec.make_text_polygon(subtitle, cap=8.0, font=font_script)
    b_sub = p_sub.bounds

    # Centraliza cada linha
    p_name = shapely.affinity.translate(p_name, xoff=-(b_name[0] + b_name[2]) / 2.0, yoff=-(b_name[1] + b_name[3]) / 2.0 + 7.0)
    p_sub = shapely.affinity.translate(p_sub, xoff=-(b_sub[0] + b_sub[2]) / 2.0, yoff=-(b_sub[1] + b_sub[3]) / 2.0 - 6.0)

    badge_2d = unary_union([p_name, p_sub])
    bb = badge_2d.bounds
    badge_2d = shapely.affinity.translate(badge_2d, xoff=-(bb[0] + bb[2]) / 2.0, yoff=-(bb[1] + bb[3]) / 2.0)

    # Gravado APENAS na parede reta (X = 45.88)
    badge_w1_2d = shapely.affinity.scale(badge_2d, xfact=-1, yfact=1, origin="center")
    solid_w1 = eb.extrude_any(badge_w1_2d, height=2.0)
    M_w1 = np.array([[0, 0, 1, 0], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1]], dtype=float)
    solid_w1.apply_transform(M_w1)
    b_curr1 = solid_w1.bounds
    solid_w1.apply_translation([
        46.36 - b_curr1[1][0],  # profundidade suave de 0.48mm
        110.0 - (b_curr1[0][1] + b_curr1[1][1]) / 2.0,
        33.5 - (b_curr1[0][2] + b_curr1[1][2]) / 2.0
    ])

    m_case = to_manifold(case_m)
    m_cut = to_manifold(solid_w1)
    m_final = m_case - m_cut

    tri = from_manifold(m_final)
    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri.export(out_path)

    # Copia também para docs/01-final/
    docs_out = os.path.join(DOCS_DIR, "silakka-case-67mm.stl")
    os.makedirs(os.path.dirname(docs_out), exist_ok=True)
    tri.export(docs_out)

    print(f"Generated Carry Case 67mm (Single-sided, 0.48mm depth): wt={tri.is_watertight}, faces={len(tri.faces)}, vol={tri.volume:.1f} mm³")
    return tri


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    engrave_carry_case_67mm("FHMB", "silakka54",
                            os.path.join(OUT_DIR, "silakka-case-67mm.stl"))


if __name__ == "__main__":
    main()
