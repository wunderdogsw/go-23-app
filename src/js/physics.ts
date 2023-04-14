import * as THREE from 'three';
import * as CANNON from 'cannon-es';

const COLLIDING_CONTACT_MATERIAL_OPTIONS = {
  friction: 0.0,
  restitution: 1.0,
};

let world: CANNON.World;

export function initWorld() {
  world = new CANNON.World();
  world.gravity.set(0, 0, 0);
}

export function getWorld(): CANNON.World {
  return world;
}

export function worldStep() {
  world.step(1 / 60);
}

export function addCollidingContactMaterial(
  material1: CANNON.Material,
  material2: CANNON.Material,
  options: CANNON.ContactMaterialOptions = COLLIDING_CONTACT_MATERIAL_OPTIONS
) {
  const contactMaterial = new CANNON.ContactMaterial(material1, material2, options);
  world.addContactMaterial(contactMaterial);
}

export function createBody(mesh: THREE.Mesh, material: CANNON.Material, mass = 0): CANNON.Body {
  const shape = createCannonBodyFromMesh(mesh);

  const { x, y, z } = mesh.position;
  const position = new CANNON.Vec3(x, y, z);

  return new CANNON.Body({
    mass,
    shape,
    position,
    material,
  });
}

function createCannonBodyFromMesh(mesh: THREE.Mesh) {
  const { geometry } = mesh;

  if (geometry instanceof THREE.SphereGeometry) {
    const { radius } = geometry.parameters;
    return new CANNON.Sphere(radius);
  } else if (geometry instanceof THREE.ConeGeometry) {
    const { radius, height, radialSegments } = geometry.parameters;
    return new CANNON.Cylinder(0.0001, radius, height, radialSegments);
  } else if (geometry instanceof THREE.CylinderGeometry) {
    const { radiusTop, radiusBottom, height, radialSegments } = geometry.parameters;
    return new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments);
  }

  // Trimesh as fallback. However, collision detection is not supported
  const { position } = geometry.attributes;
  // @ts-ignore
  const vertices = position.array ?? [];
  const indices = Object.keys(vertices).map(Number);

  return new CANNON.Trimesh(vertices, indices);
}
