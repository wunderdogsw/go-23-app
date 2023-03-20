import * as THREE from 'three';

/**
 * 
 * @param {THREE.Mesh} mesh
 * @returns CANNON.Body
 */
export function createBody(mesh) {
  const vertices = mesh.geometry.attributes.position.array;
  const indices = Object.keys(vertices).map(Number);
  const cannonShape = new CANNON.Trimesh(vertices, indices);

  const body = new CANNON.Body({
    mass: 1,
    shape: cannonShape,
    position: new CANNON.Vec3(mesh.position.x, mesh.position.y, mesh.position.z)
  });

  return body;
}
