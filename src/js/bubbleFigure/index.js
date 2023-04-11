import * as THREE from 'three';

import { detectPoses } from '../bodyDetection.js';
import { getScene } from '../cinematography.js';
import { getWorld } from '../physics.js';
import { disposeGroup } from '../utils/three.js';
import { alignBubbleFigurePose } from './alignPose.js';
import { createBubbleBody } from './body.js';
import { createBubbleHead } from './head.js';

let bubbleFigure;

export async function updateBubbleFigure() {
  const { poses, posesLost, posesFound } = await detectPoses();

  if (posesLost) {
    disposeBubbleFigure();
  } else if (posesFound) {
    createBubbleFigure();
  }

  if (!poses.length) {
    return;
  }

  alignBubbleFigurePose({ figure: bubbleFigure, pose: poses[0] });
}

export function resetBubbleFigure() {
  disposeBubbleFigure();
  createBubbleFigure();
}

function createBubbleFigure() {
  bubbleFigure = new THREE.Group();
  const head = createBubbleHead();
  const body = createBubbleBody();

  bubbleFigure.name = 'FIGURE';
  bubbleFigure.add(head);
  bubbleFigure.add(body);

  getScene().add(bubbleFigure);
}

function disposeBubbleFigure() {
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
