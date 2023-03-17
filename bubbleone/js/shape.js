import * as THREE from 'three';

import { getRandomInt, getRandomFloat, visibleBoundingBox, getRandomItem } from './utils.js';
import Cone from './shapes/Cone.js';
import Cylinder from './shapes/Cylinder.js';
import Sphere from './shapes/Sphere.js';
import { getRandomColorTexture } from './textures.js';
import { createBody } from './physics.js';

const AMOUNT_OF_GENERATED_SHAPES = 3;

const SHAPE_POSITION_DEPTH = -1;

const DEFAULT_POSITION = new THREE.Vector3(0, 0, SHAPE_POSITION_DEPTH);

const AVAILABLE_SHAPES = [Sphere, Cylinder, Cone];

const MOVE_SPEED_RANGE = {
  min: 2,
  max: 7
};

const ROTATION_RANGE = {
  min: -5,
  max: 5
};

const VISIBLE_AREA_MARGIN = 5;

let VISIBLE_AREA;
let VISIBLE_AREA_WITH_MARGIN;

export let SHAPES_WITH_TRAJECTORIES = [];

export function resetShapes({ scene, world }) {
  clearShapes(scene, world);

  setupVisibleArea();

  // Adding different shapes
  for (let i = 0; i < AMOUNT_OF_GENERATED_SHAPES; i++) {
    const videoTexture = getRandomColorTexture();
    const createShape = getRandomItem(AVAILABLE_SHAPES);
    const shape = createShape(videoTexture);
    const body = createBody(shape);

    const shapeTrajectoryEntry = { shape, body, trajectory: null };
    applyTrajectory(shapeTrajectoryEntry);

    SHAPES_WITH_TRAJECTORIES.push(shapeTrajectoryEntry);

    scene.add(shapeTrajectoryEntry.shape);

    world.addBody(shapeTrajectoryEntry.body);
  }
}

export function renderShapes() {
  for (let shapeTrajectoryEntry of SHAPES_WITH_TRAJECTORIES) {
    if (shapeTrajectoryEntry.shape.visible) {
      applyTrajectory(shapeTrajectoryEntry);
    }
  }
}

function setupVisibleArea() {
  VISIBLE_AREA = visibleArea(SHAPE_POSITION_DEPTH);
  VISIBLE_AREA_WITH_MARGIN = visibleArea(SHAPE_POSITION_DEPTH, VISIBLE_AREA_MARGIN);
}

function visibleArea(depth = -1, margin = 0) {
  const { top, right, bottom, left } = visibleBoundingBox(depth);

  const bottomLeft = new THREE.Vector3(left - margin, bottom - margin, depth);
  const topRight = new THREE.Vector3(right + margin, top + margin, 0);

  return new THREE.Box3(bottomLeft, topRight);
}

function applyTrajectory(shapeTrajectoryEntry) {
  if (!shapeTrajectoryEntry.trajectory || !isShapeVisible(shapeTrajectoryEntry.shape)) {
    shapeTrajectoryEntry.trajectory = generateTrajectory(shapeTrajectoryEntry.shape);

    updateBody(shapeTrajectoryEntry);
  }

  updateShape(shapeTrajectoryEntry);
}

function isShapeVisible(shape) {
  if (!shape) {
    return false;
  }

  return VISIBLE_AREA_WITH_MARGIN.containsPoint(shape.position);
}

function updateBody(shapeTrajectoryEntry) {
  const { rotation, velocity, start } = shapeTrajectoryEntry.trajectory;
  shapeTrajectoryEntry.body.position.copy(start);
  shapeTrajectoryEntry.body.velocity.x = velocity.x;
  shapeTrajectoryEntry.body.velocity.y = velocity.y;
  shapeTrajectoryEntry.body.angularVelocity.copy(rotation);
  shapeTrajectoryEntry.body.angularVelocity.normalize();
}

function updateShape(shapeTrajectoryEntry) {
  shapeTrajectoryEntry.shape.position.copy(shapeTrajectoryEntry.body.position);
  shapeTrajectoryEntry.shape.quaternion.copy(shapeTrajectoryEntry.body.quaternion);
}

function generateTrajectory(shape) {
  shape.position.copy(DEFAULT_POSITION);

  const depth = shape.position.z;

  const start = new THREE.Vector3(
    getRandomFloat(VISIBLE_AREA.min.x, VISIBLE_AREA.max.x),
    VISIBLE_AREA_WITH_MARGIN.max.y,
    depth
  );

  const velocity = generateTrajectoryVelocity(start);

  const rotation = new THREE.Vector3(
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max)
  );

  return {
    start,
    rotation,
    velocity
  };
}

function generateTrajectoryVelocity(start) {
  const endDirection = new THREE.Vector3(
    getRandomFloat(VISIBLE_AREA.min.x, VISIBLE_AREA.max.x),
    VISIBLE_AREA_WITH_MARGIN.min.y,
    start.z
  );

  const speed = getRandomFloat(MOVE_SPEED_RANGE.min, MOVE_SPEED_RANGE.max);
  const angle = calculateAngle(start, endDirection);

  return calculateVelocity(angle, speed, start.z);
}

function calculateVelocity(angleRadians, speed, depth) {
  return new THREE.Vector3(
    speed * Math.cos(angleRadians),
    speed * Math.sin(angleRadians),
    depth
  );
}

/**
 * 
 * @param {THREE.Vector3} from 
 * @param {THREE.Vector3} to 
 * @returns angle (in radians)
 */
function calculateAngle(from, to) {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

function clearShapes(scene, world) {
  SHAPES_WITH_TRAJECTORIES.forEach(({ shape, body }) => {
    scene.remove(shape);
    world.remove(body);
  });
  SHAPES_WITH_TRAJECTORIES = [];
}
