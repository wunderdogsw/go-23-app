import * as THREE from 'three';

import { detectPoses } from '../bodyDetection';
import { getScene } from '../cinematography';
import { getWorld } from '../physics';
import { disposeGroup } from '../utils/three';
import { alignBubbleFigurePose } from './alignPose';
import { createBubbleBody } from './body';
import { createBubbleHead } from './head';

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
