#!/usr/bin/env python3
"""engrave_cover.py — Gravador reutilizável dos covers silakka54 (F/B + texto lateral).

Uso (reproduzir o design atual):
  python3 engrave_cover.py --side LH --plaque-text F  --side-text linux --out-dir out
  python3 engrave_cover.py --side RH --plaque-text B  --side-text linux --out-dir out
  python3 engrave_cover.py --side BOTH                              # = os dois acima

Qualquer mudança futura é um flag:
  --plaque-text 'X'      letra na plaqueta (LH default F, RH default B)
  --plaque-bottom 'vim'  texto secundário empilhado embaixo do principal (default: nenhum)
  --side-text ''         remove o texto lateral (ou passe outro texto)
  --side-cap 3.5         altura do texto lateral (default 2.6 — limitado pela faixa de ~3mm)
  --plaque-cap 5.0       altura da letra da plaqueta
  --depth 0.55           profundidade da gravação
  --side-x auto|FLOAT    posição X do texto lateral (default auto = centro da faixa sólida)
  --side-y -80           centro Y do texto lateral
  --side-rot -90         rotação do texto lateral em graus (default -90 = lê de cima p/ baixo)

Saída: silakka54-chevron-cover-<LETRA>[-<extra>][-<lateral>]-<LH|RH>.stl
Verificação embutida: watertight, volume e mapa ASCII da região gravada (--verify).
"""
import argparse
import os
import sys

import numpy as np
import shapely
import trimesh
import trimesh.boolean
from shapely.geometry import Polygon
from shapely.ops import unary_union

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_BASE = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "00-original",
                                             "case-keyboard", "full-mcu-cover-chevrons.stl"))
DEFAULT_FONTS = os.path.join(SCRIPT_DIR, "fonts")

PLAQUE = dict(x0=149.0, x1=171.0, y0=-49.5, y1=-34.5, r=2.0,
              z_bot=20.3, z_top=23.5)
GAP = 1.5          # espaço entre linha principal e secundária na plaqueta
SIDE_Z_TOP = 22.30  # topo da crista da faixa lateral (medido do mesh original)
SIDE_Y_LO, SIDE_Y_HI = -105.0, -55.0   # janela vertical disponível no corpo
ENGRAVE_DEPTH = 0.55


def flatten_mpath(path, n_curve=48):
    """Flatten a matplotlib Path to polygons (list of Nx2 arrays, open rings)."""
    from matplotlib.path import Path as MPath
    verts, codes = path.vertices, path.codes
    if codes is None:
        return [verts]
    segs = []
    cur = []  # vértices do anel corrente (vazio = nenhum anel aberto)
    i = 0
    while i < len(verts):
        c = codes[i]
        if c == MPath.MOVETO:
            if cur:
                segs.append(np.asarray(cur))
            cur = [verts[i]]
            i += 1
        elif c == MPath.LINETO:
            cur.append(verts[i]); i += 1
        elif c == MPath.CURVE4:
            p0, p1, p2, p3 = cur[-1], verts[i], verts[i + 1], verts[i + 2]
            ts = np.linspace(0, 1, n_curve)
            pts = (np.outer((1 - ts) ** 3, p0) + np.outer(3 * (1 - ts) ** 2 * ts, p1)
                   + np.outer(3 * (1 - ts) * ts ** 2, p2) + np.outer(ts ** 3, p3))
            cur.extend(pts[1:]); i += 3
        elif c == MPath.CURVE3:
            p0, p1, p2 = cur[-1], verts[i], verts[i + 1]
            ts = np.linspace(0, 1, n_curve)
            pts = (np.outer((1 - ts) ** 2, p0) + np.outer(2 * (1 - ts) * ts, p1)
                   + np.outer(ts ** 2, p2))
            cur.extend(pts[1:]); i += 2
        elif c == MPath.CLOSEPOLY:
            cur.append(cur[0])  # close ring
            i += 1
    if cur:
        segs.append(np.asarray(cur))
    return segs


def rings_to_polygons(rings):
    polys = []
    ring_polys = []
    for r in rings:
        if len(r) < 4:
            continue
        p = Polygon(r)
        if not p.is_valid:
            p = p.buffer(0)
        if p.area < 1e-9:
            continue
        ring_polys.append(p)
    for i, out in enumerate(ring_polys):
        contained = False
        for j, other in enumerate(ring_polys):
            if i != j and other.area > out.area and other.contains(out.representative_point()):
                contained = True
                break
        if contained:
            continue
        holes = []
        for h in ring_polys:
            if h is out:
                continue
            if out.contains(h.representative_point()):
                holes.append(h.exterior.coords[:])
        poly = Polygon(out.exterior.coords[:], holes)
        if poly.is_valid:
            polys.append(poly)
    return polys


