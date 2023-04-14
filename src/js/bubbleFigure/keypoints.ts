import * as THREE from 'three';
import { Keypoint } from '@tensorflow-models/pose-detection';

import { getAverage } from '../utils/maths';
import { getObjectX, getObjectY } from '../utils/three';

export type KeypointsMapType = Map<string, Keypoint>;

export function createPoseKeypointsMap(keypoints: Keypoint[]): KeypointsMapType {
  const keypointsMap = new Map();

  if (!keypoints.length) {
    return keypointsMap;
  }

  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    keypointsMap.set(keypoint.name, keypoint);
  }

  addExtraKeypointsToMap(keypointsMap);

  return keypointsMap;
}

export function createVectorByKeypointName(keypointsMap: KeypointsMapType, name: string): THREE.Vector3 | null {
  const keypoint = keypointsMap.get(name);
  if (!keypoint) {
    return null;
  }

  return createVectorByKeypoint(keypoint);
}

function addExtraKeypointsToMap(keypointsMap: KeypointsMapType) {
  const neck = createAverageKeypoint({
    keypointsMap,
    name: 'neck',
    startKeypointName: 'left_shoulder',
    endKeypointName: 'right_shoulder',
  });
  neck && keypointsMap.set(neck.name, neck);

  const stomach = createAverageKeypoint({
    keypointsMap,
    name: 'stomach',
    startKeypointName: 'left_hip',
    endKeypointName: 'right_hip',
  });
  stomach && keypointsMap.set(stomach.name, stomach);
}

type CreateAverageKeypointParamsType = {
  name: string;
  keypointsMap: KeypointsMapType;
  startKeypointName: string;
  endKeypointName: string;
};
function createAverageKeypoint({
  name,
  keypointsMap,
  startKeypointName,
  endKeypointName,
}: CreateAverageKeypointParamsType): Required<Keypoint> | null {
  const startKeypoint = keypointsMap.get(startKeypointName);
  const endKeypoint = keypointsMap.get(endKeypointName);

  if (!startKeypoint || !endKeypoint) {
    return null;
  }

  const x = getAverage([startKeypoint.x, endKeypoint.x]);
  const y = getAverage([startKeypoint.y, endKeypoint.y]);
  const z = startKeypoint.z && endKeypoint.z ? getAverage([startKeypoint.z, endKeypoint.z]) : 0;
  const score = startKeypoint.score && endKeypoint.score ? getAverage([startKeypoint.score, endKeypoint.score]) : 0;

  return { name, x, y, z, score };
}

function createVectorByKeypoint(keypoint: Keypoint): THREE.Vector3 {
  const objectX = getObjectX(keypoint.x);
  const objectY = getObjectY(keypoint.y);
  return new THREE.Vector3(objectX, objectY, 0);
}
