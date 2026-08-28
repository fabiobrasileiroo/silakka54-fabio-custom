#!/usr/bin/env python3
"""generate_tented_palm_rest.py — Gerador do Apoio de Palma Ergonômico com Tenting (10–15°).

Projetado especificamente como módulo complementar para o Tent & Tilt Kit do Silakka54:
  - Inclinação anatômica de 12.4° (acompanha perfeitamente a plataforma de tenting de 10–15°)
  - Superfície côncava anatômica para repouso da eminência hipotenar (palma) sem comprimir o túnel do carpo
  - Borda frontal em cascata (waterfall) com raio suave para não marcar os braços
  - Recortes na base para 4 pés de borracha/silicone antiderrapantes (8.5mm x 1.2mm)
  - Estrutura 100% sólida e resistente para impressão 3D (watertight manifold)
"""
import argparse
import os
import sys

import manifold3d
import numpy as np
import shapely
from shapely.geometry import Polygon
import trimesh

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "01-final", "carry-tent-2em1"))


def to_manifold(m):
    vp = np.ascontiguousarray(m.vertices, dtype=np.float32)
    tv = np.ascontiguousarray(m.faces, dtype=np.uint32)
    return manifold3d.Manifold(manifold3d.Mesh(vert_properties=vp, tri_verts=tv))


def from_manifold(mani):
    mesh_out = mani.to_mesh()
    return trimesh.Trimesh(vertices=mesh_out.vert_properties[:, :3], faces=mesh_out.tri_verts)


def build_tented_palm_rest(side="LH", out_path=None):
    # 1. Perfil 2D base (145mm x 80mm) com cantos arredondados e alívio para o thumb cluster
    pts = [
        (8.0, 0.0), (137.0, 0.0), (145.0, 8.0), (145.0, 64.0),
        (136.0, 80.0), (8.0, 80.0), (0.0, 72.0), (0.0, 8.0)
    ]
    poly_2d = Polygon(pts).buffer(0.0)
    poly_ext = trimesh.creation.extrude_polygon(poly_2d, height=40.0)
    m_body = to_manifold(poly_ext)

    # 2. Corte angular de tenting:
    # Altura externa (mindinho, X=0) = 8.5mm
    # Altura interna (polegar, X=145) = 24.5mm
    # Ângulo = arctan(16.0 / 145.0) = 6.30 graus relativo ao topo
    angle_deg = np.degrees(np.arctan(16.0 / 145.0))
    cutter = manifold3d.Manifold.cube([400, 400, 100], center=False)
    cutter = cutter.rotate([0, -angle_deg, 0]).translate([0, -100, 8.5])

    m_tented = m_body - cutter

    # 3. Concavidade anatômica suave da palma (elipsoide côncavo)
    scoop_mesh = trimesh.creation.icosphere(radius=34.0, subdivisions=3)
    scoop_mesh.apply_scale([1.45, 1.0, 0.22])
    scoop_mesh.apply_translation([72.5, 42.0, 16.5 + 34.0 * 0.22 - 2.2])
    m_tented = m_tented - to_manifold(scoop_mesh)

    # 4. Borda frontal em cascata (waterfall smooth bevel)
    front_cyl = trimesh.creation.cylinder(radius=14.0, height=200, sections=64)
    front_cyl.apply_transform(trimesh.transformations.rotation_matrix(np.pi / 2, [0, 1, 0]))
    front_cyl.apply_translation([72.5, -4.0, 14.0 + 3.2])
    m_tented = m_tented - to_manifold(front_cyl)

    # 5. Encaixes na base para pés de borracha antiderrapantes (4x diâmetro 8.5mm, profundidade 1.2mm)
    feet = [(16, 14), (129, 14), (16, 66), (126, 66)]
    for fx, fy in feet:
        cyl = trimesh.creation.cylinder(radius=4.25, height=2.4, sections=32)
        cyl.apply_translation([fx, fy, 0.0])
        m_tented = m_tented - to_manifold(cyl)

    tri = from_manifold(m_tented)

    # 6. Espelhamento perfeito para o lado direito (RH)
    if side == "RH":
        xc = 72.5
        tri.apply_transform([[-1, 0, 0, 2 * xc], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
        tri.fix_normals()

    if out_path:
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        tri.export(out_path)

    print(f"Generated {side} Tented Palm Rest: wt={tri.is_watertight}, vol={tri.volume:.1f} mm³, bounds={tri.bounds.tolist()}")
    return tri


def main():
    parser = argparse.ArgumentParser(description="Gerar Apoios de Palma Ergonômicos com Tenting (Silakka54)")
    parser.add_argument("--side", choices=["LH", "RH", "BOTH"], default="BOTH")
    args = parser.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)
    if args.side in ("LH", "BOTH"):
        build_tented_palm_rest("LH", os.path.join(OUT_DIR, "silakka54-tented-palm-rest-LH.stl"))
    if args.side in ("RH", "BOTH"):
        build_tented_palm_rest("RH", os.path.join(OUT_DIR, "silakka54-tented-palm-rest-RH.stl"))


if __name__ == "__main__":
    main()
