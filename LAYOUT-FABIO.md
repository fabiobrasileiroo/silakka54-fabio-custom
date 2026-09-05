# Layout de Alta Performance: Silakka54 para Vim, DWM e Português (US-Intl)

Este layout foi desenhado sob medida para o **Silakka54 (54 teclas)**, otimizando o fluxo de trabalho com **DWM**, **Vim/LazyVim**, **VSCode** e digitação natural em **Português (Brasil)** usando o padrão `setxkbmap -layout us -variant intl`.

---

## 🎯 Princípios Ergonômicos do Design

1. **Acentuação em Português sem atrito**:
   - `KC_QUOT` (`'` e `"`) mantido na Home Row direita (ao lado do `;`), preservando a memória muscular de teclados tradicionais (ex: AULA F75) para digitação de `'` + `c` = `ç`, `'` + `a` = `á`, etc.
   - `KC_GRAVE` (`` ` `` e `~`) posicionado no canto superior esquerdo para acesso imediato a `~` + `a` = `ã` e crases sem malabarismos.
   - `KC_RALT` (AltGr) no polegar direito para atalhos diretos (`AltGr + ,` = `ç`, `AltGr + /` = `°`).

2. **DWM Seamless (Mod4 / Super)**:
   - `Super` (`KC_LGUI`) posicionado estrategicamente no **polegar esquerdo**, tornando atalhos como `Super + Enter` (abrir terminal `st`), `Super + d` (dmenu), `Super + j/k` (foco de janelas) e `Super + 1..4` (workspaces) totalmente confortáveis e sem esticar a mão.
   - A linha numérica superior dedicada física (`1 2 3 4 5 6 7 8 9 0`) permite alternar tags no DWM instantaneamente.

3. **Vim & VSCode Navigation**:
   - **CapsLock Dual-Role (`LCTL_T(KC_ESC)`)**: Toque rápido emite `ESC` (ideal para sair do modo Insert no Vim). Segurar funciona como `CTRL` padrão para atalhos de terminal (`Ctrl+C`, `Ctrl+Z`, `Ctrl+R`).
   - **Camada NAV (Layer 1)**: Ao segurar o polegar esquerdo, a mão direita transforma-se nas setas do Vim (`H`, `J`, `K`, `L`), com `Home` (`U`), `End` (`P`), `Page Up` (`I`) e `Page Down` (`O`).

4. **Símbolos de Programação (Layer 2)**:
   - Parênteses `( )`, chaves `{ }`, colchetes `[ ]` e sinais de menor/maior `< >` dispostos lado a lado na mão esquerda, sem necessidade de esticar o mindinho para a linha de números com Shift.

---

## 🗺️ Mapa das Camadas

### Layer 0: BASE (QWERTY US-Intl)
```text
[L-Half]
Row 0:  ` / ~    1      2      3      4      5
Row 1:  TAB      Q      W      E      R      T
Row 2:  ESC/CTL  A      S      D      F      G
Row 3:  SHIFT    Z      X      C      V      B
Thumbs: SUPER    MO(1)  SPACE

[R-Half]
Row 0:  6        7      8      9      0      - / _
Row 1:  Y        U      I      O      P      BACKSPACE
Row 2:  H        J      K      L      ; / :  ' / "
Row 3:  N        M      , / <  . / >  / / ?  SHIFT
Thumbs: ENTER    MO(2)  ALT_GR
```

---

### Layer 1: NAV & DWM & MULTIMÍDIA (Segure Polegar Esquerdo: `MO(1)`)
```text
[L-Half]
Row 0:  ___      PREV   NEXT   PLAY   VOL-   VOL+
Row 1:  ___      MUTE   BRI+   PRTSCR ___    ___
Row 2:  ___      BRI-   ALT    SHIFT  CTRL   SUPER
Row 3:  ___      ___    ___    ___    ___    ___
Thumbs: SUPER    ___    MO(3)

[R-Half]
Row 0:  ___      ___    ___    ___    ___    ___
Row 1:  ___      HOME   PGUP   PGDN   END    DEL
Row 2:  LEFT(H)  DOWN(J)UP(K)  RGHT(L)INS    ___
Row 3:  ___      BSPC   DEL    ___    ___    ___
Thumbs: ENTER    MO(3)  ___
```

---

### Layer 2: SYM - Símbolos de Dev (Segure Polegar Direito: `MO(2)`)
```text
[L-Half]
Row 0:  ~        !      @      #      $      %
Row 1:  ___      (      )      {      }      |
Row 2:  ___      &      *      -      +      =
Row 3:  ___      [      ]      <      >      \
Thumbs: SUPER    MO(3)  SPACE

[R-Half]
Row 0:  ^        &      *      (      )      +
Row 1:  !        :      ?      "      '      BSPC
Row 2:  =        +      -      *      /      :
Row 3:  _        %      ;      .      /      ___
Thumbs: ENTER    ___    ALT_GR
```

---

### Layer 3: NUMPAD & FN & HARDWARE (Segure ambos os polegares: `MO(3)`)
```text
[L-Half]
Row 0:  ___      F1     F2     F3     F4     F5
Row 1:  ___      F6     F7     F8     F9     F10
Row 2:  ___      F11    F12    ___    ___    ___
Row 3:  ___      ___    ___    ___    ___    BOOTLOADER (Flash)
Thumbs: ___      ___    ___

[R-Half]
Row 0:  ___      7      8      9      *      ___
Row 1:  ___      4      5      6      +      ___
Row 2:  ___      1      2      3      -      NUM_ENTER
Row 3:  0        0      .      /      =      ___
Thumbs: NUM_ENTER ___   ___
```

---

### Layer 4: VIM MOUSE & SCROLL & CLIQUES (`TG(4)`: Polegar E + `V` ou `B`)
```text
[L-Half]
Row 0:  SAIR(0)  SNIPER(0) NORMAL(1) TURBO(2)  ___    ___
Row 1:  TAB      ___       SCROLL_UP SCROLL_DN ___    ___
Row 2:  SAIR(0)  BTN_MEIO  BTN_ESQ   BTN_DIR   ___    ___
Row 3:  SHIFT    CTRL      ALT       VOLTAR(4) AVAN(5)SAIR(0)
Thumbs: BTN_ESQ  SAIR(0)   BTN_DIR

[R-Half]
Row 0:  ___      ___       ___       ___       ___    ___
Row 1:  SCR_ESQ  SCROLL_UP SCR_BAIXO SCR_BAIXO SCR_DIR BSPC
Row 2:  MS_ESQ(H)MS_BAIX(J)MS_CIMA(K)MS_DIR(L) BTN_ESQ BTN_DIR
Row 3:  BTN_ESQ  BTN_DIR   BTN_MEIO  ___       ___    SAIR(0)
Thumbs: BTN_ESQ  SAIR(0)   BTN_DIR
```

* **Como ativar**: Segure o polegar esquerdo (`MO(1)`) e aperte `V` ou `B`. O teclado trava no modo mouse!
* **Como usar**: Mão direita mexe o cursor com `HJKL` e rola com `U/I/O`. Polegares e mão esquerda clicam (`Btn 1` / `Btn 2`).
* **Como sair**: Aperte `Esc` ou a tecla do meio do polegar (`TO(0)`) e ele volta instantaneamente para a digitação normal.

---

## 🚀 Como Importar no Vial

1. Abra o **Vial** (AppImage ou pelo navegador em [vial.rocks](https://vial.rocks)).
2. Conecte o seu **Squalius-cephalus silakka54**.
3. No menu superior, clique em:
   **File** -> **Load layout...**
4. Selecione o arquivo:
   `silakka54-fabio-vim-dwm.vil` (está na sua pasta **Downloads** ou dentro deste repositório).
5. O Vial aplicará o layout imediatamente!
