import * as THREE from 'three';

export default function Bubble({ radius = 1, x = 0, y = 0, z = 0 } = {}) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const bubble = new THREE.Mesh(geometry, material);
  bubble.position.set(x, y, z);

  return bubble;
}
