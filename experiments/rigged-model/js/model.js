import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// source: ChatGPT
export function createRiggedHuman() {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load('../assets/body-rigged.glb', (gltf) => {
      const model = gltf.scene;

      const material = new THREE.MeshNormalMaterial();
      model.traverse((node) => {
        if (node.isMesh) node.material = material;
      });

      model.position.set(0, -3, 0);

      resolve(model);
      }, undefined, (error) => {
      reject(error);
    });
  });
}

/**
 * Get vector of keypoint 1
 * Get vector of keypoint 2
 * calculate angle in radians using vector1.angleTo(vector2)
 * apply it to bone.x
 * const axis = new THREE.Vector3().crossVectors(vector1, vector2).normalize();
 * vector3.applyAxisAngle(axis, angleRadians);
 */
