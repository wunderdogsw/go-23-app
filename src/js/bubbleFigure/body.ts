import * as THREE from 'three';

import { getParameters } from '../parameters';
import { createBody } from '../physics';
import { createBubble } from '../shapes/basic';
import { BUBBLE_BODY_MATERIAL } from './physicalBody';

export function createBubbleBody(): THREE.Group {
  const body = new THREE.Group();
  body.name = 'BODY';
  body.add(createBubbleTorso());
  body.add(createLimbs());

  return body;
}

function createBubbleTorso(): THREE.Group {
  const {
    torsoThickRadius,
    torsoThickCount,
    torsoOffsetPercentage,
    torsoMediumRadius,
    torsoMediumCount,
    torsoSmallRadius,
    torsoSmallCount,
  } = getParameters();

  const userData = { startKeypointName: 'neck', endKeypointName: 'stomach' };

  const thickBubbles = createBubblesGroup(torsoThickRadius, torsoThickCount, torsoOffsetPercentage, userData);
  const middleBubbles = createBubblesGroup(torsoMediumRadius, torsoMediumCount, torsoOffsetPercentage, userData);
  const smallBubbles = createBubblesGroup(torsoSmallRadius, torsoSmallCount, torsoOffsetPercentage, userData);

  const torso = new THREE.Group();
  torso.name = 'TORSO';

  torso.add(thickBubbles);
  torso.add(middleBubbles);
  torso.add(smallBubbles);

  return torso;
}

function createLimbs(): THREE.Group {
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

  const limbs = new THREE.Group();
  limbs.name = 'LIMBS';

  for (let [startKeypointName, endKeypointName] of LINES_KEYPOINTS) {
    const userData = { startKeypointName, endKeypointName };

    const thickBubbles = createBubblesGroup(limbsThickRadius, limbsThickCount, limbsOffsetPercentage, userData);
    const middleBubbles = createBubblesGroup(limbsMediumRadius, limbsMediumCount, limbsOffsetPercentage, userData);
    const smallBubbles = createBubblesGroup(limbsSmallRadius, limbsSmallCount, limbsOffsetPercentage, userData);

    limbs.add(thickBubbles);
    limbs.add(middleBubbles);
    limbs.add(smallBubbles);
  }

  return limbs;
}

function createBubblesGroup(radius = 0.2, numberOfBubbles = 5, offset = 0, userData = {}): THREE.Group {
  const group = new THREE.Group();
  group.visible = false;
  group.userData = userData;

  for (let i = 0; i < numberOfBubbles; i++) {
    const x = i * radius * 2;
    const bubble = createBubble({ x, radius, offset });
    bubble.userData.body = createBody(bubble, BUBBLE_BODY_MATERIAL, 0);
    group.add(bubble);
  }

  return group;
}
