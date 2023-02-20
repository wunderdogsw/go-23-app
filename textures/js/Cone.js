import * as THREE from 'three';

export default function coneStatic(texture) {
  const coneGe = new THREE.ConeGeometry(0.8, 2, 32);
  const coneMaterial = new THREE.MeshStandardMaterial({
    //color: '#433F81',
    map: texture,
  });
  const cone = new THREE.Mesh(coneGe, coneMaterial);
  return cone;
}
