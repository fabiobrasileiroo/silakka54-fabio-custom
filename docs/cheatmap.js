// ==========================================================================
// DADOS E COMPORTAMENTO DO CHEATMAP - SILAKKA54
// ==========================================================================

const LAYERS_DATA = {
  0: {
    id: 0,
    title: "Layer 0: BASE (QWERTY US-Intl)",
    badgeText: "Layer 0: Base QWERTY (Padrão)",
    badgeClass: "layer-badge-0",
    desc: "Camada padrão: Digitação fluida em Português (US-Intl), DWM no polegar e Vim no CapsLock.",
    keysLeft: [
      { p: "` / ~", s: "KC_GRAVE", t: "key-accent", title: "Crase e Til (`~`)", desc: "Acesso imediato para acentos em Português: ~ + a = ã, ` + a = à.", qmk: "KC_GRAVE", code: "Backquote" },
      { p: "1", s: "Tag 1", t: "key-alpha", title: "Número 1 / Tag 1", desc: "No DWM: Super+1 muda para Tag 1. Super+Shift+1 move a janela.", qmk: "KC_1", code: "Digit1" },
      { p: "2", s: "Tag 2", t: "key-alpha", title: "Número 2 / Tag 2", desc: "No DWM: Super+2 muda para Tag 2.", qmk: "KC_2", code: "Digit2" },
      { p: "3", s: "Tag 3", t: "key-alpha", title: "Número 3 / Tag 3", desc: "No DWM: Super+3 muda para Tag 3.", qmk: "KC_3", code: "Digit3" },
      { p: "4", s: "Tag 4", t: "key-alpha", title: "Número 4 / Tag 4", desc: "No DWM: Super+4 muda para Tag 4.", qmk: "KC_4", code: "Digit4" },
      { p: "5", s: "", t: "key-alpha", title: "Número 5", desc: "Tecla numérica 5.", qmk: "KC_5", code: "Digit5" },

      { p: "Tab", s: "", t: "key-mod", title: "Tab", desc: "Tabulação padrão. No DWM: Super+Tab alterna layout anterior.", qmk: "KC_TAB", code: "Tab" },
      { p: "Q", s: "kill", t: "key-alpha", title: "Letra Q", desc: "No DWM: Super+Shift+Q fecha a janela atual (killclient).", qmk: "KC_Q", code: "KeyQ" },
      { p: "W", s: "", t: "key-alpha", title: "Letra W", desc: "No Vim: w pula para a próxima palavra.", qmk: "KC_W", code: "KeyW" },
      { p: "E", s: "", t: "key-alpha", title: "Letra E", desc: "No Vim: e vai para o fim da palavra.", qmk: "KC_E", code: "KeyE" },
      { p: "R", s: "restart", t: "key-alpha", title: "Letra R", desc: "No DWM: Super+Shift+R reinicia o DWM.", qmk: "KC_R", code: "KeyR" },
      { p: "T", s: "tiling", t: "key-alpha", title: "Letra T", desc: "No DWM: Super+T ativa o layout Tiling.", qmk: "KC_T", code: "KeyT" },

      { p: "Esc", s: "Ctrl", t: "key-mod", title: "CapsLock Dual-Role: Esc (Tap) / Ctrl (Hold)", desc: "✨ Chave Mestra para Vim & Terminal: Toque rápido = ESC (sair do modo insert no Vim). Segure = CTRL (atalhos como Ctrl+C, Ctrl+R, etc.).", qmk: "LCTL_T(KC_ESC)", code: "Capslock" },
      { p: "A", s: "audio", t: "key-alpha", title: "Letra A", desc: "No DWM: Super+A abre menu de áudio. Super+Shift+A menu bluetooth.", qmk: "KC_A", code: "KeyA" },
      { p: "S", s: "", t: "key-alpha", title: "Letra S", desc: "No Vim: s substitui caractere.", qmk: "KC_S", code: "KeyS" },
      { p: "D", s: "dmenu", t: "key-alpha", title: "Letra D", desc: "No DWM: Super+D abre o dmenu!", qmk: "KC_D", code: "KeyD" },
      { p: "F", s: "float", t: "key-alpha", title: "Letra F", desc: "No DWM: Super+F layout monocle/floating.", qmk: "KC_F", code: "KeyF" },
      { p: "G", s: "", t: "key-alpha", title: "Letra G", desc: "No Vim: G vai para o fim do arquivo.", qmk: "KC_G", code: "KeyG" },

      { p: "Shift", s: "", t: "key-mod", title: "Shift Esquerdo", desc: "Modificador Shift.", qmk: "KC_LSFT", code: "ShiftLeft" },
      { p: "Z", s: "scrot", t: "key-alpha", title: "Letra Z", desc: "No DWM: Super+Z tira screenshot com gnome-screenshot!", qmk: "KC_Z", code: "KeyZ" },
      { p: "X", s: "", t: "key-alpha", title: "Letra X", desc: "No Vim: x apaga caractere sob o cursor.", qmk: "KC_X", code: "KeyX" },
      { p: "C", s: "code", t: "key-alpha", title: "Letra C", desc: "No DWM: Super+C abre o VSCode.", qmk: "KC_C", code: "KeyC" },
      { p: "V", s: "ranger", t: "key-alpha", title: "Letra V", desc: "No Vim: v entra no modo visual. No DWM: Super+V abre o ranger.", qmk: "KC_V", code: "KeyV" },
      { p: "B", s: "bar", t: "key-alpha", title: "Letra B", desc: "No DWM: Super+B esconde/mostra a barra de status.", qmk: "KC_B", code: "KeyB" }
    ],
    thumbsLeft: [
      { p: "Super", s: "DWM", t: "key-mod", title: "Tecla Windows / Super (DWM Master)", desc: "🚀 Modificador Mestre do DWM no polegar esquerdo! Super+Enter = Terminal, Super+D = dmenu, Super+J/K = janelas.", qmk: "KC_LGUI", code: "MetaLeft" },
      { p: "MO(1)", s: "👉 NAV", t: "key-layer", title: "Ativador de Navegação (Layer 1)", desc: "⚡ CLIQUE OU SEGURE para ver e ativar a Layer 1 (Setas Vim HJKL, Home, End, PgUp, PgDn e Mídia)!", qmk: "MO(1)", targetLayer: 1 },
      { p: "Space", s: "", t: "key-alpha", title: "Barra de Espaço", desc: "Espaço no polegar esquerdo. Dead keys: ' + espaço = ' literal.", qmk: "KC_SPC", code: "Space" }
    ],
    keysRight: [
      { p: "6", s: "", t: "key-alpha", title: "Número 6", desc: "Número 6.", qmk: "KC_6", code: "Digit6" },
      { p: "7", s: "", t: "key-alpha", title: "Número 7", desc: "Número 7.", qmk: "KC_7", code: "Digit7" },
      { p: "8", s: "", t: "key-alpha", title: "Número 8", desc: "Número 8.", qmk: "KC_8", code: "Digit8" },
      { p: "9", s: "", t: "key-alpha", title: "Número 9", desc: "Número 9.", qmk: "KC_9", code: "Digit9" },
      { p: "0", s: "", t: "key-alpha", title: "Número 0", desc: "Número 0. Super+0 = ver todas as tags no DWM.", qmk: "KC_0", code: "Digit0" },
      { p: "- / _", s: "KC_MINS", t: "key-alpha", title: "Hífen e Underscore", desc: "Hífen (-) e Shift = Underscore (_).", qmk: "KC_MINS", code: "Minus" },

      { p: "Y", s: "", t: "key-alpha", title: "Letra Y", desc: "No Vim: y faz cópia (yank).", qmk: "KC_Y", code: "KeyY" },
      { p: "U", s: "", t: "key-alpha", title: "Letra U", desc: "No Vim: u faz desfazer (undo).", qmk: "KC_U", code: "KeyU" },
      { p: "I", s: "", t: "key-alpha", title: "Letra I", desc: "No Vim: i entra no modo insert.", qmk: "KC_I", code: "KeyI" },
      { p: "O", s: "", t: "key-alpha", title: "Letra O", desc: "No Vim: o insere nova linha abaixo.", qmk: "KC_O", code: "KeyO" },
      { p: "P", s: "", t: "key-alpha", title: "Letra P", desc: "No Vim: p cola texto (paste).", qmk: "KC_P", code: "KeyP" },
      { p: "⌫", s: "Bksp", t: "key-mod", title: "Backspace", desc: "Apagar tradicional para manter facilidade de adaptação do AULA F75.", qmk: "KC_BSPC", code: "Backspace" },

      { p: "H", s: "←", t: "key-alpha", title: "Letra H", desc: "No Vim / DWM: h move para a esquerda e reduz o painel master.", qmk: "KC_H", code: "KeyH" },
      { p: "J", s: "↓", t: "key-alpha", title: "Letra J", desc: "No Vim / DWM: j move para baixo e alterna para a próxima janela no DWM!", qmk: "KC_J", code: "KeyJ" },
      { p: "K", s: "↑", t: "key-alpha", title: "Letra K", desc: "No Vim / DWM: k move para cima e alterna para a janela anterior no DWM!", qmk: "KC_K", code: "KeyK" },
      { p: "L", s: "→", t: "key-alpha", title: "Letra L", desc: "No Vim / DWM: l move para a direita e aumenta o painel master.", qmk: "KC_L", code: "KeyL" },
      { p: "; / :", s: "KC_SCLN", t: "key-alpha", title: "Ponto e Vírgula / Dois Pontos", desc: "No Vim: : inicia comandos ex (:w, :q).", qmk: "KC_SCLN", code: "Semicolon" },
      { p: "' / \"", s: "ç / á", t: "key-accent", title: "Aspas e Acentos (' e \")", desc: "✨ Tecla Sagrada do Português US-Intl: Pressione ' e depois C para obter 'ç'! ' + a = á, ' + e = é, ' + o = ó.", qmk: "KC_QUOT", code: "Quote" },

      { p: "N", s: "", t: "key-alpha", title: "Letra N", desc: "No Vim: n repete busca para frente.", qmk: "KC_N", code: "KeyN" },
      { p: "M", s: "", t: "key-alpha", title: "Letra M", desc: "No DWM: Super+M layout monocle (tela cheia).", qmk: "KC_M", code: "KeyM" },
      { p: ", / <", s: "KC_COMM", t: "key-alpha", title: "Vírgula e Menor que", desc: "Vírgula. No DWM: Super+vírgula muda de monitor.", qmk: "KC_COMM", code: "Comma" },
      { p: ". / >", s: "KC_DOT", t: "key-alpha", title: "Ponto e Maior que", desc: "Ponto. No DWM: Super+ponto muda de monitor.", qmk: "KC_DOT", code: "Period" },
      { p: "/ / ?", s: "KC_SLSH", t: "key-alpha", title: "Barra e Interrogação", desc: "No Vim: / inicia busca de texto.", qmk: "KC_SLSH", code: "Slash" },
      { p: "Shift", s: "", t: "key-mod", title: "Shift Direito", desc: "Modificador Shift.", qmk: "KC_RSFT", code: "ShiftRight" }
    ],
    thumbsRight: [
      { p: "Enter", s: "DWM", t: "key-mod", title: "Enter no Polegar", desc: "Enter ergonômico no polegar direito! No DWM: Super + Enter abre o terminal st instantaneamente.", qmk: "KC_ENT", code: "Enter" },
      { p: "MO(2)", s: "👉 SYM", t: "key-layer", title: "Ativador de Símbolos (Layer 2)", desc: "⚡ CLIQUE OU SEGURE para ver e ativar a Layer 2 (Parênteses, chaves, colchetes e operadores de código)!", qmk: "MO(2)", targetLayer: 2 },
      { p: "AltGr", s: "US-Intl", t: "key-accent", title: "AltGr (Right Alt)", desc: "AltGr do padrão US-Intl: AltGr + , = ç, AltGr + / = °, AltGr + S = §.", qmk: "KC_RALT", code: "AltRight" }
    ]
  },

  1: {
    id: 1,
    title: "Layer 1: NAV & DWM & MULTIMÍDIA",
    badgeText: "Layer 1: NAV (Vim HJKL + Mídia Ativa)",
    badgeClass: "layer-badge-1",
    desc: "Mão direita operando navegação Vim pura com setas reais, Home, End, PgUp, PgDn. Mão esquerda controla volume e brilho.",
    keysLeft: [
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla da camada inferior.", qmk: "KC_TRNS" },
      { p: "⏮", s: "Prev", t: "key-media", title: "Faixa Anterior", desc: "Controle multimídia: música anterior.", qmk: "KC_MPRV" },
      { p: "⏭", s: "Next", t: "key-media", title: "Próxima Faixa", desc: "Controle multimídia: próxima música.", qmk: "KC_MNXT" },
      { p: "⏯", s: "Play", t: "key-media", title: "Play / Pause", desc: "Tocar / Pausar reprodução de áudio/vídeo.", qmk: "KC_MPLY" },
      { p: "🔉", s: "Vol -", t: "key-media", title: "Diminuir Volume", desc: "Volume Down (dispara pactl no dwmblocks).", qmk: "KC_VOLD" },
      { p: "🔊", s: "Vol +", t: "key-media", title: "Aumentar Volume", desc: "Volume Up (dispara pactl no dwmblocks).", qmk: "KC_VOLU" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "🔇", s: "Mute", t: "key-media", title: "Mudo (Mute)", desc: "Silenciar saída de áudio.", qmk: "KC_MUTE" },
      { p: "☀️+", s: "Bri +", t: "key-media", title: "Aumentar Brilho", desc: "Aumenta brilho da tela (xbacklight no DWM).", qmk: "KC_BRIU" },
      { p: "📸", s: "PrtSc", t: "key-media", title: "PrintScreen", desc: "Captura de tela instantânea.", qmk: "KC_PSCR" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "🔅-", s: "Bri -", t: "key-media", title: "Diminuir Brilho", desc: "Diminui brilho da tela.", qmk: "KC_BRID" },
      { p: "Alt", s: "", t: "key-mod", title: "Alt", desc: "Modificador Alt para combinar com navegação.", qmk: "KC_LALT" },
      { p: "Shift", s: "", t: "key-mod", title: "Shift", desc: "Shift para combinar com setas e selecionar texto.", qmk: "KC_LSFT" },
      { p: "Ctrl", s: "", t: "key-mod", title: "Ctrl", desc: "Ctrl para pular palavras com as setas.", qmk: "KC_LCTL" },
      { p: "Super", s: "", t: "key-mod", title: "Super / Win", desc: "Super para atalhos do DWM.", qmk: "KC_LGUI" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" }
    ],
    thumbsLeft: [
      { p: "▼", s: "Super", t: "key-trans", title: "Super (Transparente)", desc: "Mantém Super ativo.", qmk: "KC_TRNS" },
      { p: "MO(0)", s: "Voltar", t: "key-layer", title: "Camada 1 Ativa (Clique para Voltar)", desc: "⚡ Clique aqui para voltar à Layer 0!", qmk: "MO(0)", targetLayer: 0 },
      { p: "MO(3)", s: "👉 Num", t: "key-fn", title: "Ativador Layer 3", desc: "Segure ambos os polegares para Layer 3 (Numpad).", qmk: "MO(3)", targetLayer: 3 }
    ],
    keysRight: [
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "Home", s: "U", t: "key-nav", title: "Home (Início de Linha)", desc: "Equivalente a '^' ou '0' no Vim.", qmk: "KC_HOME" },
      { p: "PgUp", s: "I", t: "key-nav", title: "Page Up", desc: "Rolar tela para cima.", qmk: "KC_PGUP" },
      { p: "PgDn", s: "O", t: "key-nav", title: "Page Down", desc: "Rolar tela para baixo.", qmk: "KC_PGDN" },
      { p: "End", s: "P", t: "key-nav", title: "End (Fim de Linha)", desc: "Equivalente a '$' no Vim.", qmk: "KC_END" },
      { p: "Del", s: "⌦", t: "key-nav", title: "Delete", desc: "Apagar caractere à direita.", qmk: "KC_DEL" },

      { p: "←", s: "H", t: "key-nav", title: "Seta Esquerda (H)", desc: "Navegação Vim com setas reais!", qmk: "KC_LEFT" },
      { p: "↓", s: "J", t: "key-nav", title: "Seta Baixo (J)", desc: "Navegação Vim com setas reais!", qmk: "KC_DOWN" },
      { p: "↑", s: "K", t: "key-nav", title: "Seta Cima (K)", desc: "Navegação Vim com setas reais!", qmk: "KC_UP" },
      { p: "→", s: "L", t: "key-nav", title: "Seta Direita (L)", desc: "Navegação Vim com setas reais!", qmk: "KC_RGHT" },
      { p: "Ins", s: ";", t: "key-nav", title: "Insert", desc: "Inserir.", qmk: "KC_INS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "⌫", s: "N", t: "key-nav", title: "Backspace no Indicador", desc: "Backspace sob o dedo indicador direito.", qmk: "KC_BSPC" },
      { p: "⌦", s: "M", t: "key-nav", title: "Delete no Médio", desc: "Delete sob o dedo médio direito.", qmk: "KC_DEL" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" }
    ],
    thumbsRight: [
      { p: "Enter", s: "", t: "key-mod", title: "Enter", desc: "Enter padrão.", qmk: "KC_ENT" },
      { p: "MO(3)", s: "👉 Num", t: "key-fn", title: "Ativador Layer 3", desc: "Segure ambos os polegares para Layer 3.", qmk: "MO(3)", targetLayer: 3 },
      { p: "▼", s: "AltGr", t: "key-trans", title: "AltGr (Transparente)", desc: "Mantém AltGr ativo.", qmk: "KC_TRNS" }
    ]
  },

  2: {
    id: 2,
    title: "Layer 2: SYM - SÍMBOLOS DE DEV",
    badgeText: "Layer 2: SYM (Símbolos de Código Ativos)",
    badgeClass: "layer-badge-2",
    desc: "Pares de delimitadores lado a lado () {} [] <> e operadores matemáticos/atribuição na Home Row.",
    keysLeft: [
      { p: "~", s: "Tilde", t: "key-sym", title: "Til (~)", desc: "Símbolo til.", qmk: "KC_TILD" },
      { p: "!", s: "Excl", t: "key-sym", title: "Exclamação (!)", desc: "Operador de negação (ex: !isValid).", qmk: "KC_EXLM" },
      { p: "@", s: "At", t: "key-sym", title: "Arroba (@)", desc: "Decorators em TypeScript, Python, etc.", qmk: "KC_AT" },
      { p: "#", s: "Hash", t: "key-sym", title: "Hash (#)", desc: "Comentários, IDs e pré-processador.", qmk: "KC_HASH" },
      { p: "$", s: "Dollar", t: "key-sym", title: "Cifrão ($)", desc: "Template strings `${}` e variáveis.", qmk: "KC_DLR" },
      { p: "%", s: "Perc", t: "key-sym", title: "Porcentagem (%)", desc: "Operador módulo.", qmk: "KC_PERC" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "(", s: "L-Paren", t: "key-sym", title: "Abre Parêntese ( )", desc: "✨ Lado a lado: Dedo indicador/médio abre parêntese!", qmk: "KC_LPRN" },
      { p: ")", s: "R-Paren", t: "key-sym", title: "Fecha Parêntese ( )", desc: "✨ Lado a lado: Dedo adjacente fecha parêntese!", qmk: "KC_RPRN" },
      { p: "{", s: "L-Brace", t: "key-sym", title: "Abre Chaves { }", desc: "✨ Lado a lado: Abre chaves de blocos e objetos!", qmk: "KC_LCBR" },
      { p: "}", s: "R-Brace", t: "key-sym", title: "Fecha Chaves { }", desc: "✨ Lado a lado: Fecha chaves de blocos e objetos!", qmk: "KC_RCBR" },
      { p: "|", s: "Pipe", t: "key-sym", title: "Pipe (|)", desc: "Operador OU lógico e bitwise.", qmk: "KC_PIPE" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "&", s: "Ampr", t: "key-sym", title: "E comercial (&)", desc: "Operador E lógico (&&).", qmk: "KC_AMPR" },
      { p: "*", s: "Astr", t: "key-sym", title: "Asterisco (*)", desc: "Multiplicação, ponteiros, glob.", qmk: "KC_ASTR" },
      { p: "-", s: "Minus", t: "key-sym", title: "Menos (-)", desc: "Subtração e traço.", qmk: "KC_MINS" },
      { p: "+", s: "Plus", t: "key-sym", title: "Mais (+)", desc: "Adição e concatenação.", qmk: "KC_PLUS" },
      { p: "=", s: "Equal", t: "key-sym", title: "Igual (=)", desc: "Atribuição e comparação (===).", qmk: "KC_EQL" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "[", s: "L-Brack", t: "key-sym", title: "Abre Colchetes [ ]", desc: "✨ Lado a lado: Abre colchetes de array!", qmk: "KC_LBRC" },
      { p: "]", s: "R-Brack", t: "key-sym", title: "Fecha Colchetes [ ]", desc: "✨ Lado a lado: Fecha colchetes de array!", qmk: "KC_RBRC" },
      { p: "<", s: "LT", t: "key-sym", title: "Menor que / Tag (<)", desc: "✨ Lado a lado: Abre tags HTML/JSX!", qmk: "KC_LT" },
      { p: ">", s: "GT", t: "key-sym", title: "Maior que / Tag (>)", desc: "✨ Lado a lado: Fecha tags HTML/JSX!", qmk: "KC_GT" },
      { p: "\\", s: "B-Slash", t: "key-sym", title: "Barra Invertida (\\)", desc: "Escape e paths.", qmk: "KC_BSLS" }
    ],
    thumbsLeft: [
      { p: "Super", s: "", t: "key-mod", title: "Super", desc: "Super mantido.", qmk: "KC_LGUI" },
      { p: "MO(3)", s: "👉 Num", t: "key-fn", title: "Ativador Layer 3", desc: "Segure ambos os polegares para Layer 3.", qmk: "MO(3)", targetLayer: 3 },
      { p: "Space", s: "", t: "key-alpha", title: "Espaço", desc: "Espaço.", qmk: "KC_SPC" }
    ],
    keysRight: [
      { p: "^", s: "Circ", t: "key-sym", title: "Circunflexo (^)", desc: "Acento e regex início de linha.", qmk: "KC_CIRC" },
      { p: "&", s: "", t: "key-sym", title: "E comercial (&)", desc: "E comercial.", qmk: "KC_AMPR" },
      { p: "*", s: "", t: "key-sym", title: "Asterisco (*)", desc: "Multiplicação.", qmk: "KC_ASTR" },
      { p: "(", s: "", t: "key-sym", title: "Parêntese (", desc: "Abre parêntese.", qmk: "KC_LPRN" },
      { p: ")", s: "", t: "key-sym", title: "Parêntese )", desc: "Fecha parêntese.", qmk: "KC_RPRN" },
      { p: "+", s: "", t: "key-sym", title: "Mais (+)", desc: "Soma.", qmk: "KC_PLUS" },

      { p: "!", s: "", t: "key-sym", title: "Exclamação (!)", desc: "Negação.", qmk: "KC_EXLM" },
      { p: ":", s: "Coln", t: "key-sym", title: "Dois Pontos (:)", desc: "Tipagem TypeScript e objetos JSON.", qmk: "KC_COLN" },
      { p: "?", s: "Ques", t: "key-sym", title: "Interrogação (?)", desc: "Ternário e optional chaining (?.), nullish.", qmk: "KC_QUES" },
      { p: "\"", s: "DQuo", t: "key-sym", title: "Aspas Duplas (\")", desc: "Strings literais.", qmk: "KC_DQUO" },
      { p: "'", s: "Quot", t: "key-sym", title: "Aspas Simples (')", desc: "Strings literais.", qmk: "KC_QUOT" },
      { p: "⌫", s: "Bksp", t: "key-mod", title: "Backspace", desc: "Apagar.", qmk: "KC_BSPC" },

      { p: "=", s: "Eql", t: "key-sym", title: "Igual (=)", desc: "Atribuição na Home Row!", qmk: "KC_EQL" },
      { p: "+", s: "Plus", t: "key-sym", title: "Mais (+)", desc: "Soma na Home Row!", qmk: "KC_PLUS" },
      { p: "-", s: "Minus", t: "key-sym", title: "Menos (-)", desc: "Subtração na Home Row!", qmk: "KC_MINS" },
      { p: "*", s: "Astr", t: "key-sym", title: "Asterisco (*)", desc: "Multiplicação na Home Row!", qmk: "KC_ASTR" },
      { p: "/", s: "Slash", t: "key-sym", title: "Barra (/)", desc: "Divisão e comentários // na Home Row!", qmk: "KC_SLSH" },
      { p: ":", s: "Coln", t: "key-sym", title: "Dois Pontos (:)", desc: "Dois pontos.", qmk: "KC_COLN" },

      { p: "_", s: "Unds", t: "key-sym", title: "Underscore (_)", desc: "snake_case e variáveis privadas.", qmk: "KC_UNDS" },
      { p: "%", s: "", t: "key-sym", title: "Porcentagem (%)", desc: "Módulo.", qmk: "KC_PERC" },
      { p: ";", s: "", t: "key-sym", title: "Ponto e vírgula (;)", desc: "Terminador de linha.", qmk: "KC_SCLN" },
      { p: ".", s: "", t: "key-sym", title: "Ponto (.)", desc: "Acesso a propriedades de objetos.", qmk: "KC_DOT" },
      { p: "/", s: "", t: "key-sym", title: "Barra (/)", desc: "Barra de diretórios.", qmk: "KC_SLSH" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" }
    ],
    thumbsRight: [
      { p: "Enter", s: "", t: "key-mod", title: "Enter", desc: "Enter.", qmk: "KC_ENT" },
      { p: "MO(0)", s: "Voltar", t: "key-layer", title: "Camada 2 Ativa (Clique para Voltar)", desc: "⚡ Clique aqui para voltar à Layer 0!", qmk: "MO(0)", targetLayer: 0 },
      { p: "AltGr", s: "", t: "key-accent", title: "AltGr", desc: "AltGr.", qmk: "KC_RALT" }
    ]
  },

  3: {
    id: 3,
    title: "Layer 3: NUMPAD & FN & BOOTLOADER",
    badgeText: "Layer 3: NUMPAD & FN (Ativa)",
    badgeClass: "layer-badge-3",
    desc: "Teclado numérico 10-key à direita, teclas de função F1-F12 à esquerda e atalho para o modo Bootloader.",
    keysLeft: [
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "F1", s: "", t: "key-fn", title: "F1", desc: "Ajuda / Tecla de função.", qmk: "KC_F1" },
      { p: "F2", s: "", t: "key-fn", title: "F2", desc: "Renomear (VSCode/Ficheiros).", qmk: "KC_F2" },
      { p: "F3", s: "", t: "key-fn", title: "F3", desc: "Buscar próximo.", qmk: "KC_F3" },
      { p: "F4", s: "", t: "key-fn", title: "F4", desc: "Tecla de função.", qmk: "KC_F4" },
      { p: "F5", s: "", t: "key-fn", title: "F5", desc: "Iniciar Debugging (VSCode) / Refresh.", qmk: "KC_F5" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "F6", s: "", t: "key-fn", title: "F6", desc: "Tecla de função.", qmk: "KC_F6" },
      { p: "F7", s: "", t: "key-fn", title: "F7", desc: "Tecla de função.", qmk: "KC_F7" },
      { p: "F8", s: "", t: "key-fn", title: "F8", desc: "Breakpoint no VSCode.", qmk: "KC_F8" },
      { p: "F9", s: "", t: "key-fn", title: "F9", desc: "Toggle Breakpoint.", qmk: "KC_F9" },
      { p: "F10", s: "", t: "key-fn", title: "F10", desc: "Step Over (VSCode Debug).", qmk: "KC_F10" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "F11", s: "", t: "key-fn", title: "F11", desc: "Step Into (VSCode Debug) / Fullscreen.", qmk: "KC_F11" },
      { p: "F12", s: "", t: "key-fn", title: "F12", desc: "Go to Definition (VSCode DevTools).", qmk: "KC_F12" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "⚡ BOOT", s: "Flash", t: "key-boot", title: "Modo Bootloader (QK_BOOT)", desc: "Coloca o microcontrolador RP2040 em modo gravação/pendrive sem precisar abrir a case física!", qmk: "QK_BOOT" }
    ],
    thumbsLeft: [
      { p: "MO(0)", s: "Voltar", t: "key-layer", title: "Voltar à Layer 0", desc: "⚡ Clique aqui para voltar à Layer 0!", qmk: "MO(0)", targetLayer: 0 },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" }
    ],
    keysRight: [
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "7", s: "", t: "key-fn", title: "Numpad 7", desc: "Teclado numérico 7.", qmk: "KC_P7" },
      { p: "8", s: "", t: "key-fn", title: "Numpad 8", desc: "Teclado numérico 8.", qmk: "KC_P8" },
      { p: "9", s: "", t: "key-fn", title: "Numpad 9", desc: "Teclado numérico 9.", qmk: "KC_P9" },
      { p: "*", s: "", t: "key-fn", title: "Numpad Asterisco (*)", desc: "Multiplicação.", qmk: "KC_PAST" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "4", s: "", t: "key-fn", title: "Numpad 4", desc: "Teclado numérico 4.", qmk: "KC_P4" },
      { p: "5", s: "", t: "key-fn", title: "Numpad 5", desc: "Teclado numérico 5.", qmk: "KC_P5" },
      { p: "6", s: "", t: "key-fn", title: "Numpad 6", desc: "Teclado numérico 6.", qmk: "KC_P6" },
      { p: "+", s: "", t: "key-fn", title: "Numpad Mais (+)", desc: "Adição.", qmk: "KC_PPLS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },

      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "1", s: "", t: "key-fn", title: "Numpad 1", desc: "Teclado numérico 1.", qmk: "KC_P1" },
      { p: "2", s: "", t: "key-fn", title: "Numpad 2", desc: "Teclado numérico 2.", qmk: "KC_P2" },
      { p: "3", s: "", t: "key-fn", title: "Numpad 3", desc: "Teclado numérico 3.", qmk: "KC_P3" },
      { p: "-", s: "", t: "key-fn", title: "Numpad Menos (-)", desc: "Subtração.", qmk: "KC_PMNS" },
      { p: "NumEnt", s: "", t: "key-mod", title: "Numpad Enter", desc: "Enter do teclado numérico.", qmk: "KC_PENT" },

      { p: "0", s: "", t: "key-fn", title: "Numpad 0", desc: "Zero.", qmk: "KC_P0" },
      { p: "0", s: "", t: "key-fn", title: "Numpad 0", desc: "Zero.", qmk: "KC_P0" },
      { p: ".", s: "", t: "key-fn", title: "Numpad Ponto (.)", desc: "Ponto decimal.", qmk: "KC_PDOT" },
      { p: "/", s: "", t: "key-fn", title: "Numpad Barra (/)", desc: "Divisão.", qmk: "KC_PSLS" },
      { p: "=", s: "", t: "key-fn", title: "Numpad Igual (=)", desc: "Igual.", qmk: "KC_PEQL" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" }
    ],
    thumbsRight: [
      { p: "NumEnt", s: "", t: "key-mod", title: "Numpad Enter", desc: "Enter numérico.", qmk: "KC_PENT" },
      { p: "MO(0)", s: "Voltar", t: "key-layer", title: "Voltar à Layer 0", desc: "⚡ Clique aqui para voltar à Layer 0!", qmk: "MO(0)", targetLayer: 0 },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" }
    ]
  }
};

let currentLayer = 0;
let previousLayer = 0;
let isHoldingLayer = false;

// Matriz física Silakka54 (24 teclas principais + 3 polegares por metade)
const LEFT_PHYSICAL_CODES = [
  "Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5",
  "Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT",
  "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG",
  "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB"
];
const LEFT_THUMB_PHYSICAL_CODES = ["MetaLeft", "Layer1", "Space"];

const RIGHT_PHYSICAL_CODES = [
  "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus",
  "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "Backspace",
  "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote",
  "KeyN", "KeyM", "Comma", "Period", "Slash", "ShiftRight"
];
const RIGHT_THUMB_PHYSICAL_CODES = ["Enter", "Layer2", "AltRight"];

function renderKey(keyData, physicalCode) {
  const btn = document.createElement("div");
  btn.className = `key-cap ${keyData.t} morphing`;
  btn.dataset.qmk = keyData.qmk || "";

  const codeToSet = keyData.code || physicalCode || "";
  if (codeToSet) btn.dataset.code = codeToSet;
  if (keyData.p) btn.dataset.primary = keyData.p;

  // Se for tecla disparadora de camada
  if (keyData.targetLayer !== undefined) {
    btn.classList.add("key-layer-interactive");
  }

  btn.innerHTML = `
    <span class="key-primary">${keyData.p}</span>
    ${keyData.s ? `<span class="key-sub">${keyData.s}</span>` : ""}
  `;

  // Clique normal: Mostra detalhe E se for tecla de camada, muda de camada!
  btn.addEventListener("click", (e) => {
    showKeyDetail(keyData, btn);

    if (keyData.targetLayer !== undefined) {
      e.stopPropagation();
      switchLayer(keyData.targetLayer);
    }
  });

  // Pressionar e Segurar (Simulação do comportamento físico Momentary MO)
  if (keyData.targetLayer !== undefined && keyData.targetLayer !== 0) {
    const startHold = (e) => {
      e.preventDefault();
      isHoldingLayer = true;
      previousLayer = currentLayer;
      switchLayer(keyData.targetLayer);
    };

    const endHold = () => {
      if (isHoldingLayer) {
        isHoldingLayer = false;
        switchLayer(previousLayer);
      }
    };

    btn.addEventListener("mousedown", startHold);
    btn.addEventListener("touchstart", startHold, { passive: false });
    window.addEventListener("mouseup", endHold);
    window.addEventListener("touchend", endHold);
  }

  btn.addEventListener("mouseenter", () => showKeyDetail(keyData, btn));
  return btn;
}

function showKeyDetail(keyData, element) {
  document.querySelectorAll(".key-cap.selected").forEach(el => el.classList.remove("selected"));
  if (element) element.classList.add("selected");

  const card = document.getElementById("key-detail-target");
  if (!card) return;

  const isTrigger = keyData.targetLayer !== undefined;
  const triggerHint = isTrigger ? `<span class="key-detail-tag" style="background: rgba(242,163,60,0.2); color: var(--accent); border-color: var(--accent);">⚡ Clique para alternar para a Layer ${keyData.targetLayer}</span>` : "";

  card.innerHTML = `
    <div class="key-detail-title">
      <span>${keyData.title || keyData.p}</span>
      <span class="key-detail-badge">${keyData.qmk || ""}</span>
    </div>
    <div class="key-detail-body">${keyData.desc || "Tecla sem descrição específica."}</div>
    <div class="key-detail-tags">
      <span class="key-detail-tag">Camada: ${currentLayer}</span>
      <span class="key-detail-tag">Tipo: ${keyData.t.replace("key-", "")}</span>
      ${keyData.s ? `<span class="key-detail-tag">Sub: ${keyData.s}</span>` : ""}
      ${triggerHint}
    </div>
  `;
}

function switchLayer(layerId) {
  currentLayer = layerId;
  const layer = LAYERS_DATA[layerId];
  if (!layer) return;

  // Atualizar botões superiores
  document.querySelectorAll(".layer-btn").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.layer, 10) === layerId);
  });

  // Atualizar Banner Ativo
  const bannerPill = document.getElementById("layer-badge-pill");
  if (bannerPill) {
    bannerPill.className = `layer-badge-pill ${layer.badgeClass}`;
    bannerPill.innerHTML = `<span class="pulse-dot"></span> <span>${layer.badgeText}</span>`;
  }

  // Atualizar descrição
  const descEl = document.getElementById("layer-desc-target");
  if (descEl) {
    descEl.textContent = layer.desc;
    const borderColors = ["#58a6ff", "#7ee787", "#d2a8ff", "#f0883e"];
    descEl.style.borderLeftColor = borderColors[layerId] || "var(--accent)";
  }

  // Renderizar lado esquerdo com mapeamento de posição física
  const leftGrid = document.getElementById("grid-left-main");
  const leftThumbs = document.getElementById("thumbs-left");
  if (leftGrid && leftThumbs) {
    leftGrid.innerHTML = "";
    leftThumbs.innerHTML = "";
    layer.keysLeft.forEach((k, idx) => leftGrid.appendChild(renderKey(k, LEFT_PHYSICAL_CODES[idx])));
    layer.thumbsLeft.forEach((k, idx) => leftThumbs.appendChild(renderKey(k, LEFT_THUMB_PHYSICAL_CODES[idx])));
  }

  // Renderizar lado direito com mapeamento de posição física
  const rightGrid = document.getElementById("grid-right-main");
  const rightThumbs = document.getElementById("thumbs-right");
  if (rightGrid && rightThumbs) {
    rightGrid.innerHTML = "";
    rightThumbs.innerHTML = "";
    layer.keysRight.forEach((k, idx) => rightGrid.appendChild(renderKey(k, RIGHT_PHYSICAL_CODES[idx])));
    layer.thumbsRight.forEach((k, idx) => rightThumbs.appendChild(renderKey(k, RIGHT_THUMB_PHYSICAL_CODES[idx])));
  }

  // Remove classe de animação após o término para permitir novas animações
  setTimeout(() => {
    document.querySelectorAll(".key-cap.morphing").forEach(k => k.classList.remove("morphing"));
  }, 400);

  // Selecionar tecla de exemplo relevante
  const keyToHighlight = layer.thumbsLeft[1] || layer.keysLeft[0];
  if (keyToHighlight) showKeyDetail(keyToHighlight, leftThumbs ? leftThumbs.children[1] : null);

  // Atualizar dica da próxima tecla caso esteja em modo de treino
  updateTargetKeyHint();
}

