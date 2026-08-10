# Relatório de Ergonomia — Como usar o Silakka54 (com base em estudos científicos)

Este relatório traduz a literatura científica em **instruções práticas** de como sentar,
posicionar o teclado e usar as mãos. Vale para o Silakka54 (54 teclas, split colunar) e para
qualquer estação de trabalho.

> ⚠️ Regra de ouro da ergonomia: **é o conjunto que importa** — cadeira + mesa + teclado +
> monitor + pausas. O teclado perfeito sobre uma mesa errada não resolve nada
> (The Heаrthful Home, "Keyboard Ergonomics Explained", 2026).

---

## 1. Postura completa (checklist visual)

Arranjo ideal da estação, de baixo para cima:

| Parte do corpo | Posição ideal | Fonte |
|---|---|---|
| **Pés** | Firmes no chão (ou descanso de pés) | Cornell CUergo |
| **Joelhos/quadril** | ~90° de flexão | Portal São Francisco / diretrizes gerais |
| **Coluna** | Lombar apoiada no encosto da cadeira, levemente reclinada | Cornell CUergo — "slightly reclined sitting position" |
| **Cotovelos** | **90°–100°**, próximos ao tronco, antebraços ~paralelos ao chão | ProtoArc 2026; Mork & Westgaard 2007 |
| **Antebraços** | **Apoiados** (mesa ou apoio de braço) — reduz carga de ombro/pescoço | Mork & Westgaard 2007 (doi 10.1007/s00421-007-0518-4) |
| **Pulsos** | **Neutros e retos** (extensão <15°), mãos **flutuando** sobre as teclas | Rempel; Cornell CUergo |
| **Ombros** | Relaxados, não encolhidos nem abduzidos | WorksmartHub |
| **Monitor** | Topo da tela na altura dos olhos, ~50–70 cm de distância, sem torcer o pescoço | Portal São Francisco; diretrizes gerais |

**O ponto mais importante para quem compra um split**: o teclado **abaixo** da altura do
cotovelo, com **slope negativo** (frente do teclado mais alta que o fundo). É a
"Negative slope keyboard support" da Cornell — a postura que minimiza carga muscular
estática.

---

## 2. O Silakka54 resolve o quê? (e o que falta resolver)

| Problema do teclado tradicional | O que o Silakka54 faz | Evidência |
|---|---|---|
| **Desvio ulnar** (punho dobrado para fora) | ❌ Resolvido — split colunar alinha mão/antebraço | Marklin & Simoneau 2001: split reduz desvio ulnar de ~12° para **<5°** (PubMed 11276185) |
| **Pronação do antebraço** (palma virada para baixo) | ⚠️ Parcial — precisa de **tenting 10°–15°** | Chen et al. 2009 (NIOSH); Rempel et al. 2007 (gable 14° ótimo) |
| **Extensão de punho** (dedos para cima) | ⚠️ Parcial — precisa de **slope 0° a −4°** | Chen et al. 2009: slopes 0° a −4° = menor extensão e menor pressão no túnel do carpo |
| **Ombros encolhidos / braços juntos** | ✅ Resolvido — metades na **largura dos ombros** | Dygma: split abre o peito e solta os ombros |
| **Alcance lateral** (F-keys, setas, mouse longe) | ✅ Resolvido — tudo chega via **camadas** (Vial) | Protocolo padrão de teclados pequenos |

**Tradução**: o split já te dá 60% do caminho. Os outros 40% vêm de **tenting (10°–15°) +
altura do cotovelo + slope neutro/negativo + pausas**.

---

## 3. Como posicionar o teclado na mesa (visão de cima)

Recomendação direta (Dygma "How to position your split keyboard", 2023):

1. **Comece junto**: metades quase juntas, levemente anguladas para dentro — as mãos
   alinhadas com os antebraços, punho SEM dobra para fora. Esse é o "ângulo zero".
