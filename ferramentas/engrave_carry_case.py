#!/usr/bin/env python3
"""engrave_carry_case.py — Gravação personalizada na parede principal do Carry Case (67mm).

Gera:
  - silakka-case-67mm.stl com gravação 100% legível (não-espelhada):
      - Tux (Linux) à esquerda
      - "FHMB" no topo direito
      - "silakka54" (cursiva) embaixo à direita
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
    p_name = ec.make_text_polygon(name, cap=9.0, font=font_name)

    # 2. Subtítulo cursivo elegante
    p_sub = ec.make_text_polygon(subtitle, cap=6.8, font=font_script)

    # 3. Ícone Tux do Linux
    p_tux = ec.load_tux_polygon(height=18.0).simplify(0.08, preserve_topology=True).buffer(0)
    w_tux = p_tux.bounds[2] - p_tux.bounds[0]

    # Arranjo 2D: Tux à esquerda, Nome no topo direito, Subtítulo embaixo à direita
    p_tux = shapely.affinity.translate(p_tux, xoff=-p_tux.bounds[0], yoff=-p_tux.bounds[1])
    p_name = shapely.affinity.translate(p_name, xoff=-p_name.bounds[0] + w_tux + 5.0, yoff=-p_name.bounds[1] + 9.5)
    p_sub = shapely.affinity.translate(p_sub, xoff=-p_sub.bounds[0] + w_tux + 6.0, yoff=-p_sub.bounds[1] + 0.0)

    badge_2d = unary_union([p_tux, p_name, p_sub])
    bb = badge_2d.bounds
    badge_2d = shapely.affinity.translate(badge_2d, xoff=-(bb[0] + bb[2]) / 2.0, yoff=-(bb[1] + bb[3]) / 2.0)

    # Desespelha horizontalmente (xfact = -1) para leitura direta da esquerda para a direita na parede externa
    badge_2d = shapely.affinity.scale(badge_2d, xfact=-1, yfact=1, origin="center")

    # Extrude badge em Z por 2.0mm
    badge_solid = eb.extrude_any(badge_2d, height=2.0)

    # 2D X -> +Y, 2D Y -> +Z, 2D Z -> +X
    M = np.array([
        [0, 0, 1, 0],
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1]
    ], dtype=float)
    badge_solid.apply_transform(M)

    # Parede externa está em X = 45.88. Profundidade 0.55mm -> corte atinge X = 46.43
    b_curr = badge_solid.bounds
    badge_solid.apply_translation([
        46.43 - b_curr[1][0],
        110.0 - (b_curr[0][1] + b_curr[1][1]) / 2.0,
        33.5 - (b_curr[0][2] + b_curr[1][2]) / 2.0
    ])

    m_case = to_manifold(case_m)
    m_badge = to_manifold(badge_solid)
    m_final = m_case - m_badge

    tri = from_manifold(m_final)
    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri.export(out_path)

    print(f"Generated Carry Case 67mm ({name} + {subtitle} + Tux un-mirrored): faces={len(tri.faces)}, vol={tri.volume:.1f} mm³")
    return tri


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    engrave_carry_case_67mm("FHMB", "silakka54",
                            os.path.join(OUT_DIR, "silakka-case-67mm.stl"))


if __name__ == "__main__":
    main()