// ==========================================================================
// SOM MECÂNICO DE SWITCH (WEB AUDIO API - ZERO LATÊNCIA)
// ==========================================================================
let audioCtx = null;
let soundEnabled = true;

function playSwitchSound() {
  if (!soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.035);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.035);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  } catch (err) {}
}

// ==========================================================================
// ARENA DE DIGITAÇÃO INTERATIVA EM TEMPO REAL
// ==========================================================================
const PRACTICE_PROMPTS = {
  free: "",
  pt: "não é difícil programar no teclado split com acentuação e cedilha",
  dev: "const [count, setCount] = useState(0); return <Button>{count}</Button>;",
  vim: ":w | :q | h j k l | Super+Enter para terminal | Super+d para dmenu"
};

let currentMode = "free";
let typedText = "";
let totalKeysPressed = 0;
let typingStartTime = null;

// Mapa de aliases físicos para atalhos de camada enviados pelo QMK/Vial:
const ALIAS_CODE_MAP = {
  "ArrowLeft": "KeyH",
  "ArrowDown": "KeyJ",
  "ArrowUp": "KeyK",
  "ArrowRight": "KeyL",
  "Home": "KeyU",
  "End": "KeyP",
  "PageUp": "KeyI",
  "PageDown": "KeyO",
  "Delete": "KeyM",
  "Escape": "CapsLock"
};

