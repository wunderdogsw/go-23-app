import * as THREE from 'three';

import Bubble from './Bubble.js'
import { getObjectX, getObjectY } from './utils.js'
import { POSE_KEYPOINT_NAMES } from './bodyDetection.js'

const SCORE_THRESHOLD = 0.85;

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

export function drawPoseBubbles({ pose, poseBubblesMap, videoWidth, videoHeight, visibleWidth, visibleHeight }) {
  hidePoseBubbles(poseBubblesMap);

  const { keypoints } = pose;

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


function createBubblesGroup(radius = 0.2, numberOfBubbles = 10) {
  const group = new THREE.Group();
  group.visible = false;

  for (let i = 0; i < numberOfBubbles; i++) {
    const x = i * radius * 2;
    const bubble = Bubble({ x, radius });
    group.add(bubble);
  }

  return group;
}

function drawEllipse(group, radiusX, radiusY) {
  // source: ChatGPT
  for (let i = 0; i < group.children.length; i++) {
    const angle = i / group.children.length * Math.PI * 2;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    const sphere = group.children[i]
    sphere.position.set(x, y, 0);
  }
}

export function createBubbleHead(radius = 0.2, numSpheres = 20) {
  const group = new THREE.Group();
  group.visible = false;

  for (let i = 0; i < numSpheres; i++) {
    const sphere = Bubble({ radius });
    group.add(sphere);
  }

  return group;
}

const LINES_KEYPOINTS = [
  [ "left_shoulder", "right_shoulder" ],
  [ "left_hip", "right_hip" ],
  [ "left_elbow", "left_shoulder" ],
  [ "left_wrist", "left_elbow" ],
  [ "left_index", "left_wrist" ],
  [ "left_shoulder", "left_hip" ],
  [ "left_hip", "left_knee" ],
  [ "left_knee", "left_ankle" ],
  [ "left_ankle", "left_heel" ],
  [ "left_heel", "left_foot_index" ],
  [ "right_shoulder", "right_elbow" ],
  [ "right_elbow", "right_wrist" ],
  [ "right_wrist", "right_index" ],
  [ "right_shoulder", "right_hip" ],
  [ "right_hip", "right_knee" ],
  [ "right_knee", "right_ankle" ],
  [ "right_ankle", "right_heel" ],
  [ "right_heel", "right_foot_index" ],
]

export function createBubbleLines() {
  return LINES_KEYPOINTS.map(([startKeypointName, endKeypointName]) => ({
    startKeypointName,
    endKeypointName,
    group: createBubblesGroup()
  }) )
}

function findKeypointByName(name) {
  return (keypoint) => keypoint.name === name
}

function createVectorFromKeypoint({ keypoint, videoWidth, visibleWidth, videoHeight, visibleHeight }) {
  const objectX = getObjectX(keypoint.x, videoWidth, visibleWidth)
  const objectY = getObjectY(keypoint.y, videoHeight, visibleHeight)
  return new THREE.Vector3(objectX, objectY, 0);
}

const HUMAN_HEAD_RATIO = 5/4;

function drawBubbleHead({ bubbleHead, keypoints, videoWidth, videoHeight, visibleHeight, visibleWidth }) {
  const leftOuterEyeKeypoint = keypoints.find(findKeypointByName("left_eye_outer"));
  const rightOuterEyeKeypoint = keypoints.find(findKeypointByName("right_eye_outer"));
  const leftShoulderKeypoint = keypoints.find(findKeypointByName("left_shoulder"));

  if (! (leftOuterEyeKeypoint || rightOuterEyeKeypoint || leftShoulderKeypoint) ) {
    bubbleHead.visible = false
    return;
  }

  const leftOuterEyeVector = createVectorFromKeypoint({ keypoint: leftOuterEyeKeypoint, videoWidth, visibleWidth, videoHeight, visibleHeight });
  const rightOuterEyeVector = createVectorFromKeypoint({ keypoint: rightOuterEyeKeypoint, videoWidth, visibleWidth, videoHeight, visibleHeight });
  const leftShoulderVector = createVectorFromKeypoint({ keypoint: leftShoulderKeypoint, videoWidth, visibleWidth, videoHeight, visibleHeight });

  const radiusX = Math.abs(rightOuterEyeVector.x - leftOuterEyeVector.x);
  const radiusY = radiusX * HUMAN_HEAD_RATIO;
  drawEllipse(bubbleHead, radiusX, radiusY);

  const sphereRadius = bubbleHead.children[0].geometry.parameters.radius
  const deltaEarToShoulder = leftOuterEyeVector.y - leftShoulderVector.y
  const deltaY = deltaEarToShoulder - radiusY - sphereRadius

  bubbleHead.position.set(leftOuterEyeVector.x, leftOuterEyeVector.y - deltaY);
  bubbleHead.visible = true;
}


function drawBubbleLine({ startKeypointName, endKeypointName, keypoints, group, videoWidth, videoHeight, visibleWidth, visibleHeight }) {
  const startKeypoint = keypoints.find(findKeypointByName(startKeypointName));
  const endKeypoint = keypoints.find(findKeypointByName(endKeypointName));

  if (! (startKeypoint || endKeypoint) ) {
    group.visible = false
    return;
  }

  const startVector = createVectorFromKeypoint({ keypoint: startKeypoint, videoWidth, visibleWidth, videoHeight, visibleHeight });
  const endVector = createVectorFromKeypoint({ keypoint: endKeypoint, videoWidth, visibleWidth, videoHeight, visibleHeight });
  const direction = endVector.clone().sub(startVector);

  for (let i = 0; i < group.children.length; i++) {
    const t = i / (group.children.length);
    const position = startVector.clone().add(direction.clone().multiplyScalar(t));
    const object = group.children[i]
    object.position.copy(position);
  }

  group.visible = true
}

export function drawBubblesStickPerson({ pose, bubbleHead, bubbleLines, videoWidth, videoHeight, visibleWidth, visibleHeight }) {
  bubbleLines.forEach(({ group }) => group.visible = false)
  bubbleHead.visible = false

  const { keypoints } = pose;

  drawBubbleHead({ bubbleHead, keypoints, videoWidth, videoHeight, visibleHeight, visibleWidth});

  for (let i = 0; i < bubbleLines.length; i++) {
    const { group, startKeypointName, endKeypointName } = bubbleLines[i];
    drawBubbleLine({ startKeypointName, endKeypointName, group, keypoints, videoWidth, videoHeight, visibleHeight, visibleWidth});
  }
}
