import * as THREE from "three";
/**
 *
 * @param {THREE.VideoTexture} texture
 * @param {number} radius
 * @returns
 */
export default function Sphere(texture, radius = 0.6) {
  const sphereGe = new THREE.SphereGeometry(radius);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: randomColor(),
  });
  const sphere = new THREE.Mesh(sphereGe, sphereMaterial);

  sphere.castShadow = true;
  sphere.receiveShadow = true;
  return sphere;
}

function randomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return parseInt(`0x${randomColor}`);
}
