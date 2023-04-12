import * as THREE from 'three';

import { createBody } from '../physics.js';
import { createBubble } from '../shapes/basic.js';
import { getRandomFloat, getRandomInt } from '../utils/maths.js';
import { BUBBLE_BODY_MATERIAL } from './physicalBody.js';

export function createBubbleHead(radius = 1.2, numSpheres = 50) {
  const group = new THREE.Group();
  group.name = 'HEAD';
  group.visible = false;
  group.userData.radius = radius;

  for (let i = 0; i < numSpheres; i++) {
    const bubble = createHeadBubble(radius);
    group.add(bubble);
  }

  return group;
}

function createHeadBubble(radius: any) {
  const randomRadius = getRandomFloat(0.1, 0.4);

  const bubble = createBubble({ radius: randomRadius, offset: 0 });
  const angle1 = getRandomInt(0, 50);
  const angle2 = getRandomInt(0, 50);

  const x = radius * Math.sin(angle1) * Math.cos(angle2);
  const y = radius * Math.sin(angle1) * Math.sin(angle2);
  const z = radius * getRandomFloat(0, 0.5);

  bubble.position.set(x, y, z);
  bubble.userData.body = createBody(bubble, BUBBLE_BODY_MATERIAL, 0);

  return bubble;
}
