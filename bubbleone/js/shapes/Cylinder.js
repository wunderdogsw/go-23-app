import * as THREE from 'three';
/**
 *
 * @param {THREE.VideoTexture} texture
 * @param {number} radius
 * @returns
 */
export default function Cylinder(texture, radiusTop = 0.3, radiusBottom = 0.3, height = 3, radialSegments = 20) {
  const cylinderGe = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
  const cylinderMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const cylinder = new THREE.Mesh(cylinderGe, cylinderMaterial);

  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  return cylinder;
}
