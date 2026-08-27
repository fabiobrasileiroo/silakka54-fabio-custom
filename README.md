# Silakka54 — Pacote de Impressão "Fabio custom" (v3.0 "FB + Tux + linux + Kit 2-em-1")

Pasta autocontida com todo o histórico do projeto: dos arquivos originais (zip) até a
**versão final personalizada**, pronta para mandar imprimir.

> 🌐 **Site com visualizador 3D interativo (GitHub Pages):**
> **https://fabiobrasileiro.me/silakka54-fabio-custom/**
> (three.js via CDN + STLs servidos pelo jsDelivr; inclui guia de ergonomia)

## Referências visuais

![Silakka54 original — teclado montado](docs/img/silakka54-original.png)

Fotos de referência (de terceiros, para demonstrar como o teclado fica montado):

- **Original do autor** — [squalius-cephalus.github.io/silakka54](https://squalius-cephalus.github.io/silakka54/) (Patrick Faulkner)
- **Exemplo real montado** — [Reddit r/ErgoMechKeyboards](https://www.reddit.com/r/ErgoMechKeyboards/comments/1nzly97/my_first_split_silakka54_from_aliexp_w_3d_printed/) (`docs/img/silakka54-assembled.jpg`)

📸 A foto do meu teclado montado será adicionada quando chegar.

## Estrutura

```
silakka54-pacote-impressao/
├── README.md                    ← este arquivo (visão geral)
├── CHANGELOG.md                 ← histórico detalhado de todas as modificações
├── INSTRUCOES_IMPRESSAO.md      ← guia para a pessoa que vai imprimir (LEIA ANTES)
├── CHECKSUMS.sha256             ← hashes de integridade de todos os arquivos
├── pyproject.toml               ← dependências das ferramentas (uv / Python)
├── 00-original/
│   ├── case-keyboard/           ← arquivos ORIGINAIS do zip (intactos) + PDF de montagem
│   ├── carry-case/              ← arquivos ORIGINAIS do carry case (intactos) + PDF
│   └── tent-tilt-kit/           ← arquivos ORIGINAIS do kit ergonômico tent/tilt
├── 01-final/                    ← ⭐ VERSÃO FINAL PARA IMPRIMIR ⭐
│   ├── LH/                      ← baseplate "Foi o JavaScript..." (corrigida) + cover "FB + Tux + linux"
│   ├── RH/                      ← baseplate "Foi o Java..." (corrigida) + cover "FB + Tux + linux"
│   ├── comum/                   ← top frame (imprimir 1 direto + 1 espelhado)
│   ├── carry-tent-2em1/         ← Kit 2-em-1 Carry Case (67mm/standard) + plataforma Tent/Tilt
│   └── previews/                ← pré-visualizações das peças e plaquetas
├── ferramentas/                 ← scripts de regeneração (engrave_baseplate.py / engrave_cover.py)
└── 02-superseded/               ← versões anteriores arquivadas
```

## O que foi feito (resumo de 1 linha)

A case original foi customizada na **v3.0**: covers com plaqueta **"FB + silhueta Tux (Linux)"** e texto lateral **"linux"**, baseplates com **"Foi o JavaScript que me deu"** (LH) / **"Foi o Java que me deu"** (RH) gravadas na face inferior com **orientação 100% legível por baixo (sem espelhamento)**, e o **Kit 2-em-1 Carry Case + Tent** reunido e pronto para uso.

Detalhes completos (medidas, fontes, eixos de espelhamento, verificações): **CHANGELOG.md**.

## Para imprimir

1. Leia **INSTRUCOES_IMPRESSAO.md** (lista de peças, quantidades, orientação).
2. Use os arquivos de **`01-final/`** (incluindo `01-final/carry-tent-2em1/` para o kit 2-em-1).
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