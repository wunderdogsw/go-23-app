import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { getScene } from '../cinematography';
import { getParameters } from '../parameters';
import { addCollidingContactMaterial, createBody, getWorld } from '../physics';
import { getRandomColorTexture } from '../textures/index';
import { getRandomFloat, getRandomItem } from '../utils/maths';
import { disposeMesh, getVectorsRadiansAngle, visibleBoundingBox } from '../utils/three';
import { createCone, createCylinder, createSphere } from './basic';

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

let visualArea: any;
let visualAreaWithMargin: any;
let shapes: any = [];

export function resetShapes() {
  clearShapes();
  setupVisibleArea();
  setupWorld();

  const { amountShapes } = getParameters();

  for (let i = 0; i < amountShapes; i++) {
    const shape = createNewShape();
    shapes.push(shape);
  }
}

export function updateShapes() {
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];
    applyTrajectory(shape);

    if (!isShapeVisible(shape)) {
      disposeShape(shape);
      shapes[i] = createNewShape();
    }
  }
}

function createNewShape() {
  const texture = getRandomColorTexture();
  // @ts-expect-error TS(2345): Argument of type '((texture: any, radiusTop?: numb... Remove this comment to see the full error message
  const createShape = getRandomItem(SHAPE_FACTORIES);
  // @ts-expect-error TS(2532): Object is possibly 'undefined'.
  const shape = createShape(texture);
  const body = createBody(shape, SHAPE_BODY_MATERIAL, SHAPE_BODY_MASS);
  shape.userData = { body, trajectory: null };

  applyTrajectory(shape);

  getScene().add(shape);
  getWorld().addBody(shape.userData.body);

  return shape;
}

function disposeShape(shape: any) {
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
  visualArea = createVisibleAreaBox();
  visualAreaWithMargin = createVisibleAreaBox(VISIBLE_AREA_MARGIN);
}

function createVisibleAreaBox(margin = 0) {
  const { top, right, bottom, left } = visibleBoundingBox();

  const bottomLeft = new THREE.Vector3(left - margin, bottom - margin, SHAPE_POSITION_DEPTH);
  const topRight = new THREE.Vector3(right + margin, top + margin, SHAPE_POSITION_DEPTH);

  return new THREE.Box3(bottomLeft, topRight);
}

function applyTrajectory(shape: any) {
  if (!shape.userData.trajectory) {
    shape.userData.trajectory = generateTrajectory();

    updateBodyByTrajectory(shape);
  }

  updateShapeByBody(shape);
}

function isShapeVisible(shape: any) {
  if (!shape) {
    return false;
  }
  return visualAreaWithMargin.containsPoint(shape.position);
}

function updateBodyByTrajectory(shape: any) {
  const { rotation, velocity, start } = shape.userData.trajectory;
  shape.userData.body.position.copy(start);
  shape.userData.body.velocity.x = velocity.x;
  shape.userData.body.velocity.y = velocity.y;
  shape.userData.body.angularVelocity.copy(rotation);
  shape.userData.body.angularVelocity.normalize();
}

function updateShapeByBody(shape: any) {
  shape.position.copy(shape.userData.body.position);
  shape.quaternion.copy(shape.userData.body.quaternion);
}

function generateTrajectory() {
  const startVector = new THREE.Vector3(
    getRandomFloat(visualArea.min.x, visualArea.max.x),
    visualAreaWithMargin.max.y,
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

function generateTrajectoryVelocity(startVector: any) {
  const endDirection = new THREE.Vector3(
    getRandomFloat(visualArea.min.x, visualArea.max.x),
    visualAreaWithMargin.min.y,
    startVector.z
  );

  const speed = getRandomFloat(MOVE_SPEED_RANGE.min, MOVE_SPEED_RANGE.max);
  const angle = getVectorsRadiansAngle(startVector, endDirection);

  return calculateVelocity(angle, speed, startVector.z);
}

function calculateVelocity(angleRadians: any, speed: any, depth: any) {
  const x = speed * Math.cos(angleRadians);
  const y = speed * Math.sin(angleRadians);
  return new THREE.Vector3(x, y, depth);
}

function clearShapes() {
  for (let shape of shapes) {
    disposeShape(shape);
  }

  shapes = [];
  getWorld().removeEventListener('postStep', keepFixedDepth);
}

function keepFixedDepth() {
  for (let shape of shapes) {
    shape.userData.body.position.z = SHAPE_POSITION_DEPTH;
    shape.position.copy(shape.userData.body.position);
  }
}
