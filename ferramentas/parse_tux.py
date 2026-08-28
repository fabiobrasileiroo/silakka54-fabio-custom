#!/usr/bin/env python3
"""parse_tux.py — Extrator do polígono vetorial limpo do Tux (Linux) do FontAwesome/SVG oficial."""
import os
import re
import xml.etree.ElementTree as ET
import numpy as np
import shapely
import shapely.affinity
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SVG_PATH = os.path.join(SCRIPT_DIR, "linux-tux.svg")


def load_vector_tux(height=18.0):
    if not os.path.exists(SVG_PATH):
        raise FileNotFoundError(f"SVG not found: {SVG_PATH}")

    tree = ET.parse(SVG_PATH)
    path_node = tree.getroot().find('.//{http://www.w3.org/2000/svg}path')
    if path_node is None:
        path_node = tree.getroot().find('.//path')
    d = path_node.attrib['d']

    tokens = re.findall(r'([a-df-zA-DF-Z]|[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)', d)
    subpaths = []
    cur_pts = []
    cur = np.array([0.0, 0.0])
    i = 0
    cmd = ''
    while i < len(tokens):
        t = tokens[i]
        if t.isalpha():
            cmd = t
            i += 1
        else:
            if cmd == 'M': cmd = 'L'
            elif cmd == 'm': cmd = 'l'

        if cmd == 'M':
            if len(cur_pts) >= 3:
                subpaths.append(cur_pts)
            cur = np.array([float(tokens[i]), float(tokens[i+1])])
            cur_pts = [cur]
            i += 2
        elif cmd == 'm':
            if len(cur_pts) >= 3:
                subpaths.append(cur_pts)
            cur = cur + np.array([float(tokens[i]), float(tokens[i+1])])
            cur_pts = [cur]
            i += 2
        elif cmd == 'C':
            p1 = np.array([float(tokens[i]), float(tokens[i+1])])
            p2 = np.array([float(tokens[i+2]), float(tokens[i+3])])
            p3 = np.array([float(tokens[i+4]), float(tokens[i+5])])
            ts = np.linspace(0, 1, 24)[1:]
            for ts_i in ts:
                pt = (1-ts_i)**3 * cur + 3*(1-ts_i)**2*ts_i * p1 + 3*(1-ts_i)*ts_i**2 * p2 + ts_i**3 * p3
                cur_pts.append(pt)
            cur = p3
            i += 6
        elif cmd == 'c':
            p1 = cur + np.array([float(tokens[i]), float(tokens[i+1])])
            p2 = cur + np.array([float(tokens[i+2]), float(tokens[i+3])])
            p3 = cur + np.array([float(tokens[i+4]), float(tokens[i+5])])
            ts = np.linspace(0, 1, 24)[1:]
            for ts_i in ts:
                pt = (1-ts_i)**3 * cur + 3*(1-ts_i)**2*ts_i * p1 + 3*(1-ts_i)*ts_i**2 * p2 + ts_i**3 * p3
                cur_pts.append(pt)
            cur = p3
            i += 6
        elif cmd == 'L':
            cur = np.array([float(tokens[i]), float(tokens[i+1])])
            cur_pts.append(cur)
            i += 2
        elif cmd == 'l':
            cur = cur + np.array([float(tokens[i]), float(tokens[i+1])])
            cur_pts.append(cur)
            i += 2
        elif cmd in ('Z', 'z'):
            if len(cur_pts) >= 3:
                subpaths.append(cur_pts)
            cur_pts = []
        else:
            i += 1

    if len(cur_pts) >= 3:
        subpaths.append(cur_pts)

    polys = [Polygon(p).buffer(0) for p in subpaths if len(p) >= 3]
    poly = unary_union(polys).buffer(0)
    # Flip Y (SVG coords)
    poly = shapely.affinity.scale(poly, xfact=1, yfact=-1, origin=(0, 0))
    h = poly.bounds[3] - poly.bounds[1]
    poly = shapely.affinity.scale(poly, xfact=height / h, yfact=height / h, origin=(0, 0))
    tb = poly.bounds
    poly = shapely.affinity.translate(poly, xoff=-tb[0], yoff=-tb[1])
    return poly.simplify(0.04, preserve_topology=True)


if __name__ == "__main__":
    p = load_vector_tux(18.0)
    print("Vector Tux loaded:", p.is_valid, p.bounds)
