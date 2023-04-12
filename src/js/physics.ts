import * as CANNON from 'cannon-es';

const COLLIDING_CONTACT_MATERIAL_OPTIONS = {
  friction: 0.0,
  restitution: 1.0,
};

let world: any;

export function initWorld() {
  world = new CANNON.World();
  world.gravity.set(0, 0, 0);
}

export function getWorld() {
  return world;
}

export function worldStep() {
  world.step(1 / 60);
}

export function addCollidingContactMaterial(
  material1: any,
  material2: any,
  options = COLLIDING_CONTACT_MATERIAL_OPTIONS
) {
  const contactMaterial = new CANNON.ContactMaterial(material1, material2, options);
  world.addContactMaterial(contactMaterial);
}

export function createBody(mesh: any, material: any, mass = 0) {
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

function createCannonBodyFromMesh(mesh: any) {
  const { type, parameters, attributes } = mesh.geometry;
  let { radiusTop, radiusBottom, radius, height, radialSegments } = parameters;

  switch (type) {
    case 'ConeGeometry':
      return new CANNON.Cylinder(0.0001, radius, height, radialSegments);
    case 'CylinderGeometry':
      return new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments);
    case 'SphereGeometry':
      return new CANNON.Sphere(radius);
  }

  // Trimesh as fallback. However collision detection is not supported
  const vertices = attributes.position.array;
  const indices = Object.keys(vertices).map(Number);

  return new CANNON.Trimesh(vertices, indices);
}
