#!/usr/bin/env python3
"""engrave_slim_case.py — Gravação das frases na parede LATERAL externa da Slim Screwless Case (Johnny5iv).

Gera:
  - LH: silakka54-slim-case-js-LH.stl ("foi javascript que me deu" gravado na lateral externa)
  - RH: silakka54-slim-case-java-RH.stl ("foi java que me deu" gravado na lateral externa)
"""
import os
import sys

import manifold3d
import numpy as np
import shapely
import shapely.affinity
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
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


def engrave_slim_case(side="LH", text="foi javascript que me deu", out_path=None):
    font = os.path.join(FONTS_DIR, "jetbrains-mono-bold.ttf")

    if side == "LH":
        in_stl = os.path.join(SLIM_ORIG_DIR, "silakka54_top_bottom_left.stl")
        base_m = trimesh.load(in_stl)
        # Altura da letra 3.6mm, centralizada na parede lateral externa (X = 22.98, Z = 7.0, Y = -78.0)
        p = eb.make_text_polygon(text, cap=3.6, font=font)
        s = eb.extrude_any(p, height=1.0)
        # Transformação: 2D X -> +Y, 2D Y -> +Z, 2D Z -> +X
        M = np.array([[0, 0, 1, 0], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1]], dtype=float)
        s.apply_transform(M)
        b_curr = s.bounds
        s.apply_translation([
            22.98 - b_curr[0][0] - 0.55 + 0.45,
            -78.0 - (b_curr[0][1] + b_curr[1][1]) / 2.0,
            7.0 - (b_curr[0][2] + b_curr[1][2]) / 2.0
        ])
    else:
        in_stl = os.path.join(SLIM_ORIG_DIR, "silakka54_top_bottom_right.stl")
        base_m = trimesh.load(in_stl)
        p = eb.make_text_polygon(text, cap=3.6, font=font)
        s = eb.extrude_any(p, height=1.0)
        # Transformação RH: 2D X -> -Y (leitura da esq p/ dir ao olhar de fora), 2D Y -> +Z, 2D Z -> -X
        M = np.array([[0, 0, -1, 0], [-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 1]], dtype=float)
        s.apply_transform(M)
        b_curr = s.bounds
        s.apply_translation([
            -22.98 - b_curr[1][0] + 0.55 - 0.45,
            -78.0 - (b_curr[0][1] + b_curr[1][1]) / 2.0,
            7.0 - (b_curr[0][2] + b_curr[1][2]) / 2.0
        ])

    m_base = to_manifold(base_m)
    m_text = to_manifold(s)
    m_final = m_base - m_text

    tri_out = from_manifold(m_final)

    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri_out.export(out_path)

    print(f"Generated Slim Case {side} ({text} na lateral): wt={tri_out.is_watertight}, vol={tri_out.volume:.1f} mm³, faces={len(tri_out.faces)}")
    return tri_out


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    engrave_slim_case("LH", "foi javascript que me deu",
                      os.path.join(OUT_DIR, "silakka54-slim-case-js-LH.stl"))
    engrave_slim_case("RH", "foi java que me deu",
                      os.path.join(OUT_DIR, "silakka54-slim-case-java-RH.stl"))


if __name__ == "__main__":
    main()