2. **Abra aos poucos**: aumente a separação das metades até ficar na **largura dos ombros**.
   O peito abre, as costas endireitam sem esforço.
3. **Mouse no espaço central** (entre as metades ou ao lado), no mesmo plano do teclado,
   perto — sem esticar o braço.
4. **Regra de posicionamento**: cada metade fica **na frente do ombro correspondente**,
   não no centro do corpo. Se usar só uma metade, posicione o mouse "no lugar da metade
   faltante".

---

## 4. Tenting e slope — os ângulos "ideais"

### Tenting (rotação lateral das metades)

- **Por que**: reduz a **pronação** (rotação interna do antebraço que força a palma para
  baixo).
- **Quanto**: **10°–15°** é a faixa consensual. Rempel et al. 2007 (100 digitadores, 6
  teclados): combinação que deu postura mais neutra = **gable/abertura ~14°, slope 0°**.
  Acima de 20°–30° começa a sobrecarregar ombro/pescoço.
- **No Silakka54**: a case imprime plana (**0°**). Opções para tentear:
  - imprimir o kit **"Tent & Tilt Ergonomic Kit"** (Douglas Serrão — remix do *Slim
    Silakka54 screwless case* de Johnny5iv) — **já incluído** neste pacote em
    `00-original/tent-tilt-kit/` (side shells + base supports + tilt wedge, conforme PDF);
  - ou usar parafusos/pés de borracha assimétricos (~12° ≈ uma forma barata de tenting);
  - ou imprimir cunhas de tenting sob medida (podemos modelar para a sua baseplate).

### Slope (inclinação frente→trás)

- **Por que**: teclado com a traseira mais alta (slope positivo) força **extensão do
  punho** — o desvio mais associado ao túnel do carpo.
- **Quanto**: **0° a −4°** (frente levemente mais alta que o fundo, ou mesa plana) —
  Chen et al. 2009 (NIOSH, estudo com teclado split "gabled"): slopes de 0° a −4° deram
  a menor extensão de punho, menor pronação e cotovelo mais baixo.
- **Na prática**: **NÃO use os pés traseiros de apoio** (aumentam o slope positivo).
  Prefira o teclado deitado ou com inclinação negativa (frente levantada).

---

## 5. Mãos: apoiar ou não apoiar? (a resposta científica)

**Contraintuitivo, mas claro na literatura: apoiar o PULSO é ruim.**

- O protocolo dos estudos de pressão no túnel do carpo (Rempel et al. 2008; CDC 2008)
  **proibia** voluntários de apoiar as mãos/pulsos em qualquer superfície durante a
  digitação — justamente porque a **pressão de contato na palma/pulso AUMENTA a pressão
  no túnel do carpo**.
- Apoio de **palma** (parte carnuda da mão, não o pulso) na **mesma altura das teclas** é
  aceitável — e útil como **apoio para pausas**, não durante a digitação
  (2021 J. Hand Therapy review; ProtoArc 2026).
- O que a literatura realmente apoia: **antebraço apoiado** na mesa/apoio de braço e
  **mãos flutuando** (hover) sobre as teclas — isso reduz carga de ombro
  (Mork & Westgaard 2007) sem aumentar pressão no punho.
- **Palm rest impresso (TPU)**: se quiser, pode imprimir um palm rest na altura das
  teclas para pausas — mas não encoste o punho nele durante a digitação.

---

## 6. Treino e adaptação (realista)

- **Curva de aprendizado**: 2 a 4 semanas para voltar à velocidade anterior
  (ProtoArc 2026). Grave e aceite a queda inicial de velocidade.
- **Regra de dedos estrita**: o split colunar tem colunas por dedo — não "roube" tecla da
  outra metade. A precisão volta antes da velocidade.
- **Thumb clusters**: os 3 polegar por metade são ouro — mapeie neles as teclas mais
  usadas (Space/Layer/Enter) para tirar carga dos mindinhos.
- **Micro-pausas**: a cada 20–30 min, solte as mãos, estique dedos e reset a postura.
  Movimento > pose perfeita.
