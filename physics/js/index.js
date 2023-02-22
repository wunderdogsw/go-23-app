import * as THREE from 'three';

import Sphere from './Sphere.js';

function getRandomInteger(x, y) {
  return Math.floor(Math.random() * (Math.abs(y - x) + 1)) + Math.min(x, y);
}


function getRandomVector(range = 3) {
  return new CANNON.Vec3(getRandomInteger(-range, range), getRandomInteger(-range, range), 0)
}

// Create physics
const world = new CANNON.World();
world.gravity.set(0, 0, 0);
// world.broadphase = new CANNON.NaiveBroadphase();

// Create a plane
const groundShape = new CANNON.Plane();
const groundMaterial = new CANNON.Material()
const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
groundBody.addShape(groundShape);
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // rotate the plane to align with y-axis
groundBody.position.set(0, -4.2, 0);
world.add(groundBody)

// tons of ChatGPT code all over the place here, long live the singularity!

// Create a box shape for the ceiling
const ceilingMaterial = new CANNON.Material()
const ceilingShape = new CANNON.Box(new CANNON.Vec3(20, 1, 0.5));
const ceilingBody = new CANNON.Body({
  mass: 0,
  shape: ceilingShape,
  material: ceilingMaterial
});
ceilingBody.position.set(0, 5, 0);
ceilingBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), 0);
world.addBody(ceilingBody);

const leftWallMaterial = new CANNON.Material()
const leftWallShape = new CANNON.Box(new CANNON.Vec3(0.1, 10, 10));
const leftWallBody = new CANNON.Body({
  mass: 0, // Walls are typically static, so they have zero mass
  shape: leftWallShape,
  material: leftWallMaterial
});
leftWallBody.position.set(8, 0, 0);
world.addBody(leftWallBody);

const rightWallMaterial = new CANNON.Material()
const rightWallShape = new CANNON.Box(new CANNON.Vec3(0.1, 10, 10));
const rightWallBody = new CANNON.Body({
  mass: 0, // Walls are typically static, so they have zero mass
  shape: rightWallShape,
  material: rightWallMaterial
});
rightWallBody.position.set(-8, 0, 0);
world.addBody(rightWallBody);

// Create an empty scene
const scene = new THREE.Scene();
const canvas = document.querySelector('#canvas');

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

// Create a renderer with Antialiasing
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// Configure renderer clear color
renderer.setClearColor('#000000');

// Needed for standard materials to be visible
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Configure renderer size
renderer.setSize(window.innerWidth, window.innerHeight);

const verticalTexture = new THREE.TextureLoader().load(
  '../assets/vStripes.jpeg'
);
const horizontalTexture = new THREE.TextureLoader().load(
  '../assets/hStripes.jpeg'
);

const hVideo = document.getElementById('hVideo');
const sVideo = document.getElementById('sVideo');

const hVTexture = new THREE.VideoTexture(hVideo);
const sVTexture = new THREE.VideoTexture(sVideo);

// Sphere with static texture
const sphereStaticTexture = Sphere(horizontalTexture, 2, 2);
scene.add(sphereStaticTexture);

// Sphere physics
const sphereStaticMaterial = new CANNON.Material()
const sphereStaticBody = new CANNON.Body({
  mass: 5, // kg
  position: new CANNON.Vec3(2, 2, 0), // m
  shape: new CANNON.Sphere(0.6),
  material: sphereStaticMaterial,
  velocity: getRandomVector()
});
world.addBody(sphereStaticBody);


// Sphere with video
const sphereVideoTexture = Sphere(sVTexture, -2, 2);
scene.add(sphereVideoTexture);

// Sphere physics
const sphereVideoMaterial = new CANNON.Material()
const sphereVideoBody = new CANNON.Body({
  mass: 5, // kg
  position: new CANNON.Vec3(-2, 2, 0), // m
  shape: new CANNON.Sphere(0.6),
  material: sphereVideoMaterial,
  velocity: getRandomVector()
});
sphereVideoBody.linearDamping = 0.01;
world.addBody(sphereVideoBody);

// Contact materials
function createContactMaterials(materials1, materials2) {
  materials1.forEach((material1) => {
    materials2.forEach((material2) => {
      if (material1 === material2) {
        return
      }

      const contactMaterial = new CANNON.ContactMaterial(material1, material2, { friction: 0.0, restitution: 1.0 })
      world.addContactMaterial(contactMaterial)
    })
  })
}

const bodyMaterials = [groundMaterial, ceilingMaterial, leftWallMaterial, rightWallMaterial]
const shapeMaterials = [sphereStaticMaterial, sphereVideoMaterial]

createContactMaterials(bodyMaterials, shapeMaterials)
createContactMaterials(shapeMaterials, shapeMaterials)

// Render Loop
const render = function () {
  requestAnimationFrame(render);
  world.step(1 / 60);

  sphereStaticTexture.rotateX(0.01);
  sphereStaticTexture.rotateY(0.01);

  sphereStaticTexture.position.copy(sphereStaticBody.position);
  sphereStaticTexture.quaternion.copy(sphereStaticBody.quaternion);

  sphereVideoTexture.rotateX(-0.01);
  sphereVideoTexture.rotateY(-0.01);

  sphereVideoTexture.position.copy(sphereVideoBody.position);
  sphereVideoTexture.quaternion.copy(sphereVideoBody.quaternion);

  sVTexture.needsUpdate = true;
  hVTexture.needsUpdate = true;

  // Render the scene
  renderer.render(scene, camera);
};

render();
