import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getObjectX, getObjectY } from './utils.js'

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

function createVectorFromKeypoint({ keypoint, videoWidth, visibleWidth, videoHeight, visibleHeight }) {
  const objectX = getObjectX(keypoint.x, videoWidth, visibleWidth);
  const objectY = getObjectY(keypoint.y, videoHeight, visibleHeight);
  return new THREE.Vector3(objectX, objectY, 0);
}

const UPPER_ARM_L_INITIAL_ROTATION = -2.529298347216854
const UPPER_ARM_L_ROTATION_COMPENSATION = THREE.MathUtils.degToRad(-60)
export function updateRiggedHuman({ model, pose, videoWidth, videoHeight, visibleHeight, visibleWidth }) {
  const { keypoints } = pose;
  const leftShoulderKeypoint = keypoints.find(({name}) => name === "left_shoulder");
  const leftElbowKeypoint = keypoints.find(({name}) => name === "left_elbow");

  const leftShoulderVector = createVectorFromKeypoint({ keypoint: leftShoulderKeypoint, videoWidth, videoHeight, visibleWidth, visibleHeight});
  const leftElbowVector = createVectorFromKeypoint({ keypoint: leftElbowKeypoint, videoWidth, videoHeight, visibleWidth, visibleHeight});
  const angleRadians = Math.atan2(leftShoulderVector.y - leftElbowVector.y, leftShoulderVector.x - leftElbowVector.x)

  const skinnedMesh = model.children[1].children.find(child => child.isSkinnedMesh);
  const upperArmL = skinnedMesh.skeleton.bones.find((bone) => bone.name === "upper_armL");
  upperArmL.rotation.x =  UPPER_ARM_L_INITIAL_ROTATION - angleRadians - UPPER_ARM_L_ROTATION_COMPENSATION;
}
