# CHANGELOG — Silakka54 (case personalizada)

Histórico completo das modificações: do zip original → versões intermediárias → versão final
("ideal") pronta para mandar imprimir.

Origem: **Silakka54** — teclado split ergonômico (case de Patrick Faulkner, GPL v2.0,
compatível com PCB AliExpress). Remixes de terceiros: "case with less screws" e "Screwless
and Tenting Platform carry case" (Douglas Serrão — remix permitido).

---

## v0 — ORIGINAL (zip, sem modificação)

Fonte: `silakka54-keyboard-case-with-less-screws-aliexpress-pcb-compatible-model_files.zip`
(2025-08-20) → `00-original/case-keyboard/`

| Arquivo | Papel |
|---|---|
| `silakka54-baseplate-screwunderneath.stl` | Baseplate (lado esquerdo — espelhar na fatia p/ direito) |
| `silakka54-top-frame-screwunderneath.stl` | Top frame (lado esquerdo — espelhar na fatia p/ direito) |
| `full-mcu-cover-chevrons.stl` | Cover com padrão chevron (base da nossa personalização) |
| `full-mcu-cover.stl` | Cover liso (alternativa) |
| `50pct-mcu-cover.stl` / `75pct-mcu-cover.stl` | Covers parciais (alternativas) |
| `no-cover-top-frame.stl` | Top frame sem recorte de cover (alternativa) |
| `1381297-...pdf` | Instruções de montagem do autor |

Fonte: `silakka54-screwless-and-tenting-platform-carry-case-model_files.zip`
(2026-03-18) → `00-original/carry-case/`

| Arquivo | Papel |
|---|---|
| `silakka54-case.stl` | Case de transporte (teclado montado + tenting platform) |
| `silakka-case-67mm.stl` | Case de transporte (altura 67 mm) |
| `1433122-...pdf` | Instruções do carry case |

Fonte: `silakka54-tent-tilt-ergonomic-kit-for-slim-screwless-case-model_files.zip`
(2025-05-29) → `00-original/tent-tilt-kit/`

| Arquivo | Papel |
|---|---|
| `silakka54_left_side_shell.stl` / `silakka54_right_side_shell.stl` | Side shells (159×127×7 mm) |
| `silakka54_left_base_support.stl` / `silakka54_right_base_support.stl` | Base supports (157×123×11 mm) |
| `silakka54_tilt_wedge_xdeg.stl` | Cunha de teste p/ angulação (6×25×74 mm) |
| `1312117-...pdf` | Instruções do kit (remix do Slim Screwless Case de Johnny5iv) |

> ⚠️ **Nenhum arquivo de `00-original/` foi alterado.** São a referência intacta.

---

## v1 — INTERMEDIÁRIA (SUPERADA) — cover "FB + Tux"

Pasta de origem: `silakka54-fb-tux/` (cópias em `02-superseded/`)

Modificações sobre `full-mcu-cover-chevrons.stl`:
- Plaqueta integrada 22 × 15 mm (cantos arredondados, +1,15 mm de relevo) no centro da face
  chevron.
- **"FB"** em baixo-relevo 0,55 mm (DejaVu Sans Bold, altura 5 mm) + **logo Tux (Linux)**
  gravado abaixo (silhueta oficial, 5,2 mm), proveniente de `tux.png` (Wikimedia Commons).
- Corpo único watertight, sem flutuação.

**Status: SUBSTITUÍDA** — o usuário pediu o cover redesenhado (v2). Mantida em
`02-superseded/` apenas como histórico (não imprimir).

---

## v2 — FINAL ("ideal") — covers F | B+vim + frases nas baseplates

Pasta de origem: `silakka54-FB-Tux-quote/out/` (cópias em `01-final/`)

