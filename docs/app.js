// ============================================================
// Silakka54 — visualizador 3D (three.js via CDN)
// STLs servidos pelo jsDelivr CDN a partir do próprio repositório.
// ============================================================
import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/loaders/STLLoader.js';

const REPO = 'fabiobrasileiroo/silakka54-fabio-custom';
const BRANCH = 'main';
const CDN = (path) => `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/${path}`;

const GRID_Y = 0.5;

const PIECES = [
  {
    id: 'cover-F-LH',
    name: 'Cover F + linux (LH)',
    path: '01-final/LH/silakka54-chevron-cover-F-linux-LH.stl',
    preview: '01-final/previews/preview-F-linux-LH.png',
    color: 0xf2a33c,
    desc: 'Capa superior (left half) com a tecla F gravada e o logo linux na face inferior. Derivada da full-mcu-cover-chevrons.',
  },
  {
    id: 'cover-B-RH',
    name: 'Cover B + linux (RH)',
    path: '01-final/RH/silakka54-chevron-cover-B-linux-RH.stl',
    preview: '01-final/previews/preview-B-linux-RH.png',
    color: 0x58a6ff,
    desc: 'Capa superior (right half) com a tecla B gravada e o logo linux na face inferior.',
  },
  {
    id: 'base-js-LH',
    name: 'Baseplate JS (LH)',
    path: '01-final/LH/silakka54-baseplate-js-LH.stl',
    preview: '01-final/previews/preview-js-LH.png',
    color: 0x3fb950,
    desc: 'Base (left half) com a frase gravada na face inferior: "Isso também passará".',
  },
  {
    id: 'base-java-RH',
    name: 'Baseplate Java (RH)',
    path: '01-final/RH/silakka54-baseplate-java-RH.stl',
    preview: '01-final/previews/preview-java-RH.png',
    color: 0xbc8cff,
    desc: 'Base (right half) com a frase gravada na face inferior: "Que a força esteja com vocês".',
  },
  {
    id: 'top-frame',
    name: 'Top frame (comum)',
    path: '01-final/comum/silakka54-top-frame-screwunderneath.stl',
    preview: '01-final/previews/preview-top-frame.png',
    color: 0x9aa7b8,
    desc: 'Peça comum a ambas as metades — a moldura que segura os switches. Imprimir 1 direto + 1 espelhado.',
  },
  {
    id: 'carry-case',
    name: 'Carry case (proteção)',
    path: '00-original/carry-case/silakka54-case.stl',
    preview: '01-final/previews/preview-carry-case.png',
    color: 0xe07b39,
    desc: 'Maleta de transporte que guarda e protege o teclado montado (com a tenting platform inclusa).',
  },
  {
    id: 'carry-67mm',
    name: 'Carry case 67 mm (altura)',
    path: '00-original/carry-case/silakka-case-67mm.stl',
    preview: '01-final/previews/preview-carry-67mm.png',
    color: 0xd4a373,
    desc: 'Variação da maleta de transporte com altura de 67 mm — mais espaço interno para a case.',
  },
  {
    id: 'shell-L',
    name: 'Tent/tilt — side shell L',
    path: '00-original/tent-tilt-kit/silakka54_left_side_shell.stl',
    preview: '01-final/previews/preview-shell-L.png',
    color: 0x7ee787,
    desc: 'Kit ergonômico Tent & Tilt: lateral esquerda (159×127×7 mm) que eleva e inclina a metade esquerda.',
  },
  {
    id: 'shell-R',
    name: 'Tent/tilt — side shell R',
    path: '00-original/tent-tilt-kit/silakka54_right_side_shell.stl',
    preview: '01-final/previews/preview-shell-R.png',
    color: 0x56d364,
    desc: 'Kit ergonômico Tent & Tilt: lateral direita (gia 160×127×7 mm).',
  },
  {
    id: 'base-L',
    name: 'Tent/tilt — base support L',
    path: '00-original/tent-tilt-kit/silakka54_left_base_support.stl',
    preview: '01-final/previews/preview-base-L.png',
    color: 0xa5d6ff,
    desc: 'Kit ergonômico Tent & Tilt: apoio de base esquerdo (157×123×11 mm) que encaixa sob a metade esquerda.',
  },
  {
    id: 'base-R',
    name: 'Tent/tilt — base support R',
    path: '00-original/tent-tilt-kit/silakka54_right_base_support.stl',
    preview: '01-final/previews/preview-base-R.png',
    color: 0x79c0ff,
    desc: 'Kit ergonômico Tent & Tilt: apoio de base direito (157×123×11 mm).',
  },
  {
    id: 'wedge',
    name: 'Tent/tilt — tilt wedge',
    path: '00-original/tent-tilt-kit/silakka54_tilt_wedge_xdeg.stl',
    preview: '01-final/previews/preview-wedge.png',
    color: 0xffd7a0,
    desc: 'Kit ergonômico Tent & Tilt: cunha de teste para escolher a angulação (6×25×74 mm).',
  },
];

