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

let SHAPES_TRAJECTORIES = [];

export function resetShapes({ camera, scene }) {
  clearShapes();

  // Adding different shapes
  for (let i = 0; i <= AMOUNT_OF_GENERATED_SHAPES; i++) {
    const videoTexture = getRandomTexture();
    const createShape = getRandomItem(AVAILABLE_SHAPES);
    const shape = createShape(videoTexture);

    const shapeTrajectory = generateTrajectory(shape);

    SHAPES_TRAJECTORIES.push(shapeTrajectory);
    scene.add(shapeTrajectory.shape);
  }
}

export function renderShapes() {
  for (let i = 0; i < SHAPES_TRAJECTORIES.length; i++) {
    renderShape(SHAPES_TRAJECTORIES[i]);
  }
}

function renderShape(shapeTrajectory) {
  const isRouteFinished = !shapeTrajectory.trajectory.route.length;
  if (isRouteFinished) {
    const { trajectory } = generateTrajectory(shapeTrajectory.shape);
    shapeTrajectory.trajectory = trajectory;
  }

  const { x: newX, y: newY } = shapeTrajectory.trajectory.route.shift();
  shapeTrajectory.shape.position.y = newY;
  shapeTrajectory.shape.position.x = newX;

  const { x, y, z } = shapeTrajectory.trajectory.rotation;
  shapeTrajectory.shape.rotateX(x);
  shapeTrajectory.shape.rotateY(y);
  shapeTrajectory.shape.rotateZ(z);
}

function createRoute(start, end, speed) {
  const route = [];

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
  const { x, y } = route.shift();

  const rotation = {
    x: getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    y: getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    z: getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max)
  };

  const trajectory = {
    route,
    rotation
  };

  shape.position.x = x;
  shape.position.y = y;
  shape.rotateX(rotation.x);
  shape.rotateY(rotation.y);
  shape.rotateZ(rotation.z);

  return {
    shape,
    trajectory
  }
}

function generateTrajectoryEdges(shape) {
  // Bounding box for calculating space needed outside visible area
  const { max } = new THREE.Box3().setFromObject(shape);
  const shapeHideAdjustment = Math.max(max.x, max.y) * 2;
  const visibleEdges = visibleBoundingBox(shape.position.z);

  // Random start from the allowed start directions
  const startDirectionKeys = extractEnabledKeys(ALLOWED_START_DIRECTION);
  const startDirectionKey = getRandomItem(startDirectionKeys);

  // Random end from the allowed end direction excluding the start direction
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
  SHAPES_TRAJECTORIES.forEach(({ shape }) => scene.remove(shape));
  SHAPES_TRAJECTORIES = [];
}

function extractEnabledKeys(obj, excludeKeys = []) {
  const keys = Object.keys(obj);
  const allowed = [];

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];

    if (!!obj[key] && !excludeKeys.includes(key)) {
      allowed.push(key);
    }
  }

  return allowed;
}
