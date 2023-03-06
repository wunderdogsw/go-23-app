let camera, scene, renderer;
let clock, mesh;

const meshes = [];
const objects = [
  {
    geometry: new THREE.SphereGeometry(0.05, 32, 16),
    position: { x: 0, y: 0.8, z: 0 },
    floating: 'sin',
    axis: 'y',
    speed: 0.6,
  },
];

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime();
  meshes.forEach((mesh, index) => {
    const obj = objects[index];
    const v = mesh.position[obj.axis] - time / 500;
    mesh.position[obj.axis] = v;
  });

  renderer.render(scene, camera);
}

function single() {
  const obj = objects[0];
  const material = new THREE.MeshNormalMaterial();
  mesh = new THREE.Mesh(obj.geometry, material);
  mesh.position.x = obj.position.x;
  mesh.position.y = obj.position.y;
  mesh.position.z = obj.position.z;

  meshes.push(mesh);
  scene.add(mesh);
}

var singleBtn = document.querySelector('#single');
singleBtn.addEventListener('click', single, false);
