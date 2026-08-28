#!/usr/bin/env python3
"""engrave_carry_case.py — Gravação personalizada do Carry Case (67mm e 50mm).

Personalização solicitada:
  - Nome principal: "FábioHMB" (fonte Audiowide)
  - Subtexto: "silakka54" (fonte cursiva de escrita bonita - Dancing Script)
  - Ícone do Linux (Tux) posicionado ao lado esquerdo do texto.
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


def poly_to_manifold_extrusion(poly, height=1.0):
    polys = poly.geoms if poly.geom_type == "MultiPolygon" else [poly]
    paths = []
    for g in polys:
        paths.append(np.array(g.exterior.coords)[:, :2].tolist())
        for hole in g.interiors:
            paths.append(np.array(hole.coords)[:, :2].tolist())
    cs = manifold3d.CrossSection(paths, manifold3d.FillRule.EvenOdd)
    return manifold3d.Manifold.extrude(cs, height=height)


def engrave_carry_case_67mm(name="FábioHMB", subtitle="silakka54", out_path=None):
    in_stl = os.path.join(CARRY_ORIG_DIR, "silakka-case-67mm.stl")
    case_m = trimesh.load(in_stl)

    font_name = os.path.join(FONTS_DIR, "audiowide.ttf")
    font_script = os.path.join(FONTS_DIR, "dancing-script.ttf")

    # 1. Nome principal
    # Remove acento se a fonte Audiowide não tiver glyph de 'á' nativo
    clean_name = "FabioHMB" if name in ("FábioHMB", "FabioHMB") else name
    p_name = ec.make_text_polygon(clean_name, cap=6.5, font=font_name)
    b_name = p_name.bounds
    w_name = b_name[2] - b_name[0]

    # 2. Subtítulo cursivo bonito
    p_sub = ec.make_text_polygon(subtitle, cap=5.2, font=font_script)
    b_sub = p_sub.bounds

    # 3. Ícone Tux do Linux
    p_tux = ec.load_tux_polygon(height=13.5).simplify(0.08, preserve_topology=True).buffer(0)
    b_tux = p_tux.bounds
    w_tux = b_tux[2] - b_tux[0]

    # Arranjo 2D: Tux à esquerda, Nome no topo direito, Subtítulo embaixo à direita
    p_tux = shapely.affinity.translate(p_tux, xoff=-b_tux[0], yoff=-b_tux[1])
    p_name = shapely.affinity.translate(p_name, xoff=-b_name[0] + w_tux + 4.5, yoff=-b_name[1] + 7.0)
    p_sub = shapely.affinity.translate(p_sub, xoff=-b_sub[0] + w_tux + 5.5, yoff=-b_sub[1] + 0.0)

    badge_2d = unary_union([p_tux, p_name, p_sub])
    bb = badge_2d.bounds
    badge_2d = shapely.affinity.translate(badge_2d, xoff=-(bb[0] + bb[2]) / 2.0, yoff=-(bb[1] + bb[3]) / 2.0)

    # Extrude badge (profundidade 2.0mm para o corte)
    m_badge = poly_to_manifold_extrusion(badge_2d, height=2.0)

    # Rotaciona para a parede frontal (XZ facing -Y)
    m_badge = m_badge.rotate([90, 0, 0])

    # Posiciona na face frontal: X=110.0, Z=33.5, Y=20.83 + 0.50 (profundidade de corte 0.50mm)
    m_badge = m_badge.translate([110.0, 20.83 + 0.50, 33.5])

    m_case = to_manifold(case_m)
    m_final = m_case - m_badge

    tri = from_manifold(m_final)
    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri.export(out_path)

    print(f"Generated Carry Case 67mm ({name} + {subtitle} + Tux): vol={m_final.volume():.1f} mm³, faces={len(tri.faces)}")
    return tri


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    engrave_carry_case_67mm("FábioHMB", "silakka54",
                            os.path.join(OUT_DIR, "silakka-case-67mm.stl"))


if __name__ == "__main__":
    main()
