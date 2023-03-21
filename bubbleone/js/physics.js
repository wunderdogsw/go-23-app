import * as THREE from 'three';

export function convertThreeToCannon(shape) {
  const { type, parameters, attributes } = shape.geometry;
  let { radiusTop, radiusBottom, radius, height, radialSegments } = parameters;

  switch (type) {
    case 'ConeGeometry': return new CANNON.Cylinder(0, radius, height, radialSegments);
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
