import * as CANNON from 'cannon-es';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'thre... Remove this comment to see the full error message
import * as THREE from 'three';

import { getWorld } from '../physics.js';

export const BUBBLE_BODY_MATERIAL = new CANNON.Material('bubbleMaterial');

export function alignGroupPhysicalBody(group: any) {
  group.traverse((obj: any) => {
    if (obj.type === 'Mesh') {
      alignMeshPhysicalBodyTrajectory(obj);
      alignMeshPhysicalBodyVisibility(obj);
    }
  });
}

function alignMeshPhysicalBodyTrajectory(entry: any) {
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

function alignMeshPhysicalBodyVisibility(entry: any) {
  const body = entry?.userData?.body;
  if (!body) {
    return;
  }

  const isMeshVisible = entry.visible && (!entry.parent || entry.parent.visible);
  const isBodyInWorld = entry.userData?.bodyInWorld;
  const includeInWorld = isMeshVisible && !isBodyInWorld;

  if (includeInWorld) {
    getWorld().addBody(body);
  } else {
    getWorld().removeBody(body);
  }

  entry.userData.bodyInWorld = includeInWorld;
}
