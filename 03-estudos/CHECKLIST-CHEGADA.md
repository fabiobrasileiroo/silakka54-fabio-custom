# Checklist "Dia 1" — quando o Silakka54 chegar

Ordem cronológica para montar, testar e configurar. Imprima ou abra no celular.

---

## □ Antes de abrir (planejar)

- [ ] Reserve mesa limpa + luz; tenha em mãos:
  - cabo **USB-C** (pré-montados da AliExpress às vezes **NÃO incluem**)
  - cabo **TRRS** (4 pinos) — se não veio, compre; TRS não funciona
  - chave de fenda pequena (não deve precisar para hotswap)
- [ ] Abra https://vial.rocks/ no **Chrome/Edge** para testar (guardar no favoritos)
- [ ] Tenha em mente: os dois zips/case impressa em `silakka54-pacote-impressao/`

## □ Unboxing físico

- [ ] Confira itens: 2 metades, switches (se kit), keycaps, cabos
- [ ] Se for kit (montar): coloque os **switches** nos sockets hotswap — pinos retos,
      força para baixo até o "click". Não force torto!
- [ ] Coloque as **keycaps** (⚠️ as de fábrica podem vir trocadas: pgup=Enter, del=Backspace —
      normal, remapear depois)
- [ ] Se usar a case impressa: monte baseplate + top frame → encaixe o PCB → covers chevron

## □ Conexão e primeiro teste

- [ ] Conecte as metades com o **TRRS** (ate o fim — conector de pré-montado é apertado)
- [ ] USB-C na **metade master** (a que tem o conector) → PC
- [ ] Abra https://vial.rocks/ → **Connect** → deve aparecer "Silakka54"
- [ ] **Key tester**: teste TODAS as 54 teclas (com o software "Key tester" ou num editor
      de texto) — as duas metades respondem?
- [ ] NÃO apareceu? → atualizar firmware (ver GUIA-VIAL.md seção 6: BOOT + uf2)

## □ Configuração no Vial (30–60 min)

- [ ] Mapear base: corrigir keycaps trocadas; colocar **camadas nas thumbs** (ex.:
      MO(1) thumb esquerda, MO(2) thumb direita, Space/Enter nas thumbs grandes)
- [ ] Camada 1: **setas + Home/End/PgUp/PgDn** + símbolos que usa muito
- [ ] Camada 2: **F1–F12** + atalhos (Ctrl+Shift+Esc etc.) — você tem **8 camadas**!
- [ ] (Opcional) Combos: Esc = A+S, Enter = F+J
- [ ] Ajustar **Tapping Term** (QMK Settings) se usar home-row mods
- [ ] **Backup**: File → Save current layout → `silakka54-layout-dia1.vil`
      (guarde uma cópia dentro de `silakka54-pacote-impressao/03-estudos/backups/`)

## □ Setup ergonômico na mesa (ver REPORT-ERGONOMIA.md)

- [ ] Metades na **largura dos ombros**, anguladas para dentro (punhos retos)
- [ ] Teclado **abaixo da altura do cotovelo** (cotovelo ~90°, antebraços apoiados)
- [ ] Slope **0° a −4°** — NÃO use pés traseiros se a case tiver (frente levemente alta)
- [ ] **Tenting** 10–15°: adicionar (kit Tent & Tilt / cunhas / parafusos assimétricos)
- [ ] Mãos **flutuando** — nada de encostar o pulso na mesa durante digitação
- [ ] Monitor no topo na altura dos olhos, ~50–70 cm

## □ Semana 1 (adaptação)

- [ ] Aceite a queda de velocidade: 2–4 semanas para voltar ao ritmo
- [ ] Use keybr.com / monkeytype com o layout para treinar memória muscular
- [ ] Micro-pausa a cada 20–30 min + alongamento de punhos
- [ ] Ajuste camadas conforme a dor/desconforto de alcance aparecer
- [ ] Salve novo `.vil` a cada mudança grande (backup!)

## □ Referências rápidas

| O quê | Onde |
|---|---|
| Guia Vial completo | `03-estudos/GUIA-VIAL.md` |
| Ergonomia científica | `03-estudos/REPORT-ERGONOMIA.md` |
| Guia visual animado | `03-estudos/GUIA-ERGONOMIA-VISUAL.html` |
| Firmware/UF2 | https://github.com/Squalius-cephalus/silakka54/releases |
| Manual Vial | https://get.vial.today/manual/ |