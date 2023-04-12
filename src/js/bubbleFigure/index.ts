// @ts-expect-error TS(7016): Could not find a declaration file for module 'thre... Remove this comment to see the full error message
import * as THREE from 'three';

import { detectPoses } from '../bodyDetection.js';
import { getScene } from '../cinematography.js';
import { getWorld } from '../physics.js';
import { disposeGroup } from '../utils/three.js';
import { alignBubbleFigurePose } from './alignPose.js';
import { createBubbleBody } from './body.js';
import { createBubbleHead } from './head.js';

let bubbleFigure: any;

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
  // @ts-expect-error TS(2345): Argument of type '(mesh: any) => void' is not assi... Remove this comment to see the full error message
  disposeGroup(bubbleFigure, (mesh: any) => {
    if (!mesh.userData?.body) {
      return;
    }

    getWorld().removeBody(mesh.userData.body);
  });

  bubbleFigure = null;
}
