// ==========================================================================
// DADOS E COMPORTAMENTO DO CHEATMAP - SILAKKA54
// ==========================================================================

const LAYERS_DATA = {
  0: {
    id: 0,
    title: "Layer 0: BASE (QWERTY US-Intl)",
    desc: "Camada principal de digitação com compatibilidade total com Português (US-Intl), DWM e Vim.",
    keysLeft: [
      // Row 0
      { p: "` / ~", s: "KC_GRAVE", t: "key-accent", title: "Crase e Til (`~`)", desc: "Acesso imediato para acentos em Português: ~ + a = ã, ` + a = à.", qmk: "KC_GRAVE" },
      { p: "1", s: "Super+1", t: "key-alpha", title: "Número 1 / Tag 1", desc: "No DWM: Super+1 muda para Tag 1. Super+Shift+1 move a janela.", qmk: "KC_1" },
      { p: "2", s: "Super+2", t: "key-alpha", title: "Número 2 / Tag 2", desc: "No DWM: Super+2 muda para Tag 2.", qmk: "KC_2" },
      { p: "3", s: "Super+3", t: "key-alpha", title: "Número 3 / Tag 3", desc: "No DWM: Super+3 muda para Tag 3.", qmk: "KC_3" },
      { p: "4", s: "Super+4", t: "key-alpha", title: "Número 4 / Tag 4", desc: "No DWM: Super+4 muda para Tag 4.", qmk: "KC_4" },
      { p: "5", s: "", t: "key-alpha", title: "Número 5", desc: "Tecla numérica 5.", qmk: "KC_5" },
      // Row 1
      { p: "Tab", s: "", t: "key-mod", title: "Tab", desc: "Tabulação padrão. No DWM: Super+Tab alterna layout anterior.", qmk: "KC_TAB" },
      { p: "Q", s: "", t: "key-alpha", title: "Letra Q", desc: "No DWM: Super+Shift+Q fecha a janela atual (killclient).", qmk: "KC_Q" },
      { p: "W", s: "", t: "key-alpha", title: "Letra W", desc: "No Vim: w pula para a próxima palavra.", qmk: "KC_W" },
      { p: "E", s: "", t: "key-alpha", title: "Letra E", desc: "No Vim: e vai para o fim da palavra.", qmk: "KC_E" },
      { p: "R", s: "", t: "key-alpha", title: "Letra R", desc: "No DWM: Super+Shift+R reinicia o DWM.", qmk: "KC_R" },
      { p: "T", s: "", t: "key-alpha", title: "Letra T", desc: "No DWM: Super+T ativa o layout Tiling.", qmk: "KC_T" },
      // Row 2 (Home Row)
      { p: "Esc", s: "Ctrl", t: "key-mod", title: "CapsLock Dual-Role: Esc (Tap) / Ctrl (Hold)", desc: "✨ Chave Mestra para Vim & Terminal: Toque rápido = ESC (sair do modo insert no Vim). Segure = CTRL (atalhos como Ctrl+C, Ctrl+R, etc.).", qmk: "LCTL_T(KC_ESC)" },
      { p: "A", s: "", t: "key-alpha", title: "Letra A", desc: "No DWM: Super+A abre menu de áudio. Super+Shift+A menu bluetooth.", qmk: "KC_A" },
      { p: "S", s: "", t: "key-alpha", title: "Letra S", desc: "No Vim: s substitui caractere.", qmk: "KC_S" },
      { p: "D", s: "dmenu", t: "key-alpha", title: "Letra D", desc: "No DWM: Super+D abre o dmenu!", qmk: "KC_D" },
      { p: "F", s: "", t: "key-alpha", title: "Letra F", desc: "No DWM: Super+F layout monocle/floating.", qmk: "KC_F" },
      { p: "G", s: "", t: "key-alpha", title: "Letra G", desc: "No Vim: G vai para o fim do arquivo.", qmk: "KC_G" },
      // Row 3
      { p: "Shift", s: "", t: "key-mod", title: "Shift Esquerdo", desc: "Modificador Shift.", qmk: "KC_LSFT" },
      { p: "Z", s: "print", t: "key-alpha", title: "Letra Z", desc: "No DWM: Super+Z tira screenshot com gnome-screenshot!", qmk: "KC_Z" },
      { p: "X", s: "", t: "key-alpha", title: "Letra X", desc: "No Vim: x apaga caractere sob o cursor.", qmk: "KC_X" },
      { p: "C", s: "", t: "key-alpha", title: "Letra C", desc: "No DWM: Super+C atalho para VSCode.", qmk: "KC_C" },
      { p: "V", s: "", t: "key-alpha", title: "Letra V", desc: "No Vim: v inicia modo visual de seleção.", qmk: "KC_V" },
      { p: "B", s: "bar", t: "key-alpha", title: "Letra B", desc: "No DWM: Super+B esconde/mostra a barra de status.", qmk: "KC_B" }
    ],
    thumbsLeft: [
      { p: "Super", s: "DWM", t: "key-mod", title: "Tecla Windows / Super (DWM Master)", desc: "🚀 Modificador Mestre do DWM no polegar esquerdo! Super+Enter = Terminal, Super+D = dmenu, Super+J/K = janelas.", qmk: "KC_LGUI" },
      { p: "MO(1)", s: "NAV", t: "key-layer", title: "Ativador de Navegação (Layer 1)", desc: "Segure com o polegar para transformar a mão direita em setas Vim (HJKL), Home, End, PgUp, PgDn e controles de áudio.", qmk: "MO(1)" },
      { p: "Space", s: "", t: "key-alpha", title: "Barra de Espaço", desc: "Espaço no polegar esquerdo. Dead keys: ' + espaço = ' literal.", qmk: "KC_SPC" }
    ],
    keysRight: [
      // Row 0
      { p: "6", s: "", t: "key-alpha", title: "Número 6", desc: "Número 6.", qmk: "KC_6" },
      { p: "7", s: "", t: "key-alpha", title: "Número 7", desc: "Número 7.", qmk: "KC_7" },
      { p: "8", s: "", t: "key-alpha", title: "Número 8", desc: "Número 8.", qmk: "KC_8" },
      { p: "9", s: "", t: "key-alpha", title: "Número 9", desc: "Número 9.", qmk: "KC_9" },
      { p: "0", s: "", t: "key-alpha", title: "Número 0", desc: "Número 0. Super+0 = ver todas as tags no DWM.", qmk: "KC_0" },
      { p: "- / _", s: "KC_MINS", t: "key-alpha", title: "Hífen e Underscore", desc: "Hífen (-) e Shift = Underscore (_).", qmk: "KC_MINS" },
      // Row 1
      { p: "Y", s: "", t: "key-alpha", title: "Letra Y", desc: "No Vim: y faz cópia (yank).", qmk: "KC_Y" },
      { p: "U", s: "", t: "key-alpha", title: "Letra U", desc: "No Vim: u faz desfazer (undo).", qmk: "KC_U" },
      { p: "I", s: "", t: "key-alpha", title: "Letra I", desc: "No Vim: i entra no modo insert.", qmk: "KC_I" },
      { p: "O", s: "", t: "key-alpha", title: "Letra O", desc: "No Vim: o insere nova linha abaixo.", qmk: "KC_O" },
      { p: "P", s: "", t: "key-alpha", title: "Letra P", desc: "No Vim: p cola texto (paste).", qmk: "KC_P" },
      { p: "⌫", s: "Bksp", t: "key-mod", title: "Backspace", desc: "Apagar tradicional para manter facilidade de adaptação do AULA F75.", qmk: "KC_BSPC" },
      // Row 2 (Home Row)
      { p: "H", s: "←", t: "key-alpha", title: "Letra H", desc: "No Vim / DWM: h move para a esquerda e reduz o painel master.", qmk: "KC_H" },
      { p: "J", s: "↓", t: "key-alpha", title: "Letra J", desc: "No Vim / DWM: j move para baixo e alterna para a próxima janela no DWM!", qmk: "KC_J" },
      { p: "K", s: "↑", t: "key-alpha", title: "Letra K", desc: "No Vim / DWM: k move para cima e alterna para a janela anterior no DWM!", qmk: "KC_K" },
      { p: "L", s: "→", t: "key-alpha", title: "Letra L", desc: "No Vim / DWM: l move para a direita e aumenta o painel master.", qmk: "KC_L" },
      { p: "; / :", s: "KC_SCLN", t: "key-alpha", title: "Ponto e Vírgula / Dois Pontos", desc: "No Vim: : inicia comandos ex (:w, :q).", qmk: "KC_SCLN" },
      { p: "' / \"", s: "ç / á", t: "key-accent", title: "Aspas e Acentos (' e \")", desc: "✨ Tecla Sagrada do Português US-Intl: Pressione ' e depois C para obter 'ç'! ' + a = á, ' + e = é, ' + o = ó.", qmk: "KC_QUOT" },
      // Row 3
      { p: "N", s: "", t: "key-alpha", title: "Letra N", desc: "No Vim: n repete busca para frente.", qmk: "KC_N" },
      { p: "M", s: "", t: "key-alpha", title: "Letra M", desc: "No DWM: Super+M layout monocle (tela cheia).", qmk: "KC_M" },
      { p: ", / <", s: "KC_COMM", t: "key-alpha", title: "Vírgula e Menor que", desc: "Vírgula. No DWM: Super+vírgula muda de monitor.", qmk: "KC_COMM" },
      { p: ". / >", s: "KC_DOT", t: "key-alpha", title: "Ponto e Maior que", desc: "Ponto. No DWM: Super+ponto muda de monitor.", qmk: "KC_DOT" },
      { p: "/ / ?", s: "KC_SLSH", t: "key-alpha", title: "Barra e Interrogação", desc: "No Vim: / inicia busca de texto.", qmk: "KC_SLSH" },
      { p: "Shift", s: "", t: "key-mod", title: "Shift Direito", desc: "Modificador Shift.", qmk: "KC_RSFT" }
    ],
    thumbsRight: [
      { p: "Enter", s: "DWM", t: "key-mod", title: "Enter no Polegar", desc: "Enter ergonômico no polegar direito! No DWM: Super + Enter abre o terminal st instantaneamente.", qmk: "KC_ENT" },
      { p: "MO(2)", s: "SYM", t: "key-layer", title: "Ativador de Símbolos (Layer 2)", desc: "Segure com o polegar direito para acessar parênteses, chaves, colchetes, operadores e símbolos de código.", qmk: "MO(2)" },
      { p: "AltGr", s: "US-Intl", t: "key-accent", title: "AltGr (Right Alt)", desc: "AltGr do padrão US-Intl: AltGr + , = ç, AltGr + / = °, AltGr + S = §.", qmk: "KC_RALT" }
    ]
  },

  1: {
    id: 1,
    title: "Layer 1: NAV & DWM & MULTIMÍDIA",
    desc: "Ativada segurando o polegar esquerdo (MO1). A mão direita vira uma central Vim de navegação e a mão esquerda comanda áudio e brilho.",
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
      { p: "---", s: "Ativa", t: "key-layer", title: "Camada Atual", desc: "Polegar segurando Layer 1.", qmk: "KC_TRNS" },
      { p: "MO(3)", s: "Num/Fn", t: "key-fn", title: "Ativador Layer 3", desc: "Segure ambos os polegares para Layer 3.", qmk: "MO(3)" }
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
      { p: "MO(3)", s: "Num/Fn", t: "key-fn", title: "Ativador Layer 3", desc: "Segure ambos os polegares para Layer 3.", qmk: "MO(3)" },
      { p: "▼", s: "AltGr", t: "key-trans", title: "AltGr (Transparente)", desc: "Mantém AltGr ativo.", qmk: "KC_TRNS" }
    ]
  },

  2: {
    id: 2,
    title: "Layer 2: SYM - SÍMBOLOS DE DEV",
    desc: "Ativada segurando o polegar direito (MO2). Pares de delimitadores lado a lado () {} [] <> e operadores na Home Row.",
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
      { p: "MO(3)", s: "Num/Fn", t: "key-fn", title: "Ativador Layer 3", desc: "Segure ambos os polegares para Layer 3.", qmk: "MO(3)" },
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
      { p: "---", s: "Ativa", t: "key-layer", title: "Camada Atual", desc: "Polegar segurando Layer 2.", qmk: "KC_TRNS" },
      { p: "AltGr", s: "", t: "key-accent", title: "AltGr", desc: "AltGr.", qmk: "KC_RALT" }
    ]
  },

  3: {
    id: 3,
    title: "Layer 3: NUMPAD & FN & BOOTLOADER",
    desc: "Ativada segurando ambos os polegares (ou tecla dedicada). Teclado numérico 10-key à direita, F1-F12 à esquerda e Bootloader.",
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
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
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
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" },
      { p: "▼", s: "", t: "key-trans", title: "Transparente", desc: "Repassa tecla.", qmk: "KC_TRNS" }
    ]
  }
};

