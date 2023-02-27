import * as THREE from 'three';

export default function sphereStatic(texture, x = 0, y = 0, radius = 0.6) {
  const sphereGe = new THREE.SphereGeometry(radius);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const sphereStaticTexture = new THREE.Mesh(sphereGe, sphereMaterial);
  sphereStaticTexture.position.set(x, y);

  return sphereStaticTexture;
}
