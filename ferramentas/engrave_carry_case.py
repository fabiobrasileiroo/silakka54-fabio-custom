#!/usr/bin/env python3
"""engrave_carry_case.py — Gravação personalizada no Carry Case (67mm).

Personalização:
  - Topo: "FHMB" (fonte Audiowide, 12.0mm)
  - Embaixo: "silakka54" (fonte cursiva elegante Dancing Script, 8.5mm)
  - Sem ícone do Linux/Tux.
  - Gravado com 0.75mm de profundidade nas duas faces externas para máxima visibilidade e contraste 3D.
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
    p_sub = ec.make_text_polygon(subtitle, cap=8.5, font=font_script)
    b_sub = p_sub.bounds

    # Centraliza cada linha
    p_name = shapely.affinity.translate(p_name, xoff=-(b_name[0] + b_name[2]) / 2.0, yoff=-(b_name[1] + b_name[3]) / 2.0 + 7.5)
    p_sub = shapely.affinity.translate(p_sub, xoff=-(b_sub[0] + b_sub[2]) / 2.0, yoff=-(b_sub[1] + b_sub[3]) / 2.0 - 6.5)

    badge_2d = unary_union([p_name, p_sub])
    bb = badge_2d.bounds
    badge_2d = shapely.affinity.translate(badge_2d, xoff=-(bb[0] + bb[2]) / 2.0, yoff=-(bb[1] + bb[3]) / 2.0)

    # ---------------------------------------------------------
    # 1. Parede 1 (X = 45.88, voltada para -X)
    # ---------------------------------------------------------
    badge_w1_2d = shapely.affinity.scale(badge_2d, xfact=-1, yfact=1, origin="center")
    solid_w1 = eb.extrude_any(badge_w1_2d, height=2.5)
    M_w1 = np.array([[0, 0, 1, 0], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1]], dtype=float)
    solid_w1.apply_transform(M_w1)
    b_curr1 = solid_w1.bounds
    solid_w1.apply_translation([
        46.63 - b_curr1[1][0],  # profundidade de 0.75mm
        110.0 - (b_curr1[0][1] + b_curr1[1][1]) / 2.0,
        33.5 - (b_curr1[0][2] + b_curr1[1][2]) / 2.0
    ])

    # ---------------------------------------------------------
    # 2. Parede 2 (X = 161.70, voltada para +X / câmera padrão 3D)
    # ---------------------------------------------------------
    badge_w2_2d = badge_2d
    solid_w2 = eb.extrude_any(badge_w2_2d, height=2.5)
    M_w2 = np.array([[0, 0, -1, 0], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1]], dtype=float)
    solid_w2.apply_transform(M_w2)
    b_curr2 = solid_w2.bounds
    solid_w2.apply_translation([
        160.95 - b_curr2[0][0],  # profundidade de 0.75mm
        110.0 - (b_curr2[0][1] + b_curr2[1][1]) / 2.0,
        33.5 - (b_curr2[0][2] + b_curr2[1][2]) / 2.0
    ])

    m_case = to_manifold(case_m)
    m_cut = to_manifold(solid_w1) + to_manifold(solid_w2)
    m_final = m_case - m_cut

    tri = from_manifold(m_final)
    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri.export(out_path)

    print(f"Generated Carry Case 67mm ({name} + {subtitle}): wt={tri.is_watertight}, faces={len(tri.faces)}, vol={tri.volume:.1f} mm³")
    return tri


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    engrave_carry_case_67mm("FHMB", "silakka54",
                            os.path.join(OUT_DIR, "silakka-case-67mm.stl"))


if __name__ == "__main__":
    main()
