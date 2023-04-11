import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { getScene } from '../cinematography.js';
import { getParameters } from '../parameters.js';
import { addCollidingContactMaterial, createBody, getWorld } from '../physics.js';
import { getRandomColorTexture } from '../textures/index.js';
import { getRandomFloat, getRandomItem } from '../utils/maths.js';
import { disposeMesh, getVectorsRadiansAngle, visibleBoundingBox } from '../utils/three.js';
import { createCone, createCylinder, createSphere } from './basic.js';

export const SHAPE_BODY_MATERIAL = new CANNON.Material('shapeMaterial');

const SHAPE_POSITION_DEPTH = 0;
const SHAPE_FACTORIES = [createSphere, createCylinder, createCone];
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

let SHAPES = [];
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
  }
}

export function updateShapes() {
  for (let i = 0; i < SHAPES.length; i++) {
    const shape = SHAPES[i];
    applyTrajectory(shape);

    if (!isShapeVisible(shape)) {
      disposeShape(shape);
      SHAPES[i] = createNewShape();
    }
  }
}

function createNewShape() {
  const texture = getRandomColorTexture();
  const createShape = getRandomItem(SHAPE_FACTORIES);
  const shape = createShape(texture);
  const body = createBody(shape, SHAPE_BODY_MATERIAL, SHAPE_BODY_MASS);
  shape.userData = { body, trajectory: null };

  applyTrajectory(shape);

  getScene().add(shape);
  getWorld().addBody(shape.userData.body);

  return shape;
}

function disposeShape(shape) {
  getScene().remove(shape);
  getWorld().removeBody(shape.userData.body);
  disposeMesh(shape);
}

function setupWorld() {
  // For keeping shape position z fixed
  getWorld().addEventListener('postStep', keepFixedDepth);

  addCollidingContactMaterial(SHAPE_BODY_MATERIAL, SHAPE_BODY_MATERIAL);
}

function setupVisibleArea() {
  VISIBLE_AREA = createVisibleAreaBox();
  VISIBLE_AREA_WITH_MARGIN = createVisibleAreaBox(VISIBLE_AREA_MARGIN);
}

function createVisibleAreaBox(margin = 0) {
  const { top, right, bottom, left } = visibleBoundingBox();

  const bottomLeft = new THREE.Vector3(left - margin, bottom - margin, SHAPE_POSITION_DEPTH);
  const topRight = new THREE.Vector3(right + margin, top + margin, SHAPE_POSITION_DEPTH);

  return new THREE.Box3(bottomLeft, topRight);
}

function applyTrajectory(shape) {
  if (!shape.userData.trajectory) {
    shape.userData.trajectory = generateTrajectory();

    updateBodyByTrajectory(shape);
  }

  updateShapeByBody(shape);
}

function isShapeVisible(shape) {
  if (!shape) {
    return false;
  }
  return VISIBLE_AREA_WITH_MARGIN.containsPoint(shape.position);
}

function updateBodyByTrajectory(shape) {
  const { rotation, velocity, start } = shape.userData.trajectory;
  shape.userData.body.position.copy(start);
  shape.userData.body.velocity.x = velocity.x;
  shape.userData.body.velocity.y = velocity.y;
  shape.userData.body.angularVelocity.copy(rotation);
  shape.userData.body.angularVelocity.normalize();
}

function updateShapeByBody(shape) {
  shape.position.copy(shape.userData.body.position);
  shape.quaternion.copy(shape.userData.body.quaternion);
}

function generateTrajectory() {
  const startVector = new THREE.Vector3(
    getRandomFloat(VISIBLE_AREA.min.x, VISIBLE_AREA.max.x),
    VISIBLE_AREA_WITH_MARGIN.max.y,
    SHAPE_POSITION_DEPTH
  );

  const velocity = generateTrajectoryVelocity(startVector);

  const rotation = new THREE.Vector3(
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max)
  );

  return {
    start: startVector,
    rotation,
    velocity,
  };
}

function generateTrajectoryVelocity(startVector) {
  const endDirection = new THREE.Vector3(
    getRandomFloat(VISIBLE_AREA.min.x, VISIBLE_AREA.max.x),
    VISIBLE_AREA_WITH_MARGIN.min.y,
    startVector.z
  );

  const speed = getRandomFloat(MOVE_SPEED_RANGE.min, MOVE_SPEED_RANGE.max);
  const angle = getVectorsRadiansAngle(startVector, endDirection);

  return calculateVelocity(angle, speed, startVector.z);
}

function calculateVelocity(angleRadians, speed, depth) {
  const x = speed * Math.cos(angleRadians);
  const y = speed * Math.sin(angleRadians);
  return new THREE.Vector3(x, y, depth);
}

function clearShapes() {
  for (let shape of SHAPES) {
    disposeShape(shape);
  }

  SHAPES = [];
  getWorld().removeEventListener('postStep', keepFixedDepth);
}

function keepFixedDepth() {
  for (let shape of SHAPES) {
    shape.userData.body.position.z = SHAPE_POSITION_DEPTH;
    shape.position.copy(shape.userData.body.position);
  }
}