def make_text_polygon(text, cap, font):
    from matplotlib.textpath import TextPath
    from matplotlib.font_manager import FontProperties
    size = cap / 0.729  # DejaVu Sans cap height fraction
    tp = TextPath((0, 0), text, size=size,
                  prop=FontProperties(fname=font))
    rings = flatten_mpath(tp)
    polys = rings_to_polygons(rings)
    if len(polys) == 1 and isinstance(polys[0], Polygon):
        p = polys[0]
    else:
        p = unary_union(polys)
    h = p.bounds[3] - p.bounds[1]
    scale = cap / h
    p = shapely.affinity.scale(p, xfact=scale, yfact=scale, origin=(0, 0))
    # Colapsa pontos (quase) duplicados/colineares dos anéis densos do TextPath:
    # sem isso, anéis com furos (ex.: 'B') quebram o triangulador do trimesh
    # (extrusão sai não-watertight). Tolerância <= 0.02mm — irrelevante p/ impressão.
    tol = min(0.02, cap * 0.004)
    p = p.simplify(tol, preserve_topology=True)
    if not p.is_valid:
        p = p.buffer(0)
    return p


def load_tux_polygon(height=5.0, tux_path=None):
    from PIL import Image
    import matplotlib.pyplot as plt
    if tux_path is None:
        tux_path = os.path.join(SCRIPT_DIR, "tux.png")
    if not os.path.exists(tux_path):
        tux_path = os.path.join(SCRIPT_DIR, "..", "02-superseded", "tux.png")
    img = Image.open(tux_path).convert("L")
    arr = np.flipud(np.array(img) < 128)
    fig, ax = plt.subplots()
    cs = ax.contour(arr, levels=[0.5])
    plt.close(fig)
    paths = cs.get_paths()
    polys = [Polygon(p.vertices) for p in paths if len(p.vertices) >= 4]
    tux_poly = unary_union(polys).simplify(0.3, preserve_topology=True).buffer(0)
    h = tux_poly.bounds[3] - tux_poly.bounds[1]
    tux_scaled = shapely.affinity.scale(tux_poly, xfact=height / h, yfact=height / h, origin=(0, 0))
    return tux_scaled


def extrude_any(poly, height):
    from shapely.geometry import MultiPolygon as _MP
    if poly.geom_type == "MultiPolygon":
        parts = [trimesh.creation.extrude_polygon(g, height=height) for g in poly.geoms]
        return trimesh.util.concatenate(parts)
    return trimesh.creation.extrude_polygon(poly, height=height)


def mirror_x(mesh, xc):
    M = np.array([[-1, 0, 0, 2 * xc],
                  [0, 1, 0, 0],
                  [0, 0, 1, 0],
                  [0, 0, 0, 1]], dtype=float)
    m = mesh.copy()
    m.apply_transform(M)
    m.fix_normals()
    return m


def solid_difference(bodies, label, retries=6):
    cut = trimesh.boolean.difference(bodies, engine="manifold")
    for _ in range(retries):
        if cut.is_watertight:
            break
        print(f"  {label}: difference not watertight, retrying")
        cut = trimesh.boolean.difference(bodies, engine="manifold")
    assert cut.is_watertight, f"{label}: difference not watertight"
    return cut


def solid_union(bodies, label, retries=6):
    u = trimesh.boolean.union(bodies, engine="manifold")
    for _ in range(retries):
        if u.is_watertight:
            break
        print(f"  {label}: union not watertight, retrying")
        u = trimesh.boolean.union(bodies, engine="manifold")
    assert u.is_watertight, f"{label}: union not watertight"
    return u


