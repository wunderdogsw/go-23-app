let camera, scene, renderer;
let clock, mesh;

const meshes = [];
const objects = [
  {
    geometry: new THREE.SphereGeometry(0.05, 32, 16),
    position: { x: 0, y: 0, z: 0 },
    floating: 'sin',
    axis: 'x',
    speed: 0.6,
  },
  {
    geometry: new THREE.SphereGeometry(0.04, 32, 20),
    floating: 'cos',
    position: { x: 0.3, y: 0, z: 0 },
    axis: 'y',
    speed: 0.7,
  },
  {
    geometry: new THREE.BoxGeometry(0.1, 0.1, 0.1),
    floating: 'sin',
    position: { x: 0.15, y: 0.34, z: 0 },
    axis: 'y',
    speed: 0.7,
  },
  {
    geometry: new THREE.CylinderGeometry(0.051, 0.05, 0.05, 20),
    floating: 'cos',
    axis: 'y',
    position: { x: -0.25, y: 0, z: 0 },
    speed: 0.4,
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

  objects.forEach((obj) => {
    const material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(obj.geometry, material);
    mesh.position.x = obj.position.x;
    mesh.position.y = obj.position.y;
    mesh.position.z = obj.position.z;

    meshes.push(mesh);
    scene.add(mesh);
  });

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
    const v = Math[obj.floating](time) * obj.speed;
    mesh.position[obj.axis] = v;
  });

  renderer.render(scene, camera);
}
