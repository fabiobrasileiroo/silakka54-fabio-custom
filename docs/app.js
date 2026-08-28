// ============================================================
// Silakka54 — visualizador 3D (three.js via CDN)
// STLs servidos pelo jsDelivr CDN a partir do próprio repositório.
// ============================================================
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/loaders/STLLoader.js';

const REPO = 'fabiobrasileiroo/silakka54-fabio-custom';
const BRANCH = 'main';
const BUILD_TS = Date.now();
const CDN = (path) => `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/${path}?v=${BUILD_TS}`;

const GRID_Y = 0.5;

const PIECES = [
  // --- TIER 1: CASE PERSONALIZADA & BASE ---
  {
    id: 'cover-FB-LH',
    name: '1. Cover FB + Tux + linux (LH)',
    path: '01-final/LH/silakka54-chevron-cover-FB-Tux-linux-LH.stl',
    preview: '01-final/previews/preview-FB-Tux-linux-LH.png',
    color: 0xf2a33c,
    category: '1. Teclado Base',
    desc: 'Capa superior esquerda com plaqueta "FB" + silhueta oficial do Tux (Linux) e gravação lateral "linux".',
  },
  {
    id: 'cover-FB-RH',
    name: '1. Cover FB + Tux + linux (RH)',
    path: '01-final/RH/silakka54-chevron-cover-FB-Tux-linux-RH.stl',
    preview: '01-final/previews/preview-FB-Tux-linux-RH.png',
    color: 0x58a6ff,
    category: '1. Teclado Base',
    desc: 'Capa superior direita com plaqueta "FB" + silhueta oficial do Tux (Linux) e gravação lateral "linux".',
  },
  {
    id: 'base-js-LH',
    name: '1. Baseplate JS (LH)',
    path: '01-final/LH/silakka54-baseplate-js-LH.stl',
    preview: '01-final/previews/preview-js-LH.png',
    color: 0x3fb950,
    category: '1. Teclado Base',
    desc: 'Baseplate esquerda com frase "foi javascript que me deu" (fonte IntelliJ JetBrains Mono) gravada na face inferior com margens seguras.',
  },
  {
    id: 'base-java-RH',
    name: '1. Baseplate Java (RH)',
    path: '01-final/RH/silakka54-baseplate-java-RH.stl',
    preview: '01-final/previews/preview-java-RH.png',
    color: 0xbc8cff,
    category: '1. Teclado Base',
    desc: 'Baseplate direita com frase "foi java que me deu" (fonte IntelliJ JetBrains Mono) gravada na face inferior com margens seguras.',
  },
  {
    id: 'top-frame',
    name: '1. Top frame (comum)',
    path: '01-final/comum/silakka54-top-frame-screwunderneath.stl',
    preview: '01-final/previews/preview-top-frame.png',
    color: 0x9aa7b8,
    category: '1. Teclado Base',
    desc: 'Moldura de switches para case screwunderneath. Imprimir 1 direto + 1 espelhado.',
  },
  {
    id: 'slim-case-L',
    name: '1. Slim Case JS (LH)',
    path: '01-final/slim-screwless-case/silakka54-slim-case-js-LH.stl',
    preview: '01-final/previews/preview-slim-case-js-LH.png',
    color: 0x38d39f,
    category: '1. Slim Screwless',
    desc: 'Case slim sem parafusos (esquerda): frase "foi javascript que me deu" (fonte IntelliJ) gravada na lateral externa com leitura direta.',
  },
  {
    id: 'slim-case-R',
    name: '1. Slim Case Java (RH)',
    path: '01-final/slim-screwless-case/silakka54-slim-case-java-RH.stl',
    preview: '01-final/previews/preview-slim-case-java-RH.png',
    color: 0x2bb886,
    category: '1. Slim Screwless',
    desc: 'Case slim sem parafusos (direita): frase "foi java que me deu" (fonte IntelliJ) gravada na lateral externa com leitura direta.',
  },
  {
    id: 'slim-mcu-L',
    name: '1. Slim MCU Cover F + linux (LH)',
    path: '01-final/slim-screwless-case/silakka54-slim-mcu-cover-F-linux-LH.stl',
    preview: '01-final/previews/preview-slim-cover-F-linux-LH.png',
    color: 0xf2a33c,
    category: '1. Slim Screwless',
    desc: 'Cover do MCU por pressão (studs) para a case slim esquerda com "F" na plaqueta e "linux" na lateral.',
  },
  {
    id: 'slim-mcu-R',
    name: '1. Slim MCU Cover B + linux (RH)',
    path: '01-final/slim-screwless-case/silakka54-slim-mcu-cover-B-linux-RH.stl',
    preview: '01-final/previews/preview-slim-cover-B-linux-RH.png',
    color: 0x58a6ff,
    category: '1. Slim Screwless',
    desc: 'Cover do MCU por pressão (studs) para a case slim direita com "B" na plaqueta e "linux" na lateral.',
  },
  {
    id: 'slim-inner-frame',
    name: '1. Slim Inner Frame',
    path: '01-final/slim-screwless-case/silakka54_inner_frame.stl',
    preview: '01-final/previews/preview-inner-frame.png',
    color: 0xa5d6ff,
    category: '1. Slim Screwless',
    desc: 'Quadro interno que vai entre a PCB e a placa superior para suporte rígido das bordas.',
  },

  // --- TIER 2: ERGONOMIA TENT & TILT ---
  {
    id: 'shell-L',
    name: '2. Tent/tilt — side shell L',
    path: '01-final/carry-tent-2em1/silakka54_left_side_shell.stl',
    preview: '01-final/previews/preview-shell-L.png',
    color: 0x7ee787,
    category: '2. Ergonomia Tent/Tilt',
    desc: 'Kit ergonômico Tent & Tilt (Douglas Serrão): lateral esquerda (159×127×7 mm) que eleva e inclina em 10–15°.',
  },
  {
    id: 'shell-R',
    name: '2. Tent/tilt — side shell R',
    path: '01-final/carry-tent-2em1/silakka54_right_side_shell.stl',
    preview: '01-final/previews/preview-shell-R.png',
    color: 0x56d364,
    category: '2. Ergonomia Tent/Tilt',
    desc: 'Kit ergonômico Tent & Tilt: lateral direita que encaixa perfeitamente na Slim Screwless Case.',
  },
  {
    id: 'base-L',
    name: '2. Tent/tilt — base support L',
    path: '01-final/carry-tent-2em1/silakka54_left_base_support.stl',
    preview: '01-final/previews/preview-base-L.png',
    color: 0xa5d6ff,
    category: '2. Ergonomia Tent/Tilt',
    desc: 'Apoio de base esquerdo (157×123×11 mm) com elevação central para melhorar postura e punho.',
  },
  {
    id: 'base-R',
    name: '2. Tent/tilt — base support R',
    path: '01-final/carry-tent-2em1/silakka54_right_base_support.stl',
    preview: '01-final/previews/preview-base-R.png',
    color: 0x79c0ff,
    category: '2. Ergonomia Tent/Tilt',
    desc: 'Apoio de base direito (157×123×11 mm) para montagem simétrica da tenda.',
  },
  {
    id: 'wedge',
    name: '2. Tent/tilt — tilt wedge',
    path: '01-final/carry-tent-2em1/silakka54_tilt_wedge_xdeg.stl',
    preview: '01-final/previews/preview-wedge.png',
    color: 0xffd7a0,
    category: '2. Ergonomia Tent/Tilt',
    desc: 'Cunha de inclinação para ajuste fino da inclinação negativa/positiva.',
  },
  {
    id: 'palm-rest-L',
    name: '2. Tented Palm Rest (LH)',
    path: '01-final/carry-tent-2em1/silakka54-tented-palm-rest-LH.stl',
    preview: '01-final/previews/preview-palm-rest-LH.png',
    color: 0x48bb78,
    category: '2. Ergonomia Tent/Tilt',
    desc: '⭐ Apoio de Palma Ergonômico com Tenting (LH): rampa 100% lisa e contínua com inclinação de 12.4° e borda suave em cascata (waterfall).',
  },
  {
    id: 'palm-rest-R',
    name: '2. Tented Palm Rest (RH)',
    path: '01-final/carry-tent-2em1/silakka54-tented-palm-rest-RH.stl',
    preview: '01-final/previews/preview-palm-rest-RH.png',
    color: 0x38a169,
    category: '2. Ergonomia Tent/Tilt',
    desc: '⭐ Apoio de Palma Ergonômico com Tenting (RH): rampa 100% lisa e contínua com inclinação de 12.4°, sólido com encaixe para pés de borracha.',
  },

  // --- TIER 3: CARRY CASE TRANSPORTE 2-EM-1 ---
  {
    id: 'carry-67mm',
    name: '3. Carry Case 67 mm (FHMB)',
    path: '01-final/carry-tent-2em1/silakka-case-67mm.stl',
    preview: '01-final/previews/preview-carry-67mm.png',
    color: 0xd4a373,
    category: '3. Carry Case 2-em-1',
    desc: '⭐ Personalizado com "FHMB" + "silakka54" (fonte cursiva elegante) centralizado na parede principal externa. Altura de 67mm para suas Keycaps XDA.',
  },
  {
    id: 'carry-case',
    name: '3. Carry Case Padrão (50 mm)',
    path: '01-final/carry-tent-2em1/silakka54-case.stl',
    preview: '01-final/previews/preview-carry-case.png',
    color: 0xe07b39,
    category: '3. Carry Case 2-em-1',
    desc: 'Versão padrão de 50 mm para keycaps low-profile ou switches baixos.',
  },
];

