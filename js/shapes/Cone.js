import * as THREE from 'three';

/**
 *
 * @param {THREE.VideoTexture} texture
 * @param {number} radius
 * @param {number} height
 * @param {number} segments
 * @returns
 */
export default function Cone(texture, radius = 0.8, height = 2, segments = 32) {
  const coneGe = new THREE.ConeGeometry(radius, height, segments);
  const coneMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const cone = new THREE.Mesh(coneGe, coneMaterial);
  cone.castShadow = true;
  cone.receiveShadow = true;
  return cone;
}
