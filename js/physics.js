import * as CANNON from 'cannon-es';
import * as THREE from 'three';

const COLLIDING_CONTACT_MATERIAL_OPTIONS = {
  friction: 0.0,
  restitution: 1.0,
};

let world;

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

export function addCollidingContactMaterial(material1, material2, options = COLLIDING_CONTACT_MATERIAL_OPTIONS) {
  const contactMaterial = new CANNON.ContactMaterial(material1, material2, options);
  world.addContactMaterial(contactMaterial);
}

export function convertThreeToCannon(shape) {
  const { type, parameters, attributes } = shape.geometry;
  let { radiusTop, radiusBottom, radius, height, radialSegments } = parameters;

  switch (type) {
    case 'ConeGeometry': return new CANNON.Cylinder(0.0001, radius, height, radialSegments);
    case 'CylinderGeometry': return new CANNON.Cylinder(radiusTop, radiusBottom, height, radialSegments);
    case 'SphereGeometry': return new CANNON.Sphere(radius);
  }

  // Trimesh as fallback. However collision detection is not supported
  const vertices = attributes.position.array;
  const indices = Object.keys(vertices).map(Number);
  return new CANNON.Trimesh(vertices, indices);
}

/**
 * 
 * @param {THREE.Mesh} mesh
 * @returns CANNON.Body
 */
export function createBody(mesh, mass, material) {
  const cannonShape = convertThreeToCannon(mesh);

  const body = new CANNON.Body({
    mass,
    shape: cannonShape,
    position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z),
    material
  });

  return body;
}
