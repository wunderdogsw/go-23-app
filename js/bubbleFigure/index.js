import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { detectPoses } from '../bodyDetection.js';
import { getScene } from '../cinematography.js';
import { getParameters } from '../parameters.js';
import { createBody, getWorld } from '../physics.js';
import { createBubble } from '../shapes/basic.js';
import { getRandomFloat, getRandomInt } from '../utils/maths.js';
import { disposeGroup } from '../utils/three.js';
import { drawBubbleStickFigurePose } from './drawPose.js';
import { createPoseKeypointsMap, createVectorByKeypointName } from './keypoints.js';
import { alignGroupPhysicalBody } from './physicalBody.js';

export const BUBBLE_BODY_MATERIAL = new CANNON.Material('bubbleMaterial');

const BUBBLE_HEAD_SPHERES = 50;

let bubbleFigure;

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

  drawBubbleStickFigurePose({ figure: bubbleFigure, pose: poses[0] });
}

export function createBubbleStickFigure() {
  bubbleFigure = new THREE.Group();
  const head = createBubbleHead();
  const body = createBubbleBody();

  bubbleFigure.name = 'FIGURE';
  bubbleFigure.add(head);
  bubbleFigure.add(body);

  getScene().add(bubbleFigure);
}

export function disposeBubbleStickFigure() {
  if (!bubbleFigure) {
    return;
  }

  getScene().remove(bubbleFigure);
  disposeGroup(bubbleFigure, (mesh) => {
    if (!mesh.userData?.body) {
      return;
    }

    getWorld().removeBody(mesh.userData.body);
  });

  bubbleFigure = null;
}

function createBubbleHead(radius = 1.2, numSpheres = BUBBLE_HEAD_SPHERES) {
  const group = new THREE.Group();
  group.name = 'HEAD';
  const headSphere = createHeadSphere({ radius });

  group.visible = false;

  for (let i = 0; i < numSpheres; i++) {
    const bubble = createHeadBubble(radius);

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

function createHeadBubble(radius) {
  const randomRadius = getRandomFloat(0.1, 0.4);

  const bubble = createBubble({ radius: randomRadius, offset: 0 });
  const angle1 = getRandomInt(0, 50);
  const angle2 = getRandomInt(0, 50);

  const x = radius * Math.sin(angle1) * Math.cos(angle2);
  const y = radius * Math.sin(angle1) * Math.sin(angle2);
  const z = radius * getRandomFloat(0, 0.5);

  bubble.position.set(x, y, z);
  bubble.userData.body = createBody(bubble, 0, BUBBLE_BODY_MATERIAL);

  return bubble;
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
    const bubble = createBubble({ x, radius, offset });
    bubble.userData.body = createBody(bubble, 0, BUBBLE_BODY_MATERIAL);
    group.add(bubble);
  }

  return group;
}