- **Digitação guiada**: use keybr.com/monkeytype com layout do teclado para construir
  memória muscular.

---

## 7. Vídeos recomendados (YouTube)

| Vídeo | Canal | Por que assistir |
|---|---|---|
| [How to Set Up Your First Split Keyboard for Ergonomics](https://www.youtube.com/watch?v=QkJCyvwq5Ck) | — (2024) | Posicionamento das metades, largura do split, ângulo e mouse — exatamente o passo a passo da seção 3 |
| [SPLIT KEYBOARDS: How to Use Them, Why They're Great](https://www.youtube.com/watch?v=e1dUeoL_t00) | — | Visão geral em PT: funcionamento do teclado dividido, experiência prática |
| [Are Split Keyboards Better For Ergonomics?](https://www.youtube.com/watch?v=1C2bJkzIaPE) | Ben Vallack | Referência da comunidade ergo — análise honesta do ângulo de pulso em teclados fixos vs split |
| Canal [Ben Vallack](https://www.youtube.com/@BenVallack) | Ben Vallack | O youtuber de referência de teclados ergonômicos: camadas, thumb clusters, layouts |
| Canal [Dygma Lab](https://www.youtube.com/c/DygmaLab) | Dygma | Guias visuais de posicionamento e tenting (vídeo embutido no post "How to position your split keyboard") |

> Dica de busca: no YouTube, pesquise **"split keyboard ergonomics setup"** ou
> **"teclado split postura"** — os vídeos da Dygma e do Ben Vallack são os mais citados
> pela comunidade r/ErgoMechKeyboards.

---

## 8. Fontes citadas (para estudar a fundo)

1. **Chen et al. 2009** — *Effects of split gabled keyboard geometry on upper body postures and comfort* (NIOSH) — https://stacks.cdc.gov/view/cdc/189560
2. **Rempel et al. 2007** — *A randomized controlled trial evaluating the effects of six workstations on mouse forearm posture, carpal tunnel pressure...* / estudo com 100 digitadores (gable 14°, slope 0°) — via Xah Lee survey: http://xahlee.info/kbd/ergonomic_keyboard_science.html
3. **Rempel et al. 2008 (HF review)** — *The Split Keyboard: An Ergonomics Success Story* — http://xahlee.info/kbd/i2/split_keyboard__david_Rempel_2008_HF.pdf
4. **CDC 2008** — estudo de pressão no túnel do carpo (contato palmar) — https://stacks.cdc.gov/view/cdc/189560/cdc_189560_DS1.pdf
5. **Marklin & Simoneau 2001** — *Effect of setup configurations of split computer keyboards on wrist ulnar deviation* — https://pubmed.ncbi.nlm.nih.gov/11276185 (90 digitadores; desvio ulnar 12° → <5°)
6. **Cornell CUergo** — *Neutral Posture Typing* (slope negativo, cotovelo ~90°) — https://ergo.human.cornell.edu/AHTutorials/typingposture.html
7. **Mork & Westgaard 2007** — antebraços apoiados reduzem carga de ombro — doi 10.1007/s00421-007-0518-4
8. **Dygma 2023** — *How to position your split keyboard* — https://dygma.com/blogs/ergonomics/how-to-position-your-split-keyboard
9. **The Hearthful Home 2026** — *Keyboard Ergonomics Explained: Angle, Split, and Wrist Position* — https://thehearthfulhome.com/keyboard-ergonomics-angle-split-wrist-position/
10. **ProtoArc 2026** — *Split Keyboard Touch Typing Tips* (tenting 5–15°, cotovelo 90–100°, split na largura dos ombros) — https://www.protoarc.com/blogs/news/split-keyboard-typing-tips-ergonomics

---

*Guia gerado em 2026-08-09. Consulte também `GUIA-ERGONOMIA-VISUAL.html` (guia animado) e
`GUIA-VIAL.md` (configuração do teclado).*