function findKeyElement(e) {
  const code = e.code;
  const key = e.key;

  // 1. Match direto pelo data-code
  let el = document.querySelector(`.key-cap[data-code="${code}"]`);
  if (el) return el;

  // 2. Alias de navegação Vim quando a Silakka54 envia setas na Layer 1
  const aliasCode = ALIAS_CODE_MAP[code] || ALIAS_CODE_MAP[key];
  if (aliasCode) {
    el = document.querySelector(`.key-cap[data-code="${aliasCode}"]`);
    if (el) return el;
  }

  // 3. Fallback por caractere primário
  if (key && key.length === 1) {
    const clean = key.toLowerCase();
    el = Array.from(document.querySelectorAll(".key-cap")).find(k => {
      const p = (k.dataset.primary || k.querySelector(".key-primary")?.textContent || "").toLowerCase();
      return p === clean || p.startsWith(clean);
    });
  }

  return el;
}

function updateTargetKeyHint() {
  document.querySelectorAll(".key-cap.target-key-hint").forEach(el => el.classList.remove("target-key-hint"));
  if (currentMode === "free") return;

  const prompt = PRACTICE_PROMPTS[currentMode] || "";
  if (typedText.length >= prompt.length) return;

  const nextChar = prompt[typedText.length];
  const lowerChar = nextChar.toLowerCase();

  const keyEl = Array.from(document.querySelectorAll(".key-cap")).find(k => {
    const p = (k.dataset.primary || k.querySelector(".key-primary")?.textContent || "").toLowerCase();
    return p === lowerChar || p.startsWith(lowerChar);
  });

  if (keyEl) {
    keyEl.classList.add("target-key-hint");
  }
}

