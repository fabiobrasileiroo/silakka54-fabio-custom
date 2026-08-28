#!/usr/bin/env python3
"""create_zip_package.py — Empacota todos os modelos 3D finais prontos para impressão num único arquivo ZIP."""
import os
import zipfile

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, ".."))
ZIP_OUT = os.path.join(ROOT_DIR, "01-final", "silakka54-fabio-pacote-completo.zip")

files_to_pack = [
    # 1. Teclado Slim Screwless & Capas MCU
    ("01-final/slim-screwless-case/silakka54-slim-case-js-LH.stl", "1-Teclado-Slim/silakka54-slim-case-js-LH.stl"),
    ("01-final/slim-screwless-case/silakka54-slim-case-java-RH.stl", "1-Teclado-Slim/silakka54-slim-case-java-RH.stl"),
    ("01-final/LH/silakka54-chevron-cover-FB-Tux-linux-LH.stl", "1-Teclado-Slim/silakka54-cover-FB-Tux-linux-LH.stl"),
    ("01-final/RH/silakka54-chevron-cover-FB-Tux-linux-RH.stl", "1-Teclado-Slim/silakka54-cover-FB-Tux-linux-RH.stl"),

    # 2. Ergonomia: Apoios de Palma (Tented 12.4° + Planos 0°) & Kit Tent & Tilt
    ("01-final/carry-tent-2em1/silakka54-tented-palm-rest-LH.stl", "2-Ergonomia-Tenting/silakka54-tented-palm-rest-LH.stl"),
    ("01-final/carry-tent-2em1/silakka54-tented-palm-rest-RH.stl", "2-Ergonomia-Tenting/silakka54-tented-palm-rest-RH.stl"),
    ("01-final/carry-tent-2em1/silakka54-flat-palm-rest-LH.stl", "2-Ergonomia-Tenting/silakka54-flat-palm-rest-LH.stl"),
    ("01-final/carry-tent-2em1/silakka54-flat-palm-rest-RH.stl", "2-Ergonomia-Tenting/silakka54-flat-palm-rest-RH.stl"),
    ("00-original/tent-tilt-kit/silakka54_left_base_support.stl", "2-Ergonomia-Tenting/silakka54-left-base-support.stl"),
    ("00-original/tent-tilt-kit/silakka54_right_base_support.stl", "2-Ergonomia-Tenting/silakka54-right-base-support.stl"),
    ("00-original/tent-tilt-kit/silakka54_left_side_shell.stl", "2-Ergonomia-Tenting/silakka54-left-side-shell.stl"),
    ("00-original/tent-tilt-kit/silakka54_right_side_shell.stl", "2-Ergonomia-Tenting/silakka54-right-side-shell.stl"),
    ("00-original/tent-tilt-kit/silakka54_tilt_wedge_xdeg.stl", "2-Ergonomia-Tenting/silakka54-tilt-wedge-ajuste.stl"),

    # 3. Carry Case 2-em-1 (Transporte)
    ("01-final/carry-tent-2em1/silakka-case-67mm.stl", "3-Carry-Case-Transporte/silakka-case-67mm-keycaps-xda.stl"),
    ("01-final/carry-tent-2em1/silakka54-case.stl", "3-Carry-Case-Transporte/silakka-case-50mm-padrao.stl"),
]

readme_txt = """================================================================================
SILAKKA54 CUSTOM — PACOTE COMPLETO DE ARQUIVOS STL PARA IMPRESSÃO 3D (FABIO)
================================================================================

HARDWARE COMPRADO:
- PCB: Silakka54 Hot-Swap Split QMK VIAL (RP2040 V1.2/V1.3)
- Switches: Leobog Gray Wood V4 POM Linear
- Keycaps: Graffiti XDA PBT (125 teclas - perfil uniforme)

CONTEÚDO DO PACOTE:
-------------------
📂 1-Teclado-Slim/
  ├── silakka54-slim-case-js-LH.stl       (Case Slim LH c/ "foi javascript que me deu" na lateral)
  ├── silakka54-slim-case-java-RH.stl     (Case Slim RH c/ "foi java que me deu" na lateral)
  ├── silakka54-cover-FB-Tux-linux-LH.stl (Capa MCU LH c/ plaqueta "FB", Tux e "linux")
  └── silakka54-cover-FB-Tux-linux-RH.stl (Capa MCU RH c/ plaqueta "FB", Tux e "linux")

📂 2-Ergonomia-Tenting/
  ├── silakka54-tented-palm-rest-LH.stl   (Apoio de palma ergonômico liso LH c/ inclinação 12.4° para uso com Tenting)
  ├── silakka54-tented-palm-rest-RH.stl   (Apoio de palma ergonômico liso RH c/ inclinação 12.4° para uso com Tenting)
  ├── silakka54-flat-palm-rest-LH.stl     (Apoio de palma plano 0° LH para uso direto na mesa sem Tenting)
  ├── silakka54-flat-palm-rest-RH.stl     (Apoio de palma plano 0° RH para uso direto na mesa sem Tenting)
  ├── silakka54-left-base-support.stl     (Suporte base de tenting Douglas Serrão LH)
  ├── silakka54-right-base-support.stl    (Suporte base de tenting Douglas Serrão RH)
  ├── silakka54-left-side-shell.stl       (Side shell de sustentação LH)
  ├── silakka54-right-side-shell.stl      (Side shell de sustentação RH)
  └── silakka54-tilt-wedge-ajuste.stl     (Cunha para ajuste fino de inclinação)

📂 3-Carry-Case-Transporte/
  ├── silakka-case-67mm-keycaps-xda.stl   (Estojo Carry Case 67mm 100% liso e limpo para Keycaps XDA + Tenting)
  └── silakka-case-50mm-padrao.stl        (Estojo Carry Case 50mm padrão)

DICAS DE IMPRESSÃO 3D & ESTABILIDADE NA MESA:
---------------------------------------------
1. Material Recomendado: PLA+ ou PETG (para excelente durabilidade e acabamento).
2. Altura de Camada: 0.16mm ou 0.20mm.
3. Preenchimento (Infill):
   - Teclado e Capas: 20% Gyroid ou Grid (3 perímetros).
   - Apoios de Palma: 25% a 35% Gyroid para excelente solidez e peso (150g a 180g cada lado).
4. Estabilidade & Pés Antiderrapantes (Bumpons):
   - Cada apoio e suporte possui 4 cavidades de 8.5 mm x 1.2 mm na base.
   - Cole pés adesivos de silicone/borracha de 8mm a 8.5mm para travar o teclado e apoios na mesa.
================================================================================
"""

os.makedirs(os.path.dirname(ZIP_OUT), exist_ok=True)
with zipfile.ZipFile(ZIP_OUT, 'w', zipfile.ZIP_DEFLATED) as zf:
    zf.writestr('LEIAME.txt', readme_txt)
    for rel_src, rel_dst in files_to_pack:
        full_src = os.path.join(ROOT_DIR, rel_src)
        if os.path.exists(full_src):
            zf.write(full_src, rel_dst)
            print(f"Packed: {rel_dst} ({os.path.getsize(full_src)} bytes)")
        else:
            print(f"ERROR: Not found {full_src}")

print(f"\nZIP Package created successfully: {ZIP_OUT} ({os.path.getsize(ZIP_OUT) / (1024*1024):.2f} MB)")
