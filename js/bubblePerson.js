import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { detectPoses } from './bodyDetection.js';
import Bubble from './Bubble.js';
import { getScene } from './cinematography.js';
import { getParameters } from './parameters.js';
import { applyWorldBody, createBody, getWorld } from './physics.js';
import {
  disposeGroup,
  disposeMesh,
  getAverage,
  getObjectX,
  getObjectY,
  getRandomFloat,
  getRandomInt,
  getVectorsRadiansAngle,
} from './utils.js';

export const BUBBLE_BODY_MATERIAL = new CANNON.Material('bubbleMaterial');

let BUBBLE_STICK_FIGURE;

const BUBBLE_HEAD_SPHERES = 50;

export async function renderBubbleStickFigure() {
  const { poses, posesLost, posesFound } = await detectPoses();

  if (posesLost) {
    disposeBubbleStickFigure();
  } else if (posesFound) {
    createBubbleStickFigure();
  }

  if (!poses.length) {
    return;
  }

  renderPose(poses[0]);
}

function renderPose(pose) {
  if (!pose.keypoints) {
    return;
  }

  drawBubbleStickFigure({ pose });
}

function drawBubbleStickFigure({ pose }) {
  const { keypoints } = pose;

  const extraKeypoints = createExtraKeypoints(keypoints);
  const allKeypoints = [...keypoints, ...extraKeypoints];

  drawBubbleHead({ keypoints: allKeypoints });
  drawBubbleBody({ keypoints: allKeypoints });
  alignBubbleFigurePhysicalBody();
}

function createBubbleStickFigure() {
  BUBBLE_STICK_FIGURE = new THREE.Group();
  BUBBLE_STICK_FIGURE.name = 'FIGURE';
  BUBBLE_STICK_FIGURE.add(createBubbleHead());
  BUBBLE_STICK_FIGURE.add(createBubbleBody());
  getScene().add(BUBBLE_STICK_FIGURE);
}

function disposeBubbleStickFigure() {
  if (!BUBBLE_STICK_FIGURE) {
    return;
  }

  getScene().remove(BUBBLE_STICK_FIGURE);
  disposeGroup(BUBBLE_STICK_FIGURE, (mesh) => {
    if (!mesh.userData?.body) {
      return;
    }

    getWorld().removeBody(mesh.userData.body);
  });

  BUBBLE_STICK_FIGURE = null;
}

function createBubbleHead(radius = 1.2, numSpheres = BUBBLE_HEAD_SPHERES) {
  const group = new THREE.Group();
  group.name = 'HEAD';
  const headSphere = createHeadSphere({ radius });

  group.visible = false;

  for (let i = 0; i < numSpheres; i++) {
    const randomRadius = getRandomFloat(0.1, 0.4);

    const bubble = Bubble({ radius: randomRadius, offset: 0 });
    const angle1 = getRandomInt(0, 50);
    const angle2 = getRandomInt(0, 50);

    const x = radius * Math.sin(angle1) * Math.cos(angle2);
    const y = radius * Math.sin(angle1) * Math.sin(angle2);
    const z = radius * getRandomFloat(0, 0.5);

    bubble.position.set(x, y, z);
    bubble.userData.body = createBody(bubble, 0, BUBBLE_BODY_MATERIAL);

    headSphere.add(bubble);
  }

  group.add(headSphere);
  return group;
}

function createHeadSphere({ radius = 1.2, x = 16, y = 16 }) {
  const sphereGeometry = new THREE.SphereGeometry(radius, x, y);
  const sphereMaterial = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 });
  return new THREE.Mesh(sphereGeometry, sphereMaterial);
}

function createBubbleBody() {
  const body = new THREE.Group();
  body.name = 'BODY';
  body.add(createBubbleTorso());
  body.add(createLimbs());

  return body;
}

function createBubbleTorso() {
  const {
    torsoThickRadius,
    torsoThickCount,
    torsoOffsetPercentage,
    torsoMediumRadius,
    torsoMediumCount,
    torsoSmallRadius,
    torsoSmallCount,
  } = getParameters();

  const startKeypointName = 'neck';
  const endKeypointName = 'stomach';

  const thickBubbles = createBubblesGroup(torsoThickRadius, torsoThickCount, torsoOffsetPercentage);
  thickBubbles.userData.startKeypointName = startKeypointName;
  thickBubbles.userData.endKeypointName = endKeypointName;

  const middleBubbles = createBubblesGroup(torsoMediumRadius, torsoMediumCount, torsoOffsetPercentage);
  middleBubbles.userData.startKeypointName = startKeypointName;
  middleBubbles.userData.endKeypointName = endKeypointName;

  const smallBubbles = createBubblesGroup(torsoSmallRadius, torsoSmallCount, torsoOffsetPercentage);
  smallBubbles.userData.startKeypointName = startKeypointName;
  smallBubbles.userData.endKeypointName = endKeypointName;

  const torso = new THREE.Group();
  torso.name = 'TORSO';
  torso.add(thickBubbles);
  torso.add(middleBubbles);
  torso.add(smallBubbles);

  return torso;
}