function renderTypingDisplay() {
  const prompt = PRACTICE_PROMPTS[currentMode] || "";
  const targetEl = document.getElementById("typing-target-text");
  const typedEl = document.getElementById("typed-content");
  const hintEl = document.getElementById("typing-placeholder-hint");

  if (currentMode === "free") {
    if (targetEl) targetEl.style.display = "none";
    if (typedEl) typedEl.textContent = typedText;
    if (hintEl) hintEl.style.display = typedText.length > 0 ? "none" : "block";
  } else {
    if (targetEl) {
      targetEl.style.display = "block";
      const before = prompt.slice(0, typedText.length);
      const current = prompt.slice(typedText.length, typedText.length + 1);
      const after = prompt.slice(typedText.length + 1);
      targetEl.innerHTML = `<span style="color: #58a6ff;">${before}</span><span class="typing-target-char-next">${current || ""}</span><span>${after}</span>`;
    }
    if (typedEl) typedEl.textContent = typedText;
    if (hintEl) hintEl.style.display = "none";
  }

  updateTargetKeyHint();
}

function updateHUD(e, keyEl) {
  const lastKeyEl = document.getElementById("hud-last-key");
  const rawCodeEl = document.getElementById("hud-raw-code");
  const layerEl = document.getElementById("hud-layer-detected");
  const accentInfoEl = document.getElementById("hud-accent-info");
  const accentTextEl = document.getElementById("hud-accent-text");
  const statCountEl = document.getElementById("stat-key-count");
  const statWpmEl = document.getElementById("stat-wpm");

  let displayKey = e.key;
  if (e.code === "Space") displayKey = "Space ␣";
  else if (e.code === "Enter") displayKey = "Enter ↵";
  else if (e.code === "Backspace") displayKey = "Backspace ⌫";
  else if (e.code === "CapsLock") displayKey = "CapsLock / Esc";

  if (lastKeyEl) lastKeyEl.textContent = displayKey;
  if (rawCodeEl) rawCodeEl.textContent = e.code;

  // Detectar camada pela ação
  let detected = `Layer ${currentLayer}`;
  if (["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(e.code) || ["ArrowLeft", "ArrowDown", "ArrowUp", "ArrowRight"].includes(e.key)) {
    detected = "Layer 1: Vim NAV (HJKL)";
  } else if (["(", ")", "{", "}", "[", "]", "<", ">", "=", "+"].includes(e.key)) {
    detected = "Layer 2: SYM (Dev)";
  }
  if (layerEl) layerEl.textContent = detected;

  // Acentuação Português
  if (accentInfoEl && accentTextEl) {
    const ptAccents = {
      "ç": "' + c = ç (Cedilha)",
      "ã": "~ + a = ã (Til)",
      "õ": "~ + o = õ (Til)",
      "á": "' + a = á (Agudo)",
      "é": "' + e = é (Agudo)",
      "í": "' + i = í (Agudo)",
      "ó": "' + o = ó (Agudo)",
      "ú": "' + u = ú (Agudo)",
      "à": "` + a = à (Crase)",
      "ê": "^ + e = ê (Circunflexo)",
      "ô": "^ + o = ô (Circunflexo)",
      "â": "^ + a = â (Circunflexo)"
    };

    if (ptAccents[e.key]) {
      accentTextEl.textContent = ptAccents[e.key];
      accentInfoEl.style.display = "inline-flex";
    } else if (e.key === "'" || e.key === "~" || e.key === "`" || e.key === "^" || e.key === "Dead") {
      accentTextEl.textContent = "Dead key aguardando próxima letra...";
      accentInfoEl.style.display = "inline-flex";
    } else {
      accentInfoEl.style.display = "none";
    }
  }

  // Estatísticas
  totalKeysPressed++;
  if (statCountEl) statCountEl.textContent = totalKeysPressed;

  if (!typingStartTime) typingStartTime = Date.now();
  const elapsedMinutes = (Date.now() - typingStartTime) / 60000;
  if (elapsedMinutes > 0.05 && statWpmEl) {
    const wordsTyped = totalKeysPressed / 5;
    const wpm = Math.round(wordsTyped / elapsedMinutes);
    statWpmEl.textContent = Math.min(wpm, 250);
  }
}

function handleGlobalKeydown(e) {
  // Ignorar se o foco estiver em algum input diferente do container da página
  if (e.target.tagName === "INPUT" && e.target.id !== "live-keyboard-input") return;

  // Atalho rápido Alt + 0..3 para troca de camada
  if (e.altKey && ["0", "1", "2", "3"].includes(e.key)) {
    e.preventDefault();
    switchLayer(parseInt(e.key, 10));
    return;
  }

  // Tocar som mecânico de switch
  playSwitchSound();

  // Localizar elemento visual da tecla e acender
  const keyEl = findKeyElement(e);
  if (keyEl) {
    keyEl.classList.add("pressed-live");
    const rawQmk = keyEl.dataset.qmk;
    showKeyDetail({
      p: keyEl.querySelector(".key-primary")?.textContent || e.key,
      s: keyEl.querySelector(".key-sub")?.textContent || "",
      t: keyEl.className.includes("key-accent") ? "key-accent" : (keyEl.className.includes("key-mod") ? "key-mod" : "key-alpha"),
      title: `Tecla física: ${e.code}`,
      desc: `Pressionada em tempo real no seu teclado físico! QMK: ${rawQmk || "Direta"}`,
      qmk: rawQmk
    }, keyEl);
  }

  // Atualizar HUD
  updateHUD(e, keyEl);

  // Atualizar texto digitado na Arena
  if (e.key === "Backspace") {
    typedText = typedText.slice(0, -1);
    renderTypingDisplay();
  } else if (e.key === "Enter") {
    typedText += "\n";
    renderTypingDisplay();
  } else if (e.key === "Tab") {
    e.preventDefault();
    typedText += "  ";
    renderTypingDisplay();
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    typedText += e.key;
    renderTypingDisplay();
  }
}

function handleGlobalKeyup(e) {
  const keyEl = findKeyElement(e);
  if (keyEl) {
    keyEl.classList.remove("pressed-live");
  } else {
    document.querySelectorAll(".key-cap.pressed-live").forEach(k => k.classList.remove("pressed-live"));
  }
}

function setupTypingArena() {
  // Event listeners globais de teclado (funciona ao teclar em qualquer lugar!)
  window.addEventListener("keydown", handleGlobalKeydown);
  window.addEventListener("keyup", handleGlobalKeyup);

  // Alternador de som
  const soundBtn = document.getElementById("btn-toggle-sound");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundBtn.classList.toggle("active", soundEnabled);
      soundBtn.textContent = soundEnabled ? "🔊 Switch: ON" : "🔈 Switch: OFF";
    });
  }

  // Botão de limpar
  const clearBtn = document.getElementById("btn-clear-typing");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      typedText = "";
      totalKeysPressed = 0;
      typingStartTime = null;
      document.getElementById("stat-key-count").textContent = "0";
      document.getElementById("stat-wpm").textContent = "0";
      document.getElementById("hud-last-key").textContent = "—";
      document.getElementById("hud-raw-code").textContent = "—";
      renderTypingDisplay();
    });
  }

  // Chips de modo de treino
  document.querySelectorAll(".mode-chip[data-mode]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".mode-chip[data-mode]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentMode = chip.dataset.mode;
      typedText = "";
      renderTypingDisplay();
    });
  });

  // Foco na arena ao clicar
  const arenaBox = document.getElementById("typing-display-box");
  if (arenaBox) {
    arenaBox.addEventListener("click", () => arenaBox.focus());
  }

  renderTypingDisplay();
}

// ==========================================================================
// INICIALIZAÇÃO GERAL
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".layer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchLayer(parseInt(btn.dataset.layer, 10));
    });
  });

  setupTypingArena();
  switchLayer(0);
});