def build_plaque(letter_poly, bottom_poly=None, mirror_x_center=None):
    """Plaqueta (prisma de canto arredondado) com letra(s) gravadas, em XY absoluto."""
    x0, x1, y0, y1 = PLAQUE["x0"], PLAQUE["x1"], PLAQUE["y0"], PLAQUE["y1"]
    if mirror_x_center is not None:
        x0, x1 = 2 * mirror_x_center - x1, 2 * mirror_x_center - x0
    z_bot, z_top = PLAQUE["z_bot"], PLAQUE["z_top"]
    r = PLAQUE["r"]
    foot = shapely.geometry.box(x0 + r, y0 + r, x1 - r, y1 - r).buffer(
        r, join_style="round", quad_segs=24)
    plaque = trimesh.creation.extrude_polygon(foot, height=z_top - z_bot)
    plaque.apply_translation([0, 0, z_bot])

    cx = (x0 + x1) / 2.0
    cy = (y0 + y1) / 2.0
    tb = letter_poly.bounds
    tw, th = tb[2] - tb[0], tb[3] - tb[1]

    if bottom_poly is None:
        polys = [shapely.affinity.translate(letter_poly, cx - tw / 2.0, cy - th / 2.0)]
    else:
        bb = bottom_poly.bounds
        bw, bh = bb[2] - bb[0], bb[3] - bb[1]
        total = th + GAP + bh
        top_margin = (y1 - y0 - total) / 2.0
        top_y_bot = y1 - top_margin - th
        bottom_y_bot = top_y_bot - GAP
        polys = [shapely.affinity.translate(letter_poly, cx - tw / 2.0, top_y_bot),
                 shapely.affinity.translate(bottom_poly, cx - bw / 2.0, bottom_y_bot)]

    eng = []
    depth = ENGRAVE_DEPTH
    for p in polys:
        m = extrude_any(p, height=depth)
        m.apply_translation([0, 0, z_top - depth])
        eng.append(m)
    return plaque, eng


def find_side_x(cover, text, cap, y_center):
    """Acha o X do centro da faixa de crista plana na borda esquerda (cover original).

    Sonda o cover NÃO espelhado (simétrico em XC) em DUAS alturas: z≈21.9
    (material do corpo) e z≈crista−0.13 (somente cristas planas de topo alto).
    Uma coluna só conta se estiver presente nas duas — assim o texto cai numa
    crista plana (gravável), não num vale do padrão chevron.
    Para o RH, o caller espelha o resultado (x_rh = 2*XC - x_lh).
    """
    x_lo, x_hi = cover.bounds[0][0], cover.bounds[1][0]
    z_body = SIDE_Z_TOP - 0.45     # material do corpo
    z_crest = SIDE_Z_TOP - 0.13    # topo da crista (cristas planas ~22.30)
    em = cap / 0.729
    advance = 0.6 * em                      # largura média do glifo (mono ~0.6em)
    y_ext = len(text) * advance + 1.1 * em  # extensão vertical do texto + folga
    ys = np.linspace(y_center - y_ext / 2, y_center + y_ext / 2, 9)
    xs = np.linspace(x_lo, x_hi, int((x_hi - x_lo) / 0.2) + 1)
    cols = {x: 0 for x in xs}
    for y in ys:
        pts = np.array([[x, y, z_body] for x in xs])
        in_body = cover.contains(pts)
        pts2 = np.array([[x, y, z_crest] for x in xs])
        in_crest = cover.contains(pts2)
        for x, b, c in zip(xs, in_body, in_crest):
            cols[x] += int(bool(b) and bool(c))
    full = [x for x, c in cols.items() if c == len(ys)]
    if not full:
        raise RuntimeError("nenhuma faixa sólida contínua encontrada para o texto lateral")
    runs, start = [], full[0]
    for a, b in zip(full, full[1:]):
        if b - a > 0.21:
            runs.append((start, a))
            start = b
    runs.append((start, full[-1]))
    # primeiro trecho da esquerda com largura suficiente; senão o mais largo
    need = cap + 0.6
    pick = next((r for r in runs if r[1] - r[0] >= need), None) or max(runs, key=lambda r: r[1] - r[0])
    lo, hi = pick
    print(f"  faixa lateral disponível: {len(runs)} trecho(s) "
          f"({', '.join(f'[{a:.1f},{b:.1f}]' for a, b in runs)}); "
          f"usando [{lo:.1f}, {hi:.1f}] (largura {hi - lo:.1f}mm)")
    return (lo + hi) / 2.0, lo, hi


def measure_zmax(mesh, x, y, z_lo=21.0, z_hi=24.0, n=201):
    """Altura do topo do material em (x,y) — usado p/ gravar a partir do topo real."""
    zs = np.linspace(z_lo, z_hi, n)
    inn = mesh.contains(np.array([[x, y, z] for z in zs]))
    if not inn.any():
        return None
    return float(zs[inn].max())