// ------------------------------------------------------------
// Cena
// ------------------------------------------------------------
const host = document.getElementById('canvas-host');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x161b22);

const camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 5000);
camera.position.set(240, 160, 260);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(host.clientWidth, host.clientHeight);
host.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 30, 0);

// Luzes
scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const key = new THREE.DirectionalLight(0xffffff, 2.2);
key.position.set(200, 400, 260);
scene.add(key);
const fill = new THREE.DirectionalLight(0x88aaff, 0.7);
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

function fitCameraToMesh(box) {
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const dist = maxDim / (2 * Math.tan(fov / 2));
  camera.position.set(dist * 1.1, dist * 0.7, dist * 1.3);
  controls.target.copy(box.getCenter(new THREE.Vector3()));
  controls.update();
}

function setPiece(piece) {
  const meta = document.getElementById('piece-meta');
  meta.innerHTML = '<span class="badge-loading">Carregando STL do CDN…</span>';

  if (mesh) {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
    mesh = null;
  }

  new STLLoader().load(
    CDN(piece.path),
    (geometry) => {
      geometry.computeVertexNormals();
      mesh = new THREE.Mesh(geometry, materialFor(piece.color));
      // STL z-up → y-up: deita a peça e apoia a base sobre o grid (acima dos quadradinhos).
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
      console.error(err);
      meta.innerHTML = '<span class="badge-error">Falha ao carregar STL.</span>';
    }
  );
}

// ------------------------------------------------------------
// Tabs
// ------------------------------------------------------------
const tabsHost = document.getElementById('piece-tabs');
const chips = PIECES.map((piece) => {
  const btn = document.createElement('button');
  btn.className = 'chip';
  btn.textContent = piece.name;
  btn.onclick = () => {
    chips.forEach((c) => c.classList.remove('active'));
    btn.classList.add('active');
    setPiece(piece);
  };
  tabsHost.appendChild(btn);
  return btn;
});
chips[0].classList.add('active');
setPiece(PIECES[0]);

// ------------------------------------------------------------
// Controles overlays
// ------------------------------------------------------------
const autoRotate = document.getElementById('btn-autorotate');
autoRotate.addEventListener('click', () => {
  controls.autoRotate = !controls.autoRotate;
  autoRotate.classList.toggle('active', controls.autoRotate);
});
controls.autoRotate = true;

document.getElementById('btn-reset').addEventListener('click', () => {
  if (mesh) fitCameraToMesh(new THREE.Box3().setFromObject(mesh));
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
// Grid de peças (seção abaixo do viewer)
// ------------------------------------------------------------
const gridHost = document.getElementById('pecas-grid');
PIECES.forEach((piece) => {
  const art = document.createElement('article');
  art.className = 'card';
  const preview = piece.preview
    ? `<img class="preview" src="${CDN(piece.preview)}" alt="Preview de ${piece.name}" loading="lazy" />`
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
  art.querySelector('[data-view]').addEventListener('click', () => {
    const idx = PIECES.findIndex((p) => p.id === piece.id);
    chips[idx].click();
    document.getElementById('viewer').scrollIntoView({ behavior: 'smooth' });
  });
  gridHost.appendChild(art);
});