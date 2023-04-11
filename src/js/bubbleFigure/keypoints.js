import * as THREE from 'three';

import { getAverage } from "../utils/maths.js";
import { getObjectX, getObjectY } from "../utils/three.js";

export function createPoseKeypointsMap(keypoints) {
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

export function createVectorByKeypointName(keypointsMap, name) {
  const keypoint = keypointsMap.get(name);
  if (!keypoint) {
    return null;
  }

  return createVectorByKeypoint(keypoint);
}

function addExtraKeypointsToMap(keypointsMap) {
  const neck = createAverageKeypoint({
    keypointsMap,
    name: 'neck',
    startKeypointName: 'left_shoulder',
    endKeypointName: 'right_shoulder',
  });
  keypointsMap.set(neck.name, neck);

  const stomach = createAverageKeypoint({
    keypointsMap,
    name: 'stomach',
    startKeypointName: 'left_hip',
    endKeypointName: 'right_hip',
  });
  keypointsMap.set(stomach.name, stomach);
}

function createAverageKeypoint({ name, keypointsMap, startKeypointName, endKeypointName }) {
  const startKeypoint = keypointsMap.get(startKeypointName);
  const endKeypoint = keypointsMap.get(endKeypointName);

  const x = getAverage([startKeypoint.x, endKeypoint.x]);
  const y = getAverage([startKeypoint.y, endKeypoint.y]);
  const z = getAverage([startKeypoint.z, endKeypoint.z]);
  const score = getAverage([startKeypoint.score, endKeypoint.score]);

  return { name, x, y, z, score };
}

function createVectorByKeypoint(keypoint) {
  const objectX = getObjectX(keypoint.x);
  const objectY = getObjectY(keypoint.y);
  return new THREE.Vector3(objectX, objectY, 0);
}