import * as THREE from 'three';

import { createBody } from '../physics.js';
import { createBubble } from '../shapes/basic.js';
import { getRandomFloat, getRandomInt } from '../utils/maths.js';
import { BUBBLE_BODY_MATERIAL } from './physicalBody.js';

const BUBBLE_HEAD_SPHERES = 50;

export function createBubbleHead(radius = 1.2, numSpheres = BUBBLE_HEAD_SPHERES) {
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
