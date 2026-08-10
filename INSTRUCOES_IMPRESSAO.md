# Instruções de Impressão — Silakka54 personalizado (FB + linux)

Guia para a pessoa/gráfica que vai imprimir. Teclado **split** = 2 metades (L = left,
R = right). Total: **4 peças customizadas + 2 top frames + (opcional) carry case**.

---

## Lista de impressão (obrigatória — teclado completo)

| # | Arquivo | Qtd | Lado | Observação |
|---|---|---|---|---|
| 1 | `01-final/LH/silakka54-baseplate-js-LH.stl` | 1 | Esquerdo | Imprimir **direto** (frase "Foi o JavaScript..." por baixo) |
| 2 | `01-final/RH/silakka54-baseplate-java-RH.stl` | 1 | Direito | Imprimir **direto** — JÁ vem espelhado (frase "Foi o Java..." por baixo) |
| 3 | `01-final/comum/silakka54-top-frame-screwunderneath.stl` | 2 | 1 esq. + 1 dir. | **Espelhar em X APENAS uma cópia** (a do lado direito) no fatiador |
| 4 | `01-final/LH/silakka54-chevron-cover-F-linux-LH.stl` | 1 | Esquerdo | Imprimir **direto** (letra "F" + "linux" na lateral) |
| 5 | `01-final/RH/silakka54-chevron-cover-B-linux-RH.stl` | 1 | Direito | Imprimir **direto** — JÁ vem espelhado ("B" + "linux" na lateral) |

> ⚠️ **NUNCA espelhar os arquivos RH** (`*java-RH.stl`, `*B-linux-RH.stl`): eles já saíram
> espelhados do modelo, com o texto re-gravado legível. Espelhamento duplo = texto invertido.

## Opcional

| Arquivo | Quando imprimir |
|---|---|
| `00-original/carry-case/silakka54-case.stl` | Para transportar o teclado montado (com tenting platform) |
| `00-original/carry-case/silakka-case-67mm.stl` | Variante 67 mm do carry case |
| `00-original/case-keyboard/full-mcu-cover.stl` ou `75pct-mcu-cover.stl` / `50pct-mcu-cover.stl` | Covers alternativos (liso / parciais) caso não queira o chevron |
| `00-original/case-keyboard/no-cover-top-frame.stl` | Top frame sem recorte de cover |

## Parâmetros sugeridos

- **Material**: PLA ou PETG (PETG recomendado para durabilidade nas bordas de encaixe dos
  switches; PLA bem calibrado também funciona — folgas do projeto original).
- **Bico / camada**: bico 0,4 mm · camada 0,2 mm (relevos de 0,5–0,55 mm resolvem limpo).
- **Suportes**: NÃO usar. Todas as peças imprimem sem suporte.

## Orientação na mesa

- **Covers (chevron)**: plaqueta com a gravação ("F" / "B") **para cima** (face lisa
  de topo no prato). O relevo é gravado (rebaixado) — sem risco de descolar. O "linux"
  fica na lateral (texto vertical, cap 1,7 mm, profundidade 0,55 mm).
- **Baseplates**: face inferior (frase) para baixo, como no STL — a frase fica **visível
  por baixo** do teclado. Imprimir na orientação padrão do arquivo; o recesso de 0,5 mm
  não precisa de suporte.
- **Top frame**: orientação padrão; a cópia do lado direito com espelhamento em X.

## Pós-impressão

- Conferir encaixe dos switches nos 4 cantos de cada metade (folgas do projeto original).
- Montagem: baseplate + top frame (por baixo) + PCB AliExpress compatível (RP2040 /
  QMK-VIAL) + cover chevron na área do MCU. Seguir o PDF do autor em
  `00-original/case-keyboard/1381297-...pdf`.

## Ergonomia (resumo científico — decisão do projeto)

- Case original sai com **0° slope / 0° tenting** — funciona, mas em sessões longas é
  melhor adicionar **tenting 10–15°** + **slope 0° a −4°** (estudos: NIOSH/Chen 2009,
  Rempel 2007). ✅ O kit **"Tent & Tilt Ergonomic Kit"** (Douglas Serrão) **está neste
  pacote**: `00-original/tent-tilt-kit/` (side shells + base supports + tilt wedge).
  Seguir o PDF do kit para impressão/configuração (compatível só com o case screwless).
- Apoio de pulso clássico: **não recomendado** (pressão no túnel do carpo aumenta).
  Prefira apoiar o antebraço e deixar as mãos flutuando/palma em altura das teclas.