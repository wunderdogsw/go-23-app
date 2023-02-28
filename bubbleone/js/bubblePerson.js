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

const HEAD_BUBBLES_NUMBER = 6;

export function createBubbleHead(radius = 0.2) {
  const group = new THREE.Group();
  group.visible = false;

  const nose = Bubble({ radius })
  group.add(nose);

  const bubbleDegrees = 360 / HEAD_BUBBLES_NUMBER;

  for (let i = 0; i < HEAD_BUBBLES_NUMBER; i++) {
    const bubble = Bubble({ radius });
    const radians = THREE.MathUtils.degToRad(bubbleDegrees * i);
    const euler = new THREE.Euler( 0, 0, radians);
    const vector = new THREE.Vector3(radius * 2, 0, 0).applyEuler(euler);
    bubble.position.copy(vector);
    group.add(bubble);
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

function drawBubbleHead({ bubbleHead, keypoints, videoWidth, videoHeight, visibleHeight, visibleWidth }) {
  const { x, y } = keypoints.find(findKeypointByName("nose"));
  const objectX = getObjectX(x, videoWidth, visibleWidth);
  const objectY = getObjectY(y, videoHeight, visibleHeight);

  bubbleHead.position.set(objectX, objectY);
  bubbleHead.visible = true;
}

function drawBubbleLine({ startKeypointName, endKeypointName, keypoints, group, videoWidth, videoHeight, visibleWidth, visibleHeight }) {
  const startKeypoint = keypoints.find(findKeypointByName(startKeypointName));
  const endKeypoint = keypoints.find(findKeypointByName(endKeypointName));

  if (! (startKeypoint?.score >= SCORE_THRESHOLD || endKeypoint?.score >= SCORE_THRESHOLD) ) {
    group.visible = false
    return;
  }

  const startX = getObjectX(startKeypoint.x, videoWidth, visibleWidth)
  const startY = getObjectY(startKeypoint.y, videoHeight, visibleHeight)
  const endX = getObjectX(endKeypoint.x, videoWidth, visibleWidth)
  const endY = getObjectY(endKeypoint.y, videoHeight, visibleHeight)

  const startPos = new THREE.Vector3(startX, startY, 0);
  const endPos = new THREE.Vector3(endX, endY, 0);
  const direction = endPos.clone().sub(startPos);

  for (let i = 0; i < group.children.length; i++) {
    const t = i / (group.children.length);
    const position = startPos.clone().add(direction.clone().multiplyScalar(t));
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