// ------------------------------------------------------------
// ------------------------------------------------------------
// Cena
// ------------------------------------------------------------
const host = document.getElementById('canvas-host');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x161b22);

const camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.01, 8000);
camera.position.set(240, 160, 260);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(host.clientWidth, host.clientHeight);
host.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 30, 0);
controls.minDistance = 0.5;
controls.maxDistance = 3000;

// Luzes
scene.add(new THREE.AmbientLight(0xffffff, 0.65));
const key = new THREE.DirectionalLight(0xffffff, 2.4);
key.position.set(200, 400, 260);
scene.add(key);
const fill = new THREE.DirectionalLight(0x88aaff, 0.8);
fill.position.set(-300, 120, -200);
scene.add(fill);

// Chão sutil para dar contexto de orientação
const grid = new THREE.GridHelper(420, 20, 0x2d3648, 0x232b3d);
grid.position.y = GRID_Y;
scene.add(grid);

let mesh = null;

const materialFor = (hex) =>
  new THREE.MeshStandardMaterial({
    color: hex,
    roughness: 0.42,
    metalness: 0.08,
    flatShading: false,
    side: THREE.DoubleSide,
  });

function fitCameraToMesh(box, zoomFactor = 1.0) {
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const dist = (maxDim / (2 * Math.tan(fov / 2))) * zoomFactor;
  camera.position.set(dist * 0.9, dist * 0.7, dist * 1.2);
  controls.target.copy(box.getCenter(new THREE.Vector3()));
  controls.update();
}

