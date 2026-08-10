// ============================================================
// Silakka54 — visualizador 3D (three.js via CDN)
// STLs servidos pelo jsDelivr CDN a partir do próprio repositório.
// ============================================================
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/loaders/STLLoader.js';

const REPO = 'fabiobrasileiroo/silakka54-pacote-impressao';
const BRANCH = 'main';
const CDN = (path) => `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/${path}`;

const PIECES = [
  {
    id: 'cover-F-LH',
    name: 'Cover F + linux (LH)',
    path: '01-final/LH/silakka54-chevron-cover-F-linux-LH.stl',
    color: 0xf2a33c,
    desc: 'Capa superior (left half) com a tecla F gravada e o logo linux na face inferior. Derivada da full-mcu-cover-chevrons.',
  },
  {
    id: 'cover-B-RH',
    name: 'Cover B + linux (RH)',
    path: '01-final/RH/silakka54-chevron-cover-B-linux-RH.stl',
    color: 0x58a6ff,
    desc: 'Capa superior (right half) com a tecla B gravada e o logo linux na face inferior.',
  },
  {
    id: 'base-js-LH',
    name: 'Baseplate JS (LH)',
    path: '01-final/LH/silakka54-baseplate-js-LH.stl',
    color: 0x3fb950,
    desc: 'Base (left half) com a frase gravada na face inferior: “Isso também passará”.',
  },
  {
    id: 'base-java-RH',
    name: 'Baseplate Java (RH)',
    path: '01-final/RH/silakka54-baseplate-java-RH.stl',
    color: 0xbc8cff,
    desc: 'Base (right half) com a frase gravada na face inferior: “Que a força esteja com vocês”.',
  },
  {
    id: 'top-frame',
    name: 'Top frame (comum)',
    path: '01-final/comum/silakka54-top-frame-screwunderneath.stl',
    color: 0x9aa7b8,
    desc: 'Peça comum a ambas as metades — a moldura que segura os switches. Não é preciso imprimir duas vezes.',
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
grid.position.y = 0.5;
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
  const sizeKb = piece.path.endsWith('top-frame') ? '≈ ' : '';
  art.innerHTML = `
    <h3>${piece.name}</h3>
    <p>${piece.desc}</p>
    <p class="hint mono">📁 ${piece.path}</p>
    <p class="hint">
      <a href="${CDN(piece.path)}" download target="_blank" rel="noopener">⬇ Download STL</a>
      ${sizeKb}
    </p>`;
  gridHost.appendChild(art);
});