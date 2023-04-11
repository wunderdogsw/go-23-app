import * as THREE from 'three';

import { getParameters } from '../parameters.js';
import { createBody } from '../physics.js';
import { createBubble } from '../shapes/basic.js';
import { BUBBLE_BODY_MATERIAL } from './physicalBody.js';

export function createBubbleBody() {
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
