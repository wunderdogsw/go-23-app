import * as THREE from 'three';

import Bubble from './Bubble.js'
import { getAverage, getObjectX, getObjectY } from './utils.js'

const SCORE_THRESHOLD = 0.85;

// one sphere is used for the nose
const BUBBLE_HEAD_OUTLINE_SPHERES = 6;

export let bubbleStickFigure = {
  head: createBubbleHead(),
  body: createBubbleBody()
};

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


export function createBubbleHead(radius = 0.2, numSpheres = BUBBLE_HEAD_OUTLINE_SPHERES + 1) {
  const group = new THREE.Group();
  group.visible = false;

  for (let i = 0; i < numSpheres; i++) {
    const sphere = Bubble({ radius });
    group.add(sphere);
  }

  return group;
}

export function createBubbleBody() {
  const LINES_KEYPOINTS = [
    [ "neck", "stomach" ],
    [ "left_elbow", "neck" ],
    [ "left_wrist", "left_elbow" ],
    [ "stomach", "left_foot_index" ],
    [ "neck", "right_elbow" ],
    [ "right_elbow", "right_wrist" ],
    [ "stomach", "right_foot_index" ],
  ]

  return LINES_KEYPOINTS.map(([startKeypointName, endKeypointName]) => ({
    startKeypointName,
    endKeypointName,
    group: createBubblesGroup()
  }) )
}

function drawEllipse(group, radiusX, radiusY) {
  const offsetAngle = THREE.MathUtils.degToRad(30);

  // source: ChatGPT
  for (let i = 0; i < BUBBLE_HEAD_OUTLINE_SPHERES; i++) {
    const angle = offsetAngle + i / BUBBLE_HEAD_OUTLINE_SPHERES * Math.PI * 2;
    const x = Math.cos(angle) * radiusX;
    const y = Math.sin(angle) * radiusY;
    const sphere = group.children[i]
    sphere.position.set(x, y, 0);
  }
}

function findKeypointByName(name) {
  return (keypoint) => keypoint.name === name
}

function createVectorByKeypoint(keypoint) {
  const objectX = getObjectX(keypoint.x)
  const objectY = getObjectY(keypoint.y)
  return new THREE.Vector3(objectX, objectY, 0);
}

function createVectorByKeypointName({ keypoints, name }) {
  const keypoint = keypoints.find(findKeypointByName(name));
  if (! keypoint ) {
    return null;
  }

  return createVectorByKeypoint(keypoint)
}

const HUMAN_HEAD_RATIO = 5/4;

function drawBubbleHead({ keypoints }) {
  const { head } = bubbleStickFigure;
  head.visible = false

  const leftOuterEyeVector = createVectorByKeypointName({ keypoints, name: "left_eye_outer" });
  const rightOuterEyeVector = createVectorByKeypointName({ keypoints, name: "right_eye_outer" });
  const leftShoulderVector = createVectorByKeypointName({ keypoints, name: "left_shoulder" });

  if (! (leftOuterEyeVector || rightOuterEyeVector || leftShoulderVector) ) {
    head.visible = false
    return;
  }

  const radiusX = Math.abs(rightOuterEyeVector.x - leftOuterEyeVector.x);
  const radiusY = radiusX * HUMAN_HEAD_RATIO;
  drawEllipse(head, radiusX, radiusY);

  const sphereRadius = head.children[0].geometry.parameters.radius
  const deltaEarToShoulder = leftOuterEyeVector.y - leftShoulderVector.y
  const deltaY = deltaEarToShoulder - radiusY - sphereRadius

  head.position.set(leftOuterEyeVector.x, leftOuterEyeVector.y - deltaY);
  head.visible = true;
}


function drawBubbleLine({ startKeypointName, endKeypointName, keypoints, group }) {
  const startVector = createVectorByKeypointName({ keypoints, name: startKeypointName });
  const endVector = createVectorByKeypointName({ keypoints, name: endKeypointName});

  if (! (startVector || endVector) ) {
    group.visible = false
    return;
  }

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

function drawBubbleBody({ keypoints }) {
  const extraKeypoints = createExtraKeypoints(keypoints);
  const allKeypoints = [ ...keypoints, ...extraKeypoints ];
  const { body } = bubbleStickFigure;

  for (let i = 0; i < body.length; i++) {
    const { group, startKeypointName, endKeypointName } = body[i];
    group.visible = false;
    drawBubbleLine({ startKeypointName, endKeypointName, group, keypoints: allKeypoints });
  }
}

export function drawBubbleStickFigure({ pose }) {
  const { keypoints } = pose;
  drawBubbleHead({ keypoints });
  drawBubbleBody({ keypoints })
}
