import * as THREE from 'three';
/**
 *
 * @param {THREE.VideoTexture} texture
 * @param {number} radius
 * @returns
 */
export default function Sphere(texture, radius = 0.6) {
  const sphereGe = new THREE.SphereGeometry(radius);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const sphere = new THREE.Mesh(sphereGe, sphereMaterial);

  sphere.castShadow = true;
  sphere.receiveShadow = true;
  return sphere;
}
