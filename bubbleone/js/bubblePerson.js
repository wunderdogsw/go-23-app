import * as THREE from 'three';

import Bubble from './Bubble.js'
import { getAverage, getObjectX, getObjectY } from './utils.js'
import { POSE_KEYPOINT_NAMES } from './bodyDetection.js'

const SCORE_THRESHOLD = 0.85;

export function createPoseBubblesMap() {
  const map = new Map();

  POSE_KEYPOINT_NAMES.forEach((keypoint) => {
    const bubble = Bubble();
    bubble.visible = false;
    map.set(keypoint, bubble);
  });

  return map;
}

function hidePoseBubbles(poseBubblesMap) {
  poseBubblesMap.forEach((bubble) => bubble.visible = false)
}

export function drawPoseBubbles(pose, poseBubblesMap) {
  hidePoseBubbles(poseBubblesMap);

  const { keypoints } = pose;

  for (let i = 0; i < keypoints.length; i++) {
    const { score, name, x, y } = keypoints[i];

    if (score < SCORE_THRESHOLD) {
      continue;
    }

    const bubble = poseBubblesMap.get(name)
    const objectX = getObjectX(x)
    const objectY = getObjectY(y)
    bubble.position.set(objectX, objectY)
    bubble.visible = true
  }
}


function createBubblesGroup(radius = 0.2, numberOfBubbles = 5) {
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
  const offsetAngle = THREE.MathUtils.degToRad(30);

  // source: ChatGPT
  for (let i = 0; i < group.children.length; i++) {
    const angle = offsetAngle + i / group.children.length * Math.PI * 2;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    const sphere = group.children[i]
    sphere.position.set(x, y, 0);
  }
}

export function createBubbleHead(radius = 0.2, numSpheres = 6) {
  const group = new THREE.Group();
  group.visible = false;

  for (let i = 0; i < numSpheres; i++) {
    const sphere = Bubble({ radius });
    group.add(sphere);
  }

  return group;
}

const LINES_KEYPOINTS = [
  [ "neck", "stomach" ],
  [ "left_elbow", "neck" ],
  [ "left_wrist", "left_elbow" ],
  [ "stomach", "left_foot_index" ],
  [ "neck", "right_elbow" ],
  [ "right_elbow", "right_wrist" ],
  [ "stomach", "right_foot_index" ],
]

export function createBubbleBody() {
  return LINES_KEYPOINTS.map(([startKeypointName, endKeypointName]) => ({
    startKeypointName,
    endKeypointName,
    group: createBubblesGroup()
  }) )
}

function findKeypointByName(name) {
  return (keypoint) => keypoint.name === name
}

function createVectorFromKeypoint(keypoint) {
  const objectX = getObjectX(keypoint.x)
  const objectY = getObjectY(keypoint.y)
  return new THREE.Vector3(objectX, objectY, 0);
}

const HUMAN_HEAD_RATIO = 5/4;

function drawBubbleHead({ bubbleHead, keypoints }) {
  const leftOuterEyeKeypoint = keypoints.find(findKeypointByName("left_eye_outer"));
  const rightOuterEyeKeypoint = keypoints.find(findKeypointByName("right_eye_outer"));
  const leftShoulderKeypoint = keypoints.find(findKeypointByName("left_shoulder"));

  if (! (leftOuterEyeKeypoint || rightOuterEyeKeypoint || leftShoulderKeypoint) ) {
    bubbleHead.visible = false
    return;
  }

  const leftOuterEyeVector = createVectorFromKeypoint(leftOuterEyeKeypoint);
  const rightOuterEyeVector = createVectorFromKeypoint(rightOuterEyeKeypoint);
  const leftShoulderVector = createVectorFromKeypoint(leftShoulderKeypoint);

  const radiusX = Math.abs(rightOuterEyeVector.x - leftOuterEyeVector.x);
  const radiusY = radiusX * HUMAN_HEAD_RATIO;
  drawEllipse(bubbleHead, radiusX, radiusY);

  const sphereRadius = bubbleHead.children[0].geometry.parameters.radius
  const deltaEarToShoulder = leftOuterEyeVector.y - leftShoulderVector.y
  const deltaY = deltaEarToShoulder - radiusY - sphereRadius

  bubbleHead.position.set(leftOuterEyeVector.x, leftOuterEyeVector.y - deltaY);
  bubbleHead.visible = true;
}


function drawBubbleLine({ startKeypointName, endKeypointName, keypoints, group }) {
  const startKeypoint = keypoints.find(findKeypointByName(startKeypointName));
  const endKeypoint = keypoints.find(findKeypointByName(endKeypointName));

  if (! (startKeypoint || endKeypoint) ) {
    group.visible = false
    return;
  }

  const startVector = createVectorFromKeypoint(startKeypoint);
  const endVector = createVectorFromKeypoint(endKeypoint);
  const direction = endVector.clone().sub(startVector);

  for (let i = 0; i < group.children.length; i++) {
    const t = i / (group.children.length);
    const position = startVector.clone().add(direction.clone().multiplyScalar(t));
    const object = group.children[i]
    object.position.copy(position);
  }

  group.visible = true
}

function createAverageKeypoint({ name, keypoints, startKeypointName, endKeypointName }) {
  const startKeypoint = keypoints.find(findKeypointByName(startKeypointName));
  const endKeypoint = keypoints.find(findKeypointByName(endKeypointName));

  const x = getAverage(startKeypoint.x, endKeypoint.x);
  const y = getAverage(startKeypoint.y, endKeypoint.y);
  const z = getAverage(startKeypoint.z, endKeypoint.z);
  const score = getAverage(startKeypoint.score, endKeypoint.score);

  return { name, x, y, z, score }
}

function createExtraKeypoints(keypoints) {
  const neck = createAverageKeypoint({ keypoints, name: "neck", startKeypointName: "left_shoulder", endKeypointName: "right_shoulder" });
  const stomach = createAverageKeypoint({ keypoints, name: "stomach", startKeypointName: "left_hip", endKeypointName: "right_hip" });
  return [neck, stomach];
}

export function drawBubblesStickPerson({ pose, bubbleHead, bubbleLines }) {
  bubbleLines.forEach(({ group }) => group.visible = false)
  bubbleHead.visible = false

  const { keypoints } = pose;
  const extraKeypoints = createExtraKeypoints(keypoints);
  const allKeypoints = [ ...keypoints, ...extraKeypoints ];

  drawBubbleHead({ bubbleHead, keypoints });

  for (let i = 0; i < bubbleLines.length; i++) {
    const { group, startKeypointName, endKeypointName } = bubbleLines[i];
    drawBubbleLine({ startKeypointName, endKeypointName, group, keypoints: allKeypoints });
  }
}