def check_top_flat(mesh, text, cap, x_center, y_center, label=""):
    """Mede o topo numa grade 3x3 do footprint do texto; avisa se desnivelado.

    Devolve o topo máximo medido — é com ele que a gravação deve começar
    (senão as letras ficam enterradas sob uma 'tampa' de material).
    """
    em = cap / 0.729
    advance = 0.6 * em
    y_ext = len(text) * advance + 1.1 * em
    xs = np.linspace(x_center - cap / 2 - 0.4, x_center + cap / 2 + 0.4, 3)
    ys = np.linspace(y_center - y_ext / 2 - 0.4, y_center + y_ext / 2 + 0.4, 3)
    tops = [measure_zmax(mesh, a, b) for a in xs for b in ys]
    tops = [t for t in tops if t is not None]
    if not tops:
        raise RuntimeError(f"{label}: nenhum material no footprint do texto lateral")
    spread = max(tops) - min(tops)
    if spread > 0.25:
        print(f"  aviso ({label}): topo varia {spread:.2f}mm no footprint "
              f"({min(tops):.2f}..{max(tops):.2f}) — gravação pode ficar rasa em partes")
    return float(max(tops))


def build_side_solid(text, cap, font, x_center, x_lo, x_hi, y_center, rot_deg, z_top):
    """Solid de gravação do texto lateral (vertical), no topo da faixa.

    z_top é o topo real medido da crista (não chute): a gravação vai de
    z_top-ENGRAVE_DEPTH até z_top, garantindo letras abertas na superfície.
    """
    p = make_text_polygon(text, cap, font)
    p = shapely.affinity.rotate(p, rot_deg, origin=(0, 0))
    b = p.bounds
    pw, ph = b[2] - b[0], b[3] - b[1]
    # margem de segurança contra borda da faixa
    span = cap
    if x_center - span / 2 < x_lo + 0.1 or x_center + span / 2 > x_hi - 0.1:
        print(f"  aviso: texto lateral (largura {span:.1f}mm) apertado na faixa "
              f"[{x_lo:.1f}, {x_hi:.1f}]")
    p = shapely.affinity.translate(p, x_center - pw / 2.0, y_center - ph / 2.0)
    m = extrude_any(p, height=ENGRAVE_DEPTH)
    m.apply_translation([0, 0, z_top - ENGRAVE_DEPTH])
    return m


def verify_map(mesh, x0, x1, y0, y1, z_probe, step=0.25, label=""):
    """Mapa ASCII: '#' = material no plano z_probe, '.' = vazio (letras gravadas)."""
    xs = np.arange(x0, x1 + step / 2, step)
    ys = np.arange(y1, y0 - step / 2, -step)  # y decrescente p/ imprimir de cima p/ baixo
    print(f"  {label}: x {x0:.1f}..{x1:.1f}, y {y0:.1f}..{y1:.1f} @ z={z_probe}")
    for y in ys:
        pts = np.array([[x, y, z_probe] for x in xs])
        inn = mesh.contains(pts)
        print("    " + "".join("#" if v else "." for v in inn))
    print()