let currentLoadId = 0;

function clearSceneMesh() {
  const toRemove = [];
  scene.traverse((obj) => {
    if (obj !== scene && obj !== key && obj !== fill && obj !== grid && !obj.isLight) {
      if (obj.parent === scene) {
        toRemove.push(obj);
      }
    }
  });
  toRemove.forEach((obj) => {
    scene.remove(obj);
    if (obj.traverse) {
      obj.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    } else {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    }
  });
  mesh = null;
}

function setPiece(piece) {
  const meta = document.getElementById('piece-meta');
  meta.innerHTML = '<span class="badge-loading">Carregando STL do CDN…</span>';

  currentLoadId++;
  const thisLoadId = currentLoadId;
  clearSceneMesh();

  new STLLoader().load(
    CDN(piece.path),
    (geometry) => {
      if (thisLoadId !== currentLoadId) {
        geometry.dispose();
        return;
      }
      clearSceneMesh();
      geometry.computeVertexNormals();
      mesh = new THREE.Mesh(geometry, materialFor(piece.color));
      // STL z-up → y-up: deita a peça e apoia a base sobre o grid.
      mesh.rotation.x = -Math.PI / 2;
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      mesh.position.x -= center.x;
      mesh.position.z -= center.z;
      box.setFromObject(mesh);
      mesh.position.y += GRID_Y - box.min.y;

      scene.add(mesh);
      fitCameraToMesh(new THREE.Box3().setFromObject(mesh));
      meta.innerHTML = `
        <span class="name">${piece.name}</span> ·
        <a href="${CDN(piece.path)}" download target="_blank" rel="noopener">baixar STL (CDN)</a> ·
        <a href="https://github.com/${REPO}/blob/${BRANCH}/${piece.path}" target="_blank" rel="noopener">ver no GitHub</a>
        <div class="desc">${piece.desc}</div>`;
    },
    undefined,
    (err) => {
      if (thisLoadId !== currentLoadId) return;
      console.error(err);
      meta.innerHTML = '<span class="badge-error">Falha ao carregar STL.</span>';
    }
  );
}

