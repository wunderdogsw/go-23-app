import * as THREE from 'three';

import { detectPoses } from '../bodyDetection';
import { getScene } from '../cinematography';
import { getWorld } from '../physics';
import { disposeGroup } from '../utils/three';
import { alignBubbleFigurePose } from './alignPose';
import { createBubbleBody } from './body';
import { createBubbleHead } from './head';

let bubbleFigure: THREE.Group | null = null;

export async function updateBubbleFigure() {
  const { poses, posesLost, posesFound } = await detectPoses();

  if (posesLost) {
    disposeBubbleFigure();
  } else if (posesFound) {
    createBubbleFigure();
  }

  if (!poses.length || !bubbleFigure) {
    return;
  }

  alignBubbleFigurePose(bubbleFigure, poses[0]);
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
  disposeGroup(bubbleFigure, (mesh: THREE.Mesh) => {
    if (!mesh.userData?.body) {
      return;
    }

    getWorld().removeBody(mesh.userData.body);
  });

  bubbleFigure = null;
}