def main():
    global ENGRAVE_DEPTH
    ap = argparse.ArgumentParser(description="Silakka54 chevron cover engraver (F/B + lateral)")
    ap.add_argument("--side", choices=["LH", "RH", "BOTH"], default="BOTH")
    ap.add_argument("--base", default=DEFAULT_BASE)
    ap.add_argument("--fonts-dir", default=DEFAULT_FONTS)
    ap.add_argument("--out-dir", default="out")
    ap.add_argument("--plaque-text", default=None, help="texto na plaqueta (ex: Fabio, F, FB)")
    ap.add_argument("--plaque-bottom", default="", help="texto secundário na plaqueta (ex: vim)")
    ap.add_argument("--tux", action="store_true", help="inclui o logo Tux (Linux) na plaqueta")
    ap.add_argument("--tux-size", type=float, default=5.0, help="altura do logo Tux em mm")
    ap.add_argument("--plaque-cap", type=float, default=3.8)
    ap.add_argument("--plaque-font", default="audiowide.ttf")
    ap.add_argument("--side-text", default="linux", help="texto lateral ('' para remover)")
    ap.add_argument("--side-cap", type=float, default=2.6)
    ap.add_argument("--side-font", default="jetbrains-mono-bold.ttf")
    ap.add_argument("--side-x", default="auto", help="auto ou X explícito do centro")
    ap.add_argument("--side-y", type=float, default=-80.0)
    ap.add_argument("--side-rot", type=float, default=-90.0)
    ap.add_argument("--depth", type=float, default=0.55)
    ap.add_argument("--verify", action="store_true", help="imprime mapas ASCII da gravação")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()
    ENGRAVE_DEPTH = args.depth

    font_plaque = os.path.join(args.fonts_dir, args.plaque_font)
    font_side = os.path.join(args.fonts_dir, args.side_font)
    os.makedirs(args.out_dir, exist_ok=True)

    cover = trimesh.load(args.base)
    xc = (cover.bounds[0][0] + cover.bounds[1][0]) / 2.0
    if not args.quiet:
        print(f"cover: {cover.vertices.shape[0]} verts, wt: {cover.is_watertight}, "
              f"mirror xc={xc:.3f}")

    sides = ["LH", "RH"] if args.side == "BOTH" else [args.side]
    for side in sides:
        letter = args.plaque_text or ("Fabio" if side == "LH" else "Fabio")
        mirrored = (side == "RH")
        base = mirror_x(cover, xc) if mirrored else cover
        tag = f"{letter}"
        if args.tux:
            tag += "-Tux"
        elif args.plaque_bottom:
            tag += f"-{args.plaque_bottom}"
        if args.side_text:
            tag += f"-{args.side_text}"
        name = f"silakka54-chevron-cover-{tag}-{side}.stl"
        print(f"== {side}: placa '{letter}' + {'Tux + ' if args.tux else ''}lateral '{args.side_text}' -> {name}")

        top_poly = make_text_polygon(letter, args.plaque_cap, font_plaque)
        if args.tux:
            bottom_poly = load_tux_polygon(height=args.tux_size)
        elif args.plaque_bottom:
            bottom_poly = make_text_polygon(args.plaque_bottom, 4.0, font_side)
        else:
            bottom_poly = None

        plaque, eng = build_plaque(top_poly, bottom_poly,
                                   mirror_x_center=xc if mirrored else None)
        cut = solid_difference([plaque] + eng, f"{side} placa")
        body = solid_union([base, cut], f"{side} corpo")

        sx = 0.0
        ztop = SIDE_Z_TOP  # fallback; re-medido se args.side_text
        cap = args.side_cap
        if args.side_text:
            if args.side_x == "auto":
                # sonda o cover original (simétrico) na borda esquerda; espelha p/ RH
                sx0, lo, hi = find_side_x(cover, args.side_text, args.side_cap,
                                          args.side_y)
                if mirrored:
                    sx, lo, hi = 2 * xc - sx0, 2 * xc - hi, 2 * xc - lo
                else:
                    sx, lo, hi = sx0, lo, hi
            else:
                sx, lo, hi = float(args.side_x), body.bounds[0], body.bounds[2]
            # A faixa disponível pode ser mais estreita que o cap pedido:
            # reduzir o cap para caber inteiro na superfície plana (senão as
            # letras caem nos vales do chevron e ficam rasas/invisíveis).
            cap = args.side_cap
            strip_w = hi - lo
            if cap + 0.3 > strip_w:
                cap = max(strip_w - 0.3, 1.0)
                print(f"  aviso: faixa {strip_w:.1f}mm < cap {args.side_cap:.1f}+0.3; "
                      f"texto reduzido p/ cap {cap:.1f}mm")
            print(f"  lateral: x_c={sx:.2f} (faixa [{lo:.1f}, {hi:.1f}]), "
                  f"y_c={args.side_y}, cap={cap:.1f}")
            ztop = check_top_flat(body, args.side_text, cap,
                                  sx, args.side_y, label=f"{side} lateral")
            print(f"  lateral: topo medido z={ztop:.2f} -> gravação "
                  f"{ztop - ENGRAVE_DEPTH:.2f}..{ztop:.2f}")
            side_solid = build_side_solid(args.side_text, cap, font_side,
                                          sx, lo, hi, args.side_y, args.side_rot, ztop)
            body = solid_difference([body, side_solid], f"{side} lateral")

        out_path = os.path.join(args.out_dir, name)
        body.export(out_path)
        print(f"  salvo: {out_path}  wt: {body.is_watertight}, vol: {body.volume:.1f} mm³")

        if args.verify:
            # mapa da plaqueta (letra) — plano logo abaixo do topo da plaqueta
            px0 = PLAQUE["x0"] if not mirrored else 2 * xc - PLAQUE["x1"]
            px1 = PLAQUE["x1"] if not mirrored else 2 * xc - PLAQUE["x0"]
            verify_map(body, px0, px1, PLAQUE["y0"] + 0.6, PLAQUE["y1"] - 0.6,
                       PLAQUE["z_top"] - 0.25, step=0.28, label=f"{side} plaqueta")
            if args.side_text:
                sx0 = sx - (cap / 2 + 3.0)
                sx1 = sx + (cap / 2 + 3.0)
                verify_map(body, sx0, sx1, args.side_y - 8.0, args.side_y + 8.0,
                           ztop - 0.15, step=0.22, label=f"{side} lateral")


if __name__ == "__main__":
    main()