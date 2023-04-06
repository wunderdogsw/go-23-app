import * as THREE from 'three';

import { getWorld } from "../physics.js";

export function alignGroupPhysicalBody(group) {
  group.traverse((obj) => {
    if (obj.type === 'Mesh') {
      alignMeshPhysicalBodyTrajectory(obj);
      alignMeshPhysicalBodyVisibility(obj);
    }
  });
}

function alignMeshPhysicalBodyTrajectory(entry) {
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

function alignMeshPhysicalBodyVisibility(entry) {
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