let currentLayer = 0;

function renderKey(keyData) {
  const btn = document.createElement("div");
  btn.className = `key-cap ${keyData.t}`;
  btn.innerHTML = `
    <span class="key-primary">${keyData.p}</span>
    ${keyData.s ? `<span class="key-sub">${keyData.s}</span>` : ""}
  `;
  btn.addEventListener("click", () => showKeyDetail(keyData, btn));
  btn.addEventListener("mouseenter", () => showKeyDetail(keyData, btn));
  return btn;
}

function showKeyDetail(keyData, element) {
  document.querySelectorAll(".key-cap.selected").forEach(el => el.classList.remove("selected"));
  if (element) element.classList.add("selected");

  const card = document.getElementById("key-detail-target");
  if (!card) return;

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
    </div>
  `;
}

function switchLayer(layerId) {
  currentLayer = layerId;
  const layer = LAYERS_DATA[layerId];
  if (!layer) return;

  // Atualizar botões
  document.querySelectorAll(".layer-btn").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.layer, 10) === layerId);
  });

  // Atualizar descrição
  const descEl = document.getElementById("layer-desc-target");
  if (descEl) descEl.textContent = layer.desc;

  // Renderizar lado esquerdo
  const leftGrid = document.getElementById("grid-left-main");
  const leftThumbs = document.getElementById("thumbs-left");
  if (leftGrid && leftThumbs) {
    leftGrid.innerHTML = "";
    leftThumbs.innerHTML = "";
    layer.keysLeft.forEach(k => leftGrid.appendChild(renderKey(k)));
    layer.thumbsLeft.forEach(k => leftThumbs.appendChild(renderKey(k)));
  }

  // Renderizar lado direito
  const rightGrid = document.getElementById("grid-right-main");
  const rightThumbs = document.getElementById("thumbs-right");
  if (rightGrid && rightThumbs) {
    rightGrid.innerHTML = "";
    rightThumbs.innerHTML = "";
    layer.keysRight.forEach(k => rightGrid.appendChild(renderKey(k)));
    layer.thumbsRight.forEach(k => rightThumbs.appendChild(renderKey(k)));
  }

  // Selecionar a primeira tecla por padrão para preencher os detalhes
  const firstKey = layer.keysLeft[0];
  if (firstKey) showKeyDetail(firstKey, leftGrid ? leftGrid.firstChild : null);
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".layer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchLayer(parseInt(btn.dataset.layer, 10));
    });
  });

  switchLayer(0);
});