function createLimbs() {
  const LINES_KEYPOINTS = [
    ['left_elbow', 'left_shoulder'],
    ['left_wrist', 'left_elbow'],
    ['stomach', 'left_knee'],
    ['neck', 'right_shoulder'],
    ['right_elbow', 'right_wrist'],
    ['stomach', 'right_knee'],
    ['left_knee', 'left_foot_index'],
    ['right_knee', 'right_foot_index'],
    ['right_shoulder', 'right_elbow'],
    ['left_shoulder', 'neck'],
  ];

  const {
    limbsThickRadius,
    limbsThickCount,
    limbsOffsetPercentage,
    limbsMediumRadius,
    limbsMediumCount,
    limbsSmallRadius,
    limbsSmallCount,
  } = getParameters();

  const thickBubbles = new THREE.Group();
  const middleBubbles = new THREE.Group();
  const smallBubbles = new THREE.Group();

  for (let [startKeypointName, endKeypointName] of LINES_KEYPOINTS) {
    const thick = createBubblesGroup(limbsThickRadius, limbsThickCount, limbsOffsetPercentage);
    thick.userData.startKeypointName = startKeypointName;
    thick.userData.endKeypointName = endKeypointName;
    thickBubbles.add(thick);

    const middle = createBubblesGroup(limbsMediumRadius, limbsMediumCount, limbsOffsetPercentage);
    middle.userData.startKeypointName = startKeypointName;
    middle.userData.endKeypointName = endKeypointName;
    middleBubbles.add(middle);

    const small = createBubblesGroup(limbsSmallRadius, limbsSmallCount, limbsOffsetPercentage);
    small.userData.startKeypointName = startKeypointName;
    small.userData.endKeypointName = endKeypointName;
    smallBubbles.add(middle);
  }

  const limbs = new THREE.Group();
  limbs.add(thickBubbles);
  limbs.add(middleBubbles);
  limbs.add(smallBubbles);
  limbs.name = 'LIMBS';

  return limbs;
}

function createBubblesGroup(radius = 0.2, numberOfBubbles = 5, offset = 0) {
  const group = new THREE.Group();
  group.visible = false;

  for (let i = 0; i < numberOfBubbles; i++) {
    const x = i * radius * 2;
    const bubble = Bubble({ x, radius, offset });
    bubble.userData.body = createBody(bubble, 0, BUBBLE_BODY_MATERIAL);
    group.add(bubble);
  }

  return group;
}

function createKeypointsMap(keypoints) {
  const keypointsMap = new Map();

  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    keypointsMap.set(keypoint.name, keypoint);
  }

  addExtraKeypointsToMap(keypointsMap);

  return keypointsMap;
}

function addExtraKeypointsToMap(keypointsMap) {
  const neck = createAverageKeypoint({
    keypointsMap,
    name: 'neck',
    startKeypointName: 'left_shoulder',
    endKeypointName: 'right_shoulder',
  });
  keypointsMap.set(neck.name, neck);

  const stomach = createAverageKeypoint({
    keypointsMap,
    name: 'stomach',
    startKeypointName: 'left_hip',
    endKeypointName: 'right_hip',
  });
  keypointsMap.set(stomach.name, stomach);
}

function createAverageKeypoint({ name, keypointsMap, startKeypointName, endKeypointName }) {
  const startKeypoint = keypointsMap.get(startKeypointName);
  const endKeypoint = keypointsMap.get(endKeypointName);

  const x = getAverage(startKeypoint.x, endKeypoint.x);
  const y = getAverage(startKeypoint.y, endKeypoint.y);
  const z = getAverage(startKeypoint.z, endKeypoint.z);
  const score = getAverage(startKeypoint.score, endKeypoint.score);

  return { name, x, y, z, score };
}