// ------------------------------------------------------------
// Visualização Combo 3-em-1 (3 Modelos Lado a Lado)
// ------------------------------------------------------------
function setComboScene() {
  const meta = document.getElementById('piece-meta');
  meta.innerHTML = '<span class="badge-loading">Montando os 3 Modelos lado a lado no 3D…</span>';

  currentLoadId++;
  const thisLoadId = currentLoadId;
  clearSceneMesh();

  const group = new THREE.Group();
  mesh = group;
  scene.add(group);

  const loader = new STLLoader();
  const comboParts = [
    // 1. Slim Case (Esquerda, X = -200)
    { path: '01-final/slim-screwless-case/silakka54-slim-case-js-LH.stl', color: 0x38d39f, offset: [-200, 0, 0] },
    { path: '01-final/slim-screwless-case/silakka54-slim-mcu-cover-F-linux-LH.stl', color: 0xf2a33c, offset: [-200, 0, 0] },
    // 2. Plataforma Tent & Tilt + Palm Rest (Centro, X = 0)
    { path: '01-final/carry-tent-2em1/silakka54_left_base_support.stl', color: 0xa5d6ff, offset: [0, 0, 40] },
    { path: '01-final/carry-tent-2em1/silakka54_left_side_shell.stl', color: 0x7ee787, offset: [0, 0, 40] },
    { path: '01-final/carry-tent-2em1/silakka54-tented-palm-rest-LH.stl', color: 0x48bb78, offset: [-50, 0, -80] },
    // 3. Carry Case 67mm (Direita, X = +200)
    { path: '01-final/carry-tent-2em1/silakka-case-67mm.stl', color: 0xd4a373, offset: [200, 0, 0] },
  ];

  let loadedCount = 0;
  comboParts.forEach((part) => {
    loader.load(
      CDN(part.path),
      (geo) => {
        if (thisLoadId !== currentLoadId) {
          geo.dispose();
          return;
        }
        geo.computeVertexNormals();
        const m = new THREE.Mesh(geo, materialFor(part.color));
        m.rotation.x = -Math.PI / 2;
        const b = new THREE.Box3().setFromObject(m);
        const c = b.getCenter(new THREE.Vector3());
        m.position.x = part.offset[0] - c.x;
        m.position.z = part.offset[2] - c.z;
        b.setFromObject(m);
        m.position.y = GRID_Y - b.min.y + part.offset[1];

        group.add(m);
        loadedCount++;
        if (loadedCount === comboParts.length) {
          fitCameraToMesh(new THREE.Box3().setFromObject(group), 1.05);
          meta.innerHTML = `
            <span class="name">🌟 Combo 3-em-1 Completo (3 Modelos Lado a Lado)</span>
            <div class="desc">
              <strong>1. Esquerda:</strong> Slim Case LH com gravação "foi javascript que me deu" e tampa MCU "F + linux"<br />
              <strong>2. Centro:</strong> Plataforma Tent &amp; Tilt (10–15°) com Apoio de Palma anatômico acoplado<br />
              <strong>3. Direita:</strong> Carry Case 67mm personalizado (FHMB + silakka54)
            </div>`;
        }
      },
      undefined,
      (err) => {
        if (thisLoadId !== currentLoadId) return;
        console.error(err);
      }
    );
  });
}

// ------------------------------------------------------------
// Categorias & Navegação Externa (FORA do 3D)
// ------------------------------------------------------------
const pieceTabsHost = document.getElementById('piece-tabs');
const catButtons = document.querySelectorAll('.cat-btn');

function renderCategoryPieces(category) {
  pieceTabsHost.innerHTML = '';
  if (category === 'combo') {
    pieceTabsHost.innerHTML = '<span class="muted small">Exibindo os 3 modelos montados lado a lado no espaço 3D.</span>';
    setComboScene();
    return;
  }

  const filtered = PIECES.filter((p) => p.category === category);
  filtered.forEach((piece, idx) => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = piece.name;
    btn.onclick = () => {
      pieceTabsHost.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      setPiece(piece);
    };
    if (idx === 0) {
      btn.classList.add('active');
      setPiece(piece);
    }
    pieceTabsHost.appendChild(btn);
  });
}

