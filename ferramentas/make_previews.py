#!/usr/bin/env python3
"""make_previews.py — Gera PNGs de pré-visualização das peças STL para o site.

Renderização offscreen com matplotlib (Poly3DCollection), mesmo estilo:
fundo escuro #161b22, cor por peça, perspectiva 3D fixa.

Uso:
  python3 make_previews.py <stl> <out.png> [--color RRGGBB] [--elev 25] [--azim -60]
"""
import argparse
import sys

import numpy as np
import trimesh
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection


def render(stl_path, out_path, color="#f2a33c", elev=25.0, azim=-60.0, dpi=180):
    mesh = trimesh.load(stl_path, force="mesh")
    verts = np.asarray(mesh.vertices)
    tris = np.asarray(mesh.faces)
    center = (verts.min(axis=0) + verts.max(axis=0)) / 2
    span = (verts.max(axis=0) - verts.min(axis=0)).max()
    v = (verts - center) / span

    fig = plt.figure(figsize=(8, 8), dpi=dpi)
    ax = fig.add_subplot(111, projection="3d")
    coll = Poly3DCollection(v[tris], facecolor=color, edgecolor="none", alpha=0.98)
    coll.set_antialiased(True)
    ax.add_collection3d(coll)

    lim = 0.62
    ax.set_xlim(-lim, lim)
    ax.set_ylim(-lim, lim)
    ax.set_zlim(-lim, lim)
    ax.set_box_aspect((1, 1, 1))
    ax.view_init(elev=elev, azim=azim)
    ax.set_axis_off()
    fig.subplots_adjust(left=0, right=1, top=1, bottom=0)
    fig.savefig(out_path, transparent=False, facecolor="#161b22")
    plt.close(fig)
    print(f"OK {out_path} ({len(tris)} faces)")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("stl")
    ap.add_argument("out")
    ap.add_argument("--color", default="#f2a33c")
    ap.add_argument("--elev", type=float, default=25.0)
    ap.add_argument("--azim", type=float, default=-60.0)
    args = ap.parse_args()
    try:
        render(args.stl, args.out, args.color, args.elev, args.azim)
    except Exception as e:
        print(f"FAIL {args.stl}: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()