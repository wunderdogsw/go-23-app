import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { getScene } from '../cinematography.js';
import { getParameters } from '../parameters.js';
import { addCollidingContactMaterial, createBody, getWorld } from '../physics.js';
import { getRandomColorTexture } from '../textures/index.js';
import { disposeMesh, visibleBoundingBox } from '../utils/three.js';
import { getRandomFloat, getRandomItem } from '../utils/maths.js';
import { createCone, createCylinder, createSphere } from './basic.js';

export const SHAPE_BODY_MATERIAL = new CANNON.Material('shapeMaterial');

let SHAPES = [];

const SHAPE_POSITION_DEPTH = 0;

const DEFAULT_POSITION = new THREE.Vector3(0, 0, SHAPE_POSITION_DEPTH);

const AVAILABLE_SHAPES = [createSphere, createCylinder, createCone];

const MOVE_SPEED_RANGE = {
  min: 2,
  max: 7,
};

const ROTATION_RANGE = {
  min: -5,
  max: 5,
};

const VISIBLE_AREA_MARGIN = 5;

const SHAPE_BODY_MASS = 1;

let VISIBLE_AREA;
let VISIBLE_AREA_WITH_MARGIN;

export function resetShapes() {
  clearShapes();
  setupVisibleArea();
  setupWorld();

  const { amountShapes } = getParameters();

  for (let i = 0; i < amountShapes; i++) {
    const shape = createNewShape();
    SHAPES.push(shape);
    getScene().add(shape);
    getWorld().addBody(shape.userData.body);
  }
}

export function renderShapes() {
  for (let shape of SHAPES) {
    if (shape.visible) {
      applyTrajectory(shape);
    }
  }
}

export function updateShapes() {
  for (let i = 0; i < SHAPES.length; i++) {
    const oldShape = SHAPES[i];

    if (!isShapeVisible(oldShape)) {
      oldShape.visible = false;
      getScene().remove(oldShape);
      getWorld().removeBody(oldShape.userData.body);
      disposeMesh(oldShape);

      const newShape = createNewShape();
      SHAPES[i] = newShape;

      getScene().add(newShape);
      getWorld().addBody(newShape.userData.body);
    }
  }
}

const createNewShape = () => {
  const videoTexture = getRandomColorTexture();
  const createShape = getRandomItem(AVAILABLE_SHAPES);
  const shape = createShape(videoTexture);
  const body = createBody(shape, SHAPE_BODY_MASS, SHAPE_BODY_MATERIAL);
  shape.userData = { body, trajectory: null };

  applyTrajectory(shape);

  return shape;
};

function setupWorld() {
  // For keeping shape position z fixed
  getWorld().addEventListener('postStep', keepFixedDepth);

  addCollidingContactMaterial(SHAPE_BODY_MATERIAL, SHAPE_BODY_MATERIAL);
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

function applyTrajectory(shape) {
  if (!shape.userData.trajectory) {
    shape.userData.trajectory = generateTrajectory(shape);

    updateBody(shape);
  }

  updateShape(shape);
}

function isShapeVisible(shape) {
  if (!shape) {
    return false;
  }
  return VISIBLE_AREA_WITH_MARGIN.containsPoint(shape.position);
}

function updateBody(shape) {
  const { rotation, velocity, start } = shape.userData.trajectory;
  shape.userData.body.position.copy(start);
  shape.userData.body.velocity.x = velocity.x;
  shape.userData.body.velocity.y = velocity.y;
  shape.userData.body.angularVelocity.copy(rotation);
  shape.userData.body.angularVelocity.normalize();
}

function updateShape(shape) {
  shape.position.copy(shape.userData.body.position);
  shape.quaternion.copy(shape.userData.body.quaternion);
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
    velocity,
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
  return new THREE.Vector3(speed * Math.cos(angleRadians), speed * Math.sin(angleRadians), depth);
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

function clearShapes() {
  SHAPES.forEach((shape) => {
    getScene().remove(shape);
    getWorld().removeBody(shape.userData.body);
    disposeMesh(shape);
  });
  SHAPES = [];
  getWorld().removeEventListener('postStep', keepFixedDepth);
}

function keepFixedDepth() {
  for (let shape of SHAPES) {
    shape.userData.body.position.z = SHAPE_POSITION_DEPTH;
    shape.position.copy(shape.userData.body.position);
  }
}