catButtons.forEach((btn) => {
  btn.onclick = () => {
    catButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderCategoryPieces(btn.getAttribute('data-cat'));
  };
});

// Inicia com o Combo 3-em-1 Completo Lado a Lado
renderCategoryPieces('combo');

// ------------------------------------------------------------
// Controles overlays & Zoom (Super-Zoom)
// ------------------------------------------------------------
const autoRotate = document.getElementById('btn-autorotate');
autoRotate.addEventListener('click', () => {
  controls.autoRotate = !controls.autoRotate;
  autoRotate.classList.toggle('active', controls.autoRotate);
});
controls.autoRotate = true;

document.getElementById('btn-reset').addEventListener('click', () => {
  if (mesh) fitCameraToMesh(new THREE.Box3().setFromObject(mesh), 1.0);
});

const zoomInBtn = document.getElementById('btn-zoom-in');
if (zoomInBtn) {
  zoomInBtn.addEventListener('click', () => {
    camera.position.sub(controls.target).multiplyScalar(0.7).add(controls.target);
    controls.update();
  });
}

const zoomOutBtn = document.getElementById('btn-zoom-out');
if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', () => {
    camera.position.sub(controls.target).multiplyScalar(1.4).add(controls.target);
    controls.update();
  });
}

const zoomDetailBtn = document.getElementById('btn-zoom-detail');
if (zoomDetailBtn) {
  zoomDetailBtn.addEventListener('click', () => {
    if (mesh) fitCameraToMesh(new THREE.Box3().setFromObject(mesh), 0.35);
  });
}

// Duplo clique na peça foca e aproxima a câmera
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
host.addEventListener('dblclick', (event) => {
  if (!mesh) return;
  const rect = host.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / host.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / host.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(mesh.children && mesh.children.length ? mesh.children : [mesh], true);
  if (intersects.length > 0) {
    const p = intersects[0].point;
    controls.target.copy(p);
    camera.position.sub(p).multiplyScalar(0.4).add(p);
    controls.update();
  }
});

// ------------------------------------------------------------
// Loop + resize
// ------------------------------------------------------------
renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
  camera.aspect = host.clientWidth / host.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(host.clientWidth, host.clientHeight);
});

// ------------------------------------------------------------
// Lightbox para imagens de preview
// ------------------------------------------------------------
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<div class="lightbox-content"><img src="" alt="" /><button class="lightbox-close">✕ fechar</button></div>';
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector('img');
lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

// ------------------------------------------------------------
// Grid de peças (seção abaixo do viewer)
// ------------------------------------------------------------
const gridHost = document.getElementById('pecas-grid');
PIECES.forEach((piece) => {
  const art = document.createElement('article');
  art.className = 'card';
  const preview = piece.preview
    ? `<div class="preview-wrap" title="Clique para ampliar"><img class="preview" src="${CDN(piece.preview)}" alt="Preview de ${piece.name}" loading="lazy" /><span class="zoom-hint">🔍 Ampliar</span></div>`
    : `<div class="preview preview-placeholder mono">sem preview<br />·<br />novo upload pendente</div>`;
  art.innerHTML = `
    ${preview}
    <div class="card-body">
      <h3>${piece.name}</h3>
      <p>${piece.desc}</p>
      <p class="hint mono">📁 ${piece.path}</p>
      <div class="card-actions">
        <button class="chip" data-view="${piece.id}">👁 Ver em 3D</button>
        <a class="chip download" href="${CDN(piece.path)}" download target="_blank" rel="noopener">⬇ STL</a>
      </div>
    </div>`;
  
  const previewWrap = art.querySelector('.preview-wrap');
  if (previewWrap && piece.preview) {
    previewWrap.addEventListener('click', (e) => {
      e.stopPropagation();
      lightboxImg.src = CDN(piece.preview);
      lightboxImg.alt = piece.name;
      lightbox.classList.add('active');
    });
  }

  art.querySelector('[data-view]').addEventListener('click', () => {
    const idx = PIECES.findIndex((p) => p.id === piece.id);
    chips[idx].click();
    document.getElementById('viewer').scrollIntoView({ behavior: 'smooth' });
  });
  gridHost.appendChild(art);
});