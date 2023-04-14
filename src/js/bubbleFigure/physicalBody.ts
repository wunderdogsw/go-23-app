import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { getWorld } from '../physics';

export const BUBBLE_BODY_MATERIAL = new CANNON.Material('bubbleMaterial');

export function alignMeshPhysicalBody(mesh: THREE.Mesh) {
  alignMeshPhysicalBodyTrajectory(mesh);
  alignMeshPhysicalBodyVisibility(mesh);
}

function alignMeshPhysicalBodyTrajectory(mesh: THREE.Mesh) {
  const body = mesh.userData?.body;
  if (!body) {
    return;
  }

  let target = new THREE.Vector3();
  mesh.getWorldPosition(target);
  target.z = 0;

  body.position.copy(target);
  body.quaternion.copy(mesh.quaternion);
}

function alignMeshPhysicalBodyVisibility(mesh: THREE.Mesh) {
  const body = mesh.userData?.body;
  if (!body) {
    return;
  }

  const isMeshVisible = mesh.visible && (!mesh.parent || mesh.parent.visible);
  const isBodyInWorld = mesh.userData?.bodyInWorld;
  const includeInWorld = isMeshVisible && !isBodyInWorld;

  if (includeInWorld) {
    getWorld().addBody(body);
  } else {
    getWorld().removeBody(body);
  }

  mesh.userData.bodyInWorld = includeInWorld;
}