### 2.1 `silakka54-chevron-cover-F-LH.stl` — lado ESQUERDO
- Base: `full-mcu-cover-chevrons.stl` (padrão chevron original preservado fora da plaqueta).
- Plaqueta 22 × 15 mm no topo (x 149–171, y −49,5..−34,5), topo z = 23,5. *(Original v1)*.
- Gravação: **"F"** (fonte Audiowide, cap 5 mm), profundidade **0,55 mm** (fundo z = 22,95).
- Imprimir **direto, sem espelhar** (texto já legível).

### 2.2 `silakka54-chevron-cover-B-vim-RH.stl` — lado DIREITO
- Mesma base/plaqueta, **espelhado em X (x = 160,71)**.
- Gravações: **"B"** (Audiowide, cap 5 mm) + **"vim"** (JetBrains Mono Bold, cap 4 mm).
- Texto re-gravado após o espelhamento → legível na posição final (não é espelho de texto).
- Imprimir **direto, sem espelhar**.

### 2.3 `silakka54-baseplate-js-LH.stl` — lado ESQUERDO
- Base: `silakka54-baseplate-screwunderneath.stl`.
- Faixa limpa na borda esquerda (x 21,5–29,5 / y −108,5..−30,5, ≈ 8 × 78 mm) na **face
  inferior** (z = 0,6) — a "carinha" do design anterior foi REMOVIDA a pedido.
- Gravação: **"Foi o JavaScript que me deu"** (JetBrains Mono, cap 2,6 mm auto-ajustada na
  faixa), texto girado 90° (lê-se ao longo do eixo Y), glifos em pé, **sem espelhamento**.
- Profundidade **0,5 mm** (fundo z = 1,10). Imprimir direto.

### 2.4 `silakka54-baseplate-java-RH.stl` — lado DIREITO
- Mesma base, **espelhado em X (x = 97,63)**.
- Gravação: **"Foi o Java que me deu"** (mesmos parâmetros), texto re-gravado legível.
- Imprimir **direto, sem espelhar**.

### Decisões do usuário incorporadas (histórico)
1. Excluir a "carinha" (rosto Tux) da baseplate → baseplates finais só têm a frase.
2. Trocar "FB + Tux" por **"F" (esq.) / "B + vim" (dir.)** nos covers.
3. Frases nas baseplates: *"Foi o JavaScript que me deu"* (esq.) / *"Foi o Java que me deu"*
   (dir.) — texto no **fundo** (visível por baixo), sem inversão (conferido por mapa ASCII
   ray-cast transposto).

### Fontes usadas (licenças)
- **Audiowide** — SIL Open Font License 1.1 (Brian J. Bonislawsky / AOETI)
- **JetBrains Mono** (regular + bold) — OFL 1.1 (JetBrains)

### Verificação técnica (v2)
- 4/4 arquivos **watertight**, sem non-manifold edges (re-carga do STL).
- Profundidades por ray-casting: cover 0,55 mm / baseplate 0,50 mm.
- Espelhamento RH conferido: cover x = 160,71 / baseplate x = 97,63.
- Texto sem inversão: prefixos/sufixos idênticos entre LH/RH no mapa ASCII.
- Hashes de integridade de todos os arquivos: `CHECKSUMS.sha256`.

---

## v2.1 — FINAL ATUALIZADA — covers F | B + "linux" na lateral

Pasta de origem: `ferramentas/out/` (cópias em `01-final/`); v2 antiga → `02-superseded/`

### 2.1.1 `silakka54-chevron-cover-F-linux-LH.stl` — lado ESQUERDO
- Mesma base/plaqueta da v2 ("F", Audiowide cap 5 mm, profundidade 0,55 mm).
- **NOVO: "linux" gravado na lateral esquerda** (texto vertical, JetBrains Mono Bold,
  cap 1,7 mm — auto-ajustada à crista de 2,0 mm; profundidade 0,55 mm, topo medido
  z = 22,35 → fundo z = 21,80).
- Sem "vim" no LH (nunca teve).

### 2.1.2 `silakka54-chevron-cover-B-linux-RH.stl` — lado DIREITO
- Mesma base, espelhado em X (x = 160,71). Plaqueta **"B"** (sem "vim" — decisão do
  usuário) + **"linux"** na lateral direita (mesmos parâmetros do LH, re-gravado legível).

