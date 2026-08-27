# ferramentas/ — ferramentas de regeneração

Ferramentas que **regeneram** os arquivos finalizados (`01-final/`). Use
qualquer mudança futura nas gravações ou previews sem mexer à mão nos STLs.

Dependências gerenciadas via `uv` / Python (`./ferramentas/uv run` ou `poetry run`):
`trimesh`, `numpy`, `shapely`, `matplotlib`, `pillow`, `manifold3d`.

---

## engrave_baseplate.py — gravações nas baseplates (face inferior corrigida)

Gera as baseplates com as frases gravadas na face inferior, com espelhamento 2D horizontal corrigido para visualização natural e legível por baixo do teclado:

```bash
./ferramentas/uv run python3 ferramentas/engrave_baseplate.py --side BOTH
```

---

## engrave_cover.py — gravações nos covers (FB + Tux + linux)

Reproduz o design atual da v3.0:

```bash
./ferramentas/uv run python3 ferramentas/engrave_cover.py --side BOTH --plaque-text FB --tux --side-text linux
```

Saída: `silakka54-chevron-cover-<LETRA>[-<extra>][-<lateral>]-<LH|RH>.stl`
em `--out-dir` (default `out/`). Depois de gerar, copie para `01-final/`.

### Flags mais usados

| Flag | Default | O que faz |
|---|---|---|
| `--side-text 'X'` | `linux` | texto lateral (passe `''` para remover) |
| `--plaque-bottom 'vim'` | — | texto secundário empilhado na plaqueta |
| `--plaque-cap 5.0` | `5.0` | altura da letra da plaqueta (mm) |
| `--side-cap 3.5` | `2.6` | altura do texto lateral (limite ~3 mm) |
| `--depth 0.55` | `0.55` | profundidade da gravação (mm) |
| `--side-x auto` | `auto` | X do centro do texto lateral (ou número) |
| `--side-y -80` | `-80` | Y do centro do texto lateral |
| `--side-rot -90` | `-90` | rotação do texto lateral (graus) |
| `--plaque-font` / `--side-font` | audiowide / jetbrains-mono-bold | fontes em `fonts/` |
| `--base <stl>` | `00-original/.../full-mcu-cover-chevrons.stl` | mesh base |
| `--verify` | off | imprime mapas ASCII da região gravada |
| `--quiet` | off | silencia logs |

### Regra crítica

**Nunca espelhe um `*RH*`.** O script já gera o lado direito no sentido
correto; espelhar de novo inverte as gravações.

---

## make_previews.py — previews PNG das peças (site)

Renderiza um STL em PNG para os cards do site (fundo `#161b22`, cor por
peça, perspectiva 3D fixa):

```bash
poetry run python make_previews.py <stl> <out.png> [--color RRGGBB] [--elev 25] [--azim -60]
```

Exemplo (cores iguais às do viewer 3D do site):

```bash
poetry run python make_previews.py ../01-final/LH/silakka54-chevron-cover-F-linux-LH.stl \
  ../01-final/previews/preview-F-linux-LH.png --color f2a33c
```

Saída: PNG quadrado 1440×1440 em `01-final/previews/`. Manter o mesmo
padrão de nome `preview-<id>.png` — o site referencia por esse caminho.

---

## Fluxo sugerido ao alterar uma gravação

1. `engrave_cover.py` com os novos parâmetros → confira com `--verify` → copie p/ `01-final/`.
2. `make_previews.py` → atualize o preview da peça em `01-final/previews/`.
3. Commit + push → o site (via jsDelivr CDN) e o README refletem automaticamente.