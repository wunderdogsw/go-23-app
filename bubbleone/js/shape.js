import * as THREE from 'three';

import {
  getRandomInt,
  getRandomFloat,
  visibleBoundingBox,
  getRandomItem
} from './utils.js'
import Cone from './shapes/Cone.js';
import Cylinder from './shapes/Cylinder.js';
import Sphere from './shapes/Sphere.js';
import { getRandomTexture } from './textures.js';

const AMOUNT_OF_GENERATED_SHAPES = 6;

const DEFAULT_POSITION = new THREE.Vector3(0, 0, -1);

const AVAILABLE_SHAPES = [Sphere, Cylinder, Cone];

const ALLOWED_START_DIRECTION = {
  top: true,
  right: false,
  bottom: false,
  left: false
};

const ALLOWED_END_DIRECTION = {
  top: false,
  right: false,
  bottom: true,
  left: false
};

const MOVE_SPEED_RANGE = {
  min: 0.05,
  max: 0.1
};

const ROTATION_RANGE = {
  min: -0.05,
  max: 0.05
};

let SHAPES_WITH_TRAJECTORIES = [];

export function resetShapes({ camera, scene }) {
  clearShapes();

  // Adding different shapes
  for (let i = 0; i <= AMOUNT_OF_GENERATED_SHAPES; i++) {
    const videoTexture = getRandomTexture();
    const createShape = getRandomItem(AVAILABLE_SHAPES);
    const shape = createShape(videoTexture);

    const shapeTrajectoryEntry = { shape, trajectory: null };
    applyTrajectory(shapeTrajectoryEntry);

    SHAPES_WITH_TRAJECTORIES.push(shapeTrajectoryEntry);
    scene.add(shapeTrajectoryEntry.shape);
  }
}

export function renderShapes() {
  for (let shapeTrajectoryEntry of SHAPES_WITH_TRAJECTORIES) {
    if (shapeTrajectoryEntry.shape.visible) {
      applyTrajectory(shapeTrajectoryEntry);
    }
  }
}

function applyTrajectory(shapeTrajectoryEntry) {
  if (isRouteFinished(shapeTrajectoryEntry.trajectory)) {
    shapeTrajectoryEntry.trajectory = generateTrajectory(shapeTrajectoryEntry.shape);

    // Hiding the shape if trajectory is immediately finished
    if (isRouteFinished(shapeTrajectoryEntry.trajectory)) {
      shapeTrajectoryEntry.shape.visible = false;
      console.error(`Invalid shape trajectory. Please check the allowed directions`);
      return;
    }
  }

  const { x: newX, y: newY } = shapeTrajectoryEntry.trajectory.route.shift();
  shapeTrajectoryEntry.shape.position.y = newY;
  shapeTrajectoryEntry.shape.position.x = newX;

  const { x, y, z } = shapeTrajectoryEntry.trajectory.rotation;
  shapeTrajectoryEntry.shape.rotateX(x);
  shapeTrajectoryEntry.shape.rotateY(y);
  shapeTrajectoryEntry.shape.rotateZ(z);
}

function isRouteFinished(trajectory) {
  return !trajectory?.route?.length
}

function createRoute(start, end, speed) {
  const route = [];

  if (!start || !end || !speed) {
    return route;
  }

  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const numSteps = Math.ceil(distance / speed);

  const xStep = deltaX / numSteps;
  const yStep = deltaY / numSteps;

  for (let i = 0; i < numSteps; i++) {
    const newX = start.x + xStep * i;
    const newY = start.y + yStep * i;
    route.push({ x: newX, y: newY });
  }

  return route;
}

function generateTrajectory(shape) {
  shape.position.copy(DEFAULT_POSITION);

  const { start, end } = generateTrajectoryEdges(shape);

  const speed = getRandomFloat(MOVE_SPEED_RANGE.min, MOVE_SPEED_RANGE.max);

  // Calculating route and extracting start coordinates  
  const route = createRoute(start, end, speed);

  const rotation = {
    x: getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    y: getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    z: getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max)
  };

  return {
    route,
    rotation
  };
}

function generateTrajectoryEdges(shape) {
  // Bounding box for calculating space needed outside visible area
  const { max } = new THREE.Box3().setFromObject(shape);
  const shapeHideAdjustment = Math.max(max.x, max.y) * 2;
  const visibleEdges = visibleBoundingBox(shape.position.z);

  const startDirectionKeys = extractEnabledKeys(ALLOWED_START_DIRECTION);
  const startDirectionKey = getRandomItem(startDirectionKeys);

  const endDirectionKeys = extractEnabledKeys(ALLOWED_END_DIRECTION, [startDirectionKey]);
  const endDirectionKey = getRandomItem(endDirectionKeys);

  const start = generateSingleTrajectoryEdge({
    directionKey: startDirectionKey,
    visibleEdges,
    shapeHideAdjustment
  });
  const end = generateSingleTrajectoryEdge({
    directionKey: endDirectionKey,
    visibleEdges,
    shapeHideAdjustment
  });

  return { start, end };
}

function generateSingleTrajectoryEdge({ directionKey, visibleEdges, shapeHideAdjustment }) {
  let x;
  let y;

  if (directionKey === 'top') {
    y = visibleEdges.top + shapeHideAdjustment;
    x = getRandomInt(visibleEdges.left, visibleEdges.right);
  } else if (directionKey === 'right') {
    x = visibleEdges.right + shapeHideAdjustment;
    y = getRandomInt(visibleEdges.top, visibleEdges.bottom);
  } else if (directionKey === 'bottom') {
    y = visibleEdges.bottom - shapeHideAdjustment;
    x = getRandomInt(visibleEdges.left, visibleEdges.right);
  } else if (directionKey === 'left') {
    x = visibleEdges.left - shapeHideAdjustment;
    y = getRandomInt(visibleEdges.top, visibleEdges.bottom);
  }

  return { x, y };
}

function clearShapes() {
  SHAPES_WITH_TRAJECTORIES.forEach(({ shape }) => scene.remove(shape));
  SHAPES_WITH_TRAJECTORIES = [];
}

function extractEnabledKeys(obj, excludeKeys = []) {
  const keys = Object.keys(obj);
  const allowed = [];

  for (let key of keys) {
    if (!!obj[key] && !excludeKeys.includes(key)) {
      allowed.push(key);
    }
  }

  return allowed;
}
