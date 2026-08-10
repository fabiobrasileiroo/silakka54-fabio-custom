# Guia de uso — Vial no Silakka54 (RP2040)

Como configurar o teclado **sem instalar nada**: via **Vial Web** (vial.rocks), com backup
e camadas. Baseado na documentação oficial do Vial e no firmware oficial do Silakka54
(repo Squalius-cephalus, v1.4 = Vial 0.7.5).

---

## 0. O que é o Silakka54 (seu teclado)

- Board **wired** com 2× RP2040 Zero (1 por metade), 54 teclas split colunar
  (6×4 + 3 thumb por metade), hotswap MX.
- Firmware oficial com **Vial embutido** = remapear ao vivo, sem recompilar nada.
- ⚠️ Existem clones **wireless** ("Silakka54 sem fio") que usam nice!nano/ZMK e **NÃO
  funcionam com Vial**. Se o seu é o *wired* com RP2040 (como o da AliExpress "QMK VIAL
  Programável RP2040 Zero"), está correto.

## 1. Do que você precisa

| Ferramenta | Onde | Quando |
|---|---|---|
| **Vial Web** (recomendado) | https://vial.rocks/ | Remapear, camadas, macros, backup |
| **Vial Desktop** (alternativa) | https://get.vial.today/download/ | Funciona offline; necessário no Linux p/ udev |
| **Manual oficial do Vial** (EN) | https://get.vial.today/manual/ | Dúvidas de funcionalidade |
| **Firmware oficial (UF2)** | https://github.com/Squalius-cephalus/silakka54/releases | Só se o teclado não for detectado |
| **Site do projeto** | https://squalius-cephalus.github.io/silakka54/ | Firmware + troubleshooting |

> 🌐 **Vial Web funciona melhor no Chrome/Edge** (usa WebHID). Firefox não suporta WebHID.

---

## 2. Primeira conexão (5 min)

1. **TRRS obrigatório**: conecte as 2 metades com cabo **TRRS (4 pinos)** — cabo TRS (3
   pinos) NÃO funciona. Connector de pré-montados costuma ser bem apertado: encaixe até o
   fim.
2. Conecte a **metade master** (a que tem USB) ao PC com cabo USB-C. Em teclados pré-montados
   da AliExpress, quase sempre é o lado que tem a porta + a ordem de flash define (LEFT/RIGHT).
3. Abra **https://vial.rocks/** → clique em **Connect** (ícone de teclado) → selecione o
   dispositivo "Silakka54".
4. **Teste todas as teclas**: aba **Key tester** (ou digite num editor) — confira se cada
   tecla responde. Se metade não responder, veja Troubleshooting (seção 7).
5. Se o layout mostrado no Vial não bater com o teclado físico, **atualize o firmware**
   (seção 6).

> 💡 If o precia: o firmware de fábrica dos pré-montados frequentemente tem **layout
> mínimo de 1 camada e keycaps trocadas** (ex.: pgup = Enter, del = Backspace). Não é
> defeito — é só remapear (seção 3).

---

## 3. Remapear teclas (o essencial)

1. No Vial Web, aba **Layout** (teclado desenhado em cima, paleta de teclas embaixo).
2. Clique na tecla física que quer mudar (ela fica destacada).
3. Clique na função nova na paleta (ou use a busca "Any key" para keycodes crus, ex. `KC_NO`).
4. **Já era** — a mudança é salva **na flash do teclado** imediatamente. Sobrevive a
   desligar, trocar de PC, tudo. Não precisa de "salvar" nem reflash.

Conceitos rápidos:
- **▽ (Transparent)**: "herda" da camada de baixo — usado para montar camadas.
- **MO(x)**: segura e ativa a camada x (mais usado).
- **LT(x, tecla)**: tap = tecla normal, hold = camada x (ex.: LT(1, Space)).
- **TG(x)**: liga/desliga a camada x (toggle).
- **OSL(x)**: camada x por UM toque (one-shot).
- **Layer Lock**: o firmware tem `LAYER_LOCK_ENABLE` — use tecla **QK_LLCK** para travar a
  camada atual (Caps Lock de camada).

## 4. Camadas — você tem 8!

O build Vial oficial do Silakka54 vem com **8 camadas** (`DYNAMIC_KEYMAP_LAYER_COUNT 8`),
muito mais que as 4 padrão do Vial. Sugestão de organiização:

| Camada | Função |
|---|---|
| 0 | Base (letras/números) |
| 1 | Símbolos e F-keys (via MO nas thumbs) |
| 2 | Navegação (setas, Home/End/PgUp/PgDn) |
| 3 | Mouse/Media (opcional) |

Dica de split de 54: coloque **Space / Enter / camadas nos thumb clusters** (3 thumbs por
metade) e tire a carga dos mindinhos. Exemplo de base:
- Esquerda: **Space** (thumb maior), **MO(1)** (thumb 2), **Backspace** (thumb 3)
- Direita: **Enter** (thumb maior), **MO(2)** (thumb 2), **Del** (thumb 3)

## 5. Macros, combos e tap-hold

- **Macros** (aba Macros): até 16 slots (M0–M15). Grave com **Record** ou monte ações na
  mão (tap/hold/delay). Atribua `M0` etc. a qualquer tecla. Ex.: M0 = "silakka54" +
  Enter; M1 = Ctrl+Shift+Esc.
- **Combos** (aba Combos): até 2–4 teclas juntas disparam UMA ação (ex.: **F+J = Enter**,
  **Esc = A+S**). Não ocupa slot de tecla — ótimo em split pequeno.
- **Tap-hold / home-row mods** (aba QMK Settings): ajuste `Tapping Term` (ex.: 180–220 ms).
  Se uma tecla "segurar vira shift" está disparando shift sem querer, aumente o termo.

## 6. Atualizar firmware (só se precisar)

**Quando**: teclado não aparece no Vial, ou quer a versão mais recente (v1.4, Vial 0.7.5,
com suporte a LEDs de camada).

1. **Backup primeiro**: Vial → `File` → `Save current layout` → salve seu `.vil` (o reflash
   **apaga o layout**). Desde o Vial 0.7.5 o **web app** (vial.rocks) também salva/abre
   `.vil` — Chrome/Edge: menu do layout (ou Ctrl+S / Ctrl+O). O firmware v1.4 do Silakka54
   já vem com Vial 0.7.5.
2. Baixe o **UF2** em https://github.com/Squalius-cephalus/silakka54/releases:
   - `silakka54_vial_LEFT.uf2` → metade esquerda
   - `silakka54_vial_RIGHT.uf2` → metade direita
   - (existe versão `NO_USBDETECT` se a normal não funcionar)
3. **Mode bootloader** de 2 jeitos:
   - Sem firmware: segure **BOOT** no RP2040 Zero e conecte ao USB.
   - Com firmware: **duplo clique no botão reset** → aparece drive USB.
4. **Arraste o `.uf2`** para o drive (drag-and-drop). A placa reinicia sozinha.
5. Repita na outra metade com o arquivo da outra metade (ou mesmo LEFT nas duas para
   forçar USB na esquerda; RIGHT nas duas para USB na direita).
6. Reabra o Vial e **carregue o `.vil`** de volta (`File` → `Load saved layout`).

> Se o Vial Web não for detectar o teclado no Linux com o app desktop: siga
> https://get.vial.today/manual/linux-udev.html (regra udev fornecida).

## 7. Troubleshooting rápido

| Sintoma | Causa provável | Solução |
|---|---|---|
| Metade direita morta | Cabo TRRS solto/apertado, ou **TRS** (3 pinos) | Encaixe com força; troque por TRRS |
| Teclas "trocadas" (pgup=Enter etc.) | Keycaps de fábrica mal rotuladas | Remapeie no Vial (ou troque keycaps) |
| Teclado some ao reiniciar o PC | Firmware antigo (issue de boot) | Atualizar para v1.4 |
| Vial não conecta | Versão wireless (ZMK) ou firmware faltando | Verificar modelo; reflash UF2 |
| Texto/tecla errada ao digitar | Layout do SO ≠ layout do teclado | Ajuste no sistema (ABNT2/US Intl) e remapeie |
| Algumas teclas sem resposta | Pino de switch torto / socket | Tira e recoloca o switch (pinos retos) |
| Vial Web mostra teclado "bloqueado" | Proteção de segurança do Vial Web | Digite o unlock combo **Esc + 1** (tecla de esc + tecla 1 juntas) para desbloquear |

**Referências**: manual oficial Vial (https://get.vial.today/manual/) · firmware oficial
Silakka54 (https://squalius-cephalus.github.io/silakka54/firmware.html) · repo
(https://github.com/Squalius-cephalus/silakka54).