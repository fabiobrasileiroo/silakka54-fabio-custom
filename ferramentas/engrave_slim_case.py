#!/usr/bin/env python3
"""engrave_slim_case.py — Gravação das frases com fonte JetBrains Mono (IntelliJ)
e margens seguras na base sólida da Slim Screwless Case (Johnny5iv).

Gera:
  - LH: silakka54-slim-case-js-LH.stl ("foi javascript que me deu")
  - RH: silakka54-slim-case-java-RH.stl ("foi java que me deu")
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
    # Fonte oficial do IntelliJ (JetBrains Mono Bold)
    font = os.path.join(FONTS_DIR, "jetbrains-mono-bold.ttf")

    if side == "LH":
        in_stl = os.path.join(SLIM_ORIG_DIR, "silakka54_top_bottom_left.stl")
        # Posição central na faixa sólida com margem confortável de 6.5mm das bordas
        xc = 31.5
        yc = -75.0
        rot = 90.0
    else:
        in_stl = os.path.join(SLIM_ORIG_DIR, "silakka54_top_bottom_right.stl")
        xc = -31.5
        yc = -75.0
        rot = -90.0

    base_m = trimesh.load(in_stl)

    # 1. Cria o polígono do texto com altura de letra 3.8mm (JetBrains Mono)
    p = eb.make_text_polygon(text, cap=3.8, font=font)

    # 2. Espelhamento 2D no eixo X (xfact=-1) para leitura direta por baixo
    p = shapely.affinity.scale(p, xfact=-1, yfact=1, origin="center")

    # 3. Rotaciona e translada para a posição com margens generosas
    p = shapely.affinity.rotate(p, rot, origin="center")
    tb = p.bounds
    txc = (tb[0] + tb[2]) / 2.0
    tyc = (tb[1] + tb[3]) / 2.0
    p = shapely.affinity.translate(p, xoff=xc - txc, yoff=yc - tyc)

    # 4. Extrusão do corte (profundidade 0.45mm na face z=0.60..1.05)
    text_solid = eb.extrude_any(p, height=0.45)
    text_solid.apply_translation([0, 0, 0.60])

    # 5. Diferença booleana com Manifold3D
    m_base = to_manifold(base_m)
    m_text = to_manifold(text_solid)
    m_final = m_base - m_text

    tri_out = from_manifold(m_final)

    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri_out.export(out_path)

    print(f"Generated Slim Case {side} ({text}): wt={tri_out.is_watertight}, vol={tri_out.volume:.1f} mm³, faces={len(tri_out.faces)}")
    return tri_out


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    engrave_slim_case("LH", "foi javascript que me deu",
                      os.path.join(OUT_DIR, "silakka54-slim-case-js-LH.stl"))
    engrave_slim_case("RH", "foi java que me deu",
                      os.path.join(OUT_DIR, "silakka54-slim-case-java-RH.stl"))


if __name__ == "__main__":
    main()