### Correções técnicas (v2.1)
- **Bug de gravação lateral corrigido**: o topo da crista era 22,30–22,35, não 22,2 —
  a gravação fixa 21,65..22,2 deixava as letras enterradas sob uma "tampa" de ~0,1 mm
  (invisíveis). Agora a ferramenta **mede o topo real** no footprint do texto
  (`check_top_flat` + `measure_zmax`) e grava de `ztop−0,55` até `ztop`.
- **Posicionamento**: a crista contínua na faixa lateral tem só 2,0 mm de largura
  (x 147,7..149,7 LH — além disso começa o padrão chevron com vales de até 21,32).
  A ferramenta sonda a crista em duas alturas (21,85 e 22,17) e **reduz o cap
  automaticamente** para o texto caber inteiro na superfície plana (2,6 → 1,7 mm).
- Verificação: mapa ASCII ray-cast a z = ztop−0,15 mostra as letras "linux" completas
  nos dois covers; 4/4 peças watertight (re-carga do STL).

### 2.3/2.4 Baseplates — SEM mudanças
- `silakka54-baseplate-js-LH.stl` / `silakka54-baseplate-java-RH.stl` idênticas à v2.

### Verificação técnica (v2.1)
- Arquivos novos watertight, sem non-manifold edges (re-carga do STL).
- Espelhamento RH conferido: cover x = 160,71.
- Hashes de integridade de todos os arquivos: `CHECKSUMS.sha256`.

---

## v3.0 — VERSÃO ATUAL — Correção de Inversão + Tux + Kit 2-em-1 Carry & Tent

Pasta de origem: `01-final/`

### 3.1 Correção de Espelhamento nas Baseplates (Visão Inferior)
- `silakka54-baseplate-js-LH.stl`: Frase *"Foi o JavaScript que me deu"* gravada na face inferior com rotação 90° e **espelhamento 2D no eixo X**, corrigindo o problema de texto invertido ao virar o teclado por baixo.
- `silakka54-baseplate-java-RH.stl`: Frase *"Foi o Java que me deu"* gravada na face inferior, também com orientação corrigida e 100% legível por baixo.
- Criado script automatizado [`engrave_baseplate.py`](file:///home/fabiominsait/estudos/silakka54-fabio-custom/ferramentas/engrave_baseplate.py) para regeneração precisa e sem erros manuais.

### 3.2 Covers dos Chevrons (FB + Tux + linux)
- `silakka54-chevron-cover-FB-Tux-linux-LH.stl` (LH) e `silakka54-chevron-cover-FB-Tux-linux-RH.stl` (RH):
  - Plaqueta no topo com **"FB"** + **silhueta oficial do Tux (Linux)**.
  - Gravação vertical **"linux"** na crista lateral.
  - Malhas 100% estanques (*watertight*), com volume exato de 13786.4 mm³.

### 3.3 Kit 2-em-1 (Carry Case + Tent)
- Organizado na pasta `01-final/carry-tent-2em1/`:
  - `silakka-case-67mm.stl` e `silakka54-case.stl` (estojos de transporte projetados para comportar o teclado montado junto à plataforma de elevação ergonômica tent/tilt).
  - Componentes do Tent & Tilt Kit: side shells, base supports e tilt wedge.

---

## O que NÃO foi modificado (decisões conscientes)

- **Top frame** (`silakka54-top-frame-screwunderneath.stl`): original, sem gravações.
  Imprimir 2× — uma direta (esquerda) e uma espelhada em X (direita).

---

## Regenerar / modificar depois

Os STLs finais foram gerados por script (`engrave_baseplate.py` e `engrave_cover.py`). Para alterar textos,
fontes, tamanhos ou posições: executar os scripts em `ferramentas/`. Regra prática: **LH nunca espelha; RH já vem espelhado com texto
re-gravado** — nunca aplicar espelhamento duplo.