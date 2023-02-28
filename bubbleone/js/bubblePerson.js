import * as THREE from 'three';

import Bubble from './Bubble.js'
import { POSE_KEYPOINT_NAMES } from './bodyDetection.js'
import { getObjectX, getObjectY, getRadiansAngle } from './utils.js'

export function createPoseBubblesMap() {
  const map = new Map();

  POSE_KEYPOINT_NAMES.forEach((keypoint) => {
    const bubble = Bubble({ radius: 0.2 });
    bubble.visible = false;
    map.set(keypoint, bubble);
  });

  return map;
}

function hidePoseBubbles(poseBubblesMap) {
  poseBubblesMap.forEach((bubble) => bubble.visible = false)
}

const NUMBER_OF_SHOULDER_BUBBLES = 20;

export function createShouldersGroup() {
  const shoulders = new THREE.Group()

  for (let i = 0; i < NUMBER_OF_SHOULDER_BUBBLES; i++) {
    const x = i * 0.5;
    const bubble = Bubble({ x, radius: 0.2 })
    shoulders.add(bubble)
  }

  return shoulders;
}



function drawShoulders({ keypoints, shouldersGroup, videoWidth, videoHeight, visibleHeight, visibleWidth}) {
  const leftShoulder = keypoints.find((keypoint) => keypoint.name === "left_shoulder");
  const rightShoulder = keypoints.find((keypoint) => keypoint.name === "right_shoulder");

  if (!leftShoulder && rightShoulder) {
    return;
  }

  const leftX = getObjectX(leftShoulder.x, videoWidth, visibleWidth)
  const leftY = getObjectY(leftShoulder.y, videoHeight, visibleHeight)
  const rightX = getObjectX(rightShoulder.x, videoWidth, visibleWidth)
  const rightY = getObjectY(rightShoulder.y, videoHeight, visibleHeight)

  const startSpherePos = new THREE.Vector3(leftX, leftY, 0);
  const endSpherePos = new THREE.Vector3(rightX, rightY, 0);
  const direction = endSpherePos.clone().sub(startSpherePos);

  for (let i = 0; i < NUMBER_OF_SHOULDER_BUBBLES; i++) {
    const t = i / (NUMBER_OF_SHOULDER_BUBBLES);
    const position = startSpherePos.clone().add(direction.clone().multiplyScalar(t));
    const bubble = shouldersGroup.children[i]
    bubble.position.copy(position);
  }

}

const SCORE_THRESHOLD = 0.85;

export function drawPoseBubbles({ pose, poseBubblesMap, shouldersGroup, videoWidth, videoHeight, visibleWidth, visibleHeight }) {
  hidePoseBubbles(poseBubblesMap);

  const { keypoints } = pose;

  drawShoulders({ keypoints, shouldersGroup, videoWidth, videoHeight, visibleHeight, visibleWidth});

  for (let i = 0; i < keypoints.length; i++) {
    const { score, name, x, y } = keypoints[i];

    if (score < SCORE_THRESHOLD) {
      continue;
    }

    const bubble = poseBubblesMap.get(name)
    const objectX = getObjectX(x, videoWidth, visibleWidth)
    const objectY = getObjectY(y, videoHeight, visibleHeight)
    bubble.position.set(objectX, objectY)
    bubble.visible = true
  }
}
