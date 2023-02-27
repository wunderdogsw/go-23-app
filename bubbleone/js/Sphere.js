import * as THREE from 'three';

export default function sphereStatic(texture) {
  const sphereGe = new THREE.SphereGeometry(0.6);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texture,
  });
  const sphereStaticTexture = new THREE.Mesh(sphereGe, sphereMaterial);

  return sphereStaticTexture;
}
