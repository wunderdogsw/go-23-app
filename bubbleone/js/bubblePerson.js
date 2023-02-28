import * as THREE from 'three';

import Bubble from './Bubble.js'
import { getObjectX, getObjectY } from './utils.js'

const SCORE_THRESHOLD = 0.85;

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

function createBubblesAround(radius, number, distance) {
  const bubbles = [];
  const bubbleDegrees = 360 / number;

  for (let i = 0; i < number; i++) {
    const bubble = Bubble({ radius });
    const radians = THREE.MathUtils.degToRad(bubbleDegrees * i);
    const euler = new THREE.Euler( 0, 0, radians);
    const vector = new THREE.Vector3(radius * distance, 0, 0).applyEuler(euler);
    bubble.position.copy(vector);

    bubbles.push(bubble);
  }

  return bubbles;
}

export function createBubbleHead(radius = 0.2) {
  const group = new THREE.Group();
  group.visible = false;

  const nose = Bubble({ radius })
  group.add(nose);

  const bubblesAround1 = createBubblesAround(radius, 6, 2);
  const bubblesAround2 = createBubblesAround(radius, 12, 4);

  bubblesAround1.forEach((bubble) => group.add(bubble))
  bubblesAround2.forEach((bubble) => group.add(bubble))

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

function drawBubbleHead({ bubbleHead, keypoints, videoWidth, videoHeight, visibleHeight, visibleWidth }) {
  const noseKeypoint = keypoints.find(findKeypointByName("nose"));
  const noseVector = createVectorFromKeypoint({ keypoint: noseKeypoint, visibleWidth, visibleHeight, videoWidth, videoHeight});
  bubbleHead.position.copy(noseVector);
  bubbleHead.visible = true;
}


function drawBubbleLine({ startKeypointName, endKeypointName, keypoints, group, videoWidth, videoHeight, visibleWidth, visibleHeight }) {
  const startKeypoint = keypoints.find(findKeypointByName(startKeypointName));
  const endKeypoint = keypoints.find(findKeypointByName(endKeypointName));

  if (! (startKeypoint?.score >= SCORE_THRESHOLD || endKeypoint?.score >= SCORE_THRESHOLD) ) {
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
