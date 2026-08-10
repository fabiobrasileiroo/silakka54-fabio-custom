# Silakka54 — Pacote de Impressão (versão final "FB + linux")

Pasta autocontida com todo o histórico do projeto: dos arquivos originais (zip) até a
**versão final personalizada**, pronta para mandar imprimir.

> 🌐 **Site com visualizador 3D interativo (GitHub Pages):**
> **https://fabiobrasileiro.me/silakka54-pacote-impressao/**
> (three.js via CDN + STLs servidos pelo jsDelivr; inclui guia de ergonomia)

## Estrutura

```
silakka54-pacote-impressao/
├── README.md                    ← este arquivo (visão geral)
├── CHANGELOG.md                 ← histórico detalhado de todas as modificações
├── INSTRUCOES_IMPRESSAO.md      ← guia para a pessoa que vai imprimir (LEIA ANTES)
├── CHECKSUMS.sha256             ← hashes de integridade de todos os arquivos
├── pyproject.toml               ← dependências das ferramentas (Poetry)
├── 00-original/
│   ├── case-keyboard/           ← arquivos ORIGINAIS do zip (intactos) + PDF de montagem
│   └── carry-case/              ← arquivos ORIGINAIS do carry case (intactos) + PDF
├── 01-final/                    ← ⭐ VERSÃO FINAL PARA IMPRIMIR ⭐
│   ├── LH/                      ← baseplate "Foi o JavaScript..." + cover "F + linux" (esquerdo)
│   ├── RH/                      ← baseplate "Foi o Java..." + cover "B + linux" (direito)
│   ├── comum/                   ← top frame (imprimir 1 direto + 1 espelhado)
│   └── previews/                ← pré-visualizações das 4 peças
├── ferramentas/                 ← script de regeneração (engrave_cover.py) + fontes
└── 02-superseded/               ← v1 ("FB + Tux") e v2 (sem "linux") — histórico, NÃO imprimir
```

## O que foi feito (resumo de 1 linha)

A case original (zip, sem personalização) foi customizada em 3 rodadas:
1. **v1** (superada): cover com plaqueta "FB + logo Tux".
2. **v2** (superada): covers com **"F"** (esquerda) e **"B + vim"** (direita), e baseplates
   com as frases **"Foi o JavaScript que me deu"** (esquerda) / **"Foi o Java que me deu"**
   (direita) gravadas na face inferior. A "carinha" da baseplate foi removida a pedido.
3. **v2.1 (final)**: covers **"F + linux"** / **"B + linux"** — "linux" gravado na lateral
   (fora da plaqueta, vertical), corrigida a profundidade para o topo real da crista.

Detalhes completos (medidas, fontes, eixos de espelhamento, verificações): **CHANGELOG.md**.

## Para imprimir

1. Leia **INSTRUCOES_IMPRESSAO.md** (lista de peças, quantidades, orientação).
2. Use só os arquivos de **`01-final/`** (mais `00-original/carry-case/` se quiser a caixa
   de transporte e `00-original/tent-tilt-kit/` se quiser o suporte ergonômico tent/tilt).
3. Regra de ouro: **arquivos `*RH*` já vêm espelhados — nunca espelhar de novo**; o único
   espelhamento a fazer é **1 cópia do top frame** (lado direito).

## Para modificar depois

- Texto/fonte/tamanho/posição das gravações → dá para **regenerar por script**:
  `cd ferramentas && poetry run python engrave_cover.py` (dependências gerenciadas pelo
  Poetry via `pyproject.toml`; instale com `poetry install` na raiz).
- Carry case → pode ser adaptado depois (pendente, proposital).
- Tenting platform (ergonomia 10–15°) → **incluído**: `00-original/tent-tilt-kit/`
  (kit Tent & Tilt Ergonômico de Douglas Serrão, original sem modificação).

## Licenças / créditos

- **Silakka54** — Patrick Faulkner (GPL v2.0; remix permitido com atribuição).
- **Case "less screws" / screwless + carry case** — remix de Douglas Serrão.
- Fontes: Audiowide (OFL 1.1), JetBrains Mono (OFL 1.1), DejaVu Sans (tux.png —
  Wikimedia Commons, silhueta oficial do Linux).