function drawBubbleHead(keypointsMap) {
  const HEAD = BUBBLE_STICK_FIGURE.getObjectByName('HEAD');

  const leftOuterEyeVector = createVectorByKeypointName(keypointsMap, 'left_eye_outer');
  const rightOuterEyeVector = createVectorByKeypointName(keypointsMap, 'right_eye_outer');
  const neckVector = createVectorByKeypointName(keypointsMap, 'neck');

  if (!(leftOuterEyeVector && rightOuterEyeVector && neckVector)) {
    HEAD.visible = false;
    return;
  }

  const headGroup = HEAD.children[0];
  const sphereRadius = headGroup.geometry.parameters.radius;

  HEAD.position.set(leftOuterEyeVector.x, neckVector.y + sphereRadius * 2);

  const angle = getVectorsRadiansAngle(leftOuterEyeVector, rightOuterEyeVector);
  for (let i = 0; i < headGroup.children.length; i++) {
    const bubble = headGroup.children[i];
    bubble.rotation.z = bubble.userData.rotation.z + angle;
  }

  HEAD.visible = true;
}

function createVectorByKeypointName(keypointsMap, name) {
  const keypoint = keypointsMap.get(name);
  if (!keypoint) {
    return null;
  }

  return createVectorByKeypoint(keypoint);
}

function drawBubbleBody(keypointsMap) {
  const BODY = BUBBLE_STICK_FIGURE.getObjectByName('BODY');

  BODY.traverse((entry) => {
    if (entry.type === 'Group') {
      drawBubbleLine(keypointsMap, entry);
    }
  });
}

function drawBubbleLine(keypointsMap, group) {
  const { userData } = group;
  const { startKeypointName, endKeypointName } = userData;

  // since the entire body is traversed, some groups don't need to be drawn
  if (!startKeypointName || !endKeypointName) {
    return;
  }

  const startVector = createVectorByKeypointName(keypointsMap, userData.startKeypointName);
  const endVector = createVectorByKeypointName(keypointsMap, userData.endKeypointName);

  if (!startVector || !endVector) {
    group.visible = false;
    return;
  }

  const direction = endVector.clone().sub(startVector);
  const angle = getVectorsRadiansAngle(endVector, startVector);

  for (let i = 0; i < group.children.length; i++) {
    const bubble = group.children[i];

    const scalar = i / group.children.length;
    const position = startVector.clone().add(direction.clone().multiplyScalar(scalar));
    position.add(bubble.userData.offset);
    bubble.position.copy(position);
    bubble.rotation.z = bubble.userData.rotation.z + angle;
  }

  group.visible = true;
}

function createVectorByKeypoint(keypoint) {
  const objectX = getObjectX(keypoint.x);
  const objectY = getObjectY(keypoint.y);
  return new THREE.Vector3(objectX, objectY, 0);
}

function findKeypointByName({ name, keypoints }) {
  return keypoints.find((keypoint) => keypoint.name === name);
}

function createAverageKeypoint({ name, keypoints, startKeypointName, endKeypointName }) {
  const startKeypoint = findKeypointByName({ keypoints, name: startKeypointName });
  const endKeypoint = findKeypointByName({ keypoints, name: endKeypointName });

  const x = getAverage([startKeypoint.x, endKeypoint.x]);
  const y = getAverage([startKeypoint.y, endKeypoint.y]);
  const z = getAverage([startKeypoint.z, endKeypoint.z]);
  const score = getAverage([startKeypoint.score, endKeypoint.score]);

  return { name, x, y, z, score };
}

function createExtraKeypoints(keypoints) {
  const neck = createAverageKeypoint({
    keypoints,
    name: 'neck',
    startKeypointName: 'left_shoulder',
    endKeypointName: 'right_shoulder',
  });
  const stomach = createAverageKeypoint({
    keypoints,
    name: 'stomach',
    startKeypointName: 'left_hip',
    endKeypointName: 'right_hip',
  });
  return [neck, stomach];
}

function alignBubbleFigurePhysicalBody() {
  BUBBLE_STICK_FIGURE.traverse((obj) => {
    if (obj.type === 'Mesh') {
      alignMeshPhysicalBodyTrajectory(obj);
      alignMeshPhysicalBodyVisibility(obj);
    }
  });
}

function alignMeshPhysicalBodyTrajectory(entry) {
  const body = entry?.userData?.body;
  if (!body) {
    return;
  }

  let target = new THREE.Vector3();
  entry.getWorldPosition(target);
  target.z = 0;

  body.position.copy(target);
  body.quaternion.copy(entry.quaternion);
}

function alignMeshPhysicalBodyVisibility(entry) {
  const body = entry?.userData?.body;
  if (!body) {
    return;
  }

  const isMeshVisible = !!entry.visible && (!entry.parent || !!entry.parent.visible);
  const isBodyInWorld = entry.userData?.bodyInWorld;
  const includeInWorld = isMeshVisible && !isBodyInWorld;

  applyWorldBody(body, includeInWorld);
  entry.userData.bodyInWorld = includeInWorld;
}
