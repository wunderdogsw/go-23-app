import * as THREE from 'three';

import {
  getSizes,
  setSceneSize,
  getQueryStringValue,
  getRandomInt,
  getRandomFloat,
  visibleHeightAtZDepth,
  visibleWidthAtZDepth,
  visibleBoundingBox
} from './utils.js'
import Cone from './shapes/Cone.js';
import Cylinder from './shapes/Cylinder.js';
import Sphere from './shapes/Sphere.js';
import VideoTexture, { getRandomTexture } from './VideoTexture.js';

const AMOUNT_OF_GENERATED_SHAPES = 6;

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

const SHAPES = [];

let camera;
let scene;
let renderer;

export function resetShapes({
  camera: threeCamera,
  scene: threeScene,
  renderer: threeRenderer
}) {
  camera = threeCamera;
  scene = threeScene;
  renderer = threeRenderer;

  // Removing existing shapes from scene and clearing array
  SHAPES.forEach(({ shape }) => scene.remove(shape));
  SHAPES.length = 0;

  // Adding different shapes
  for (let i = 0; i <= AMOUNT_OF_GENERATED_SHAPES; i++) {
    const shapeTypeNumber = getRandomInt(1, 3);
    const randomVideo = Math.round(Math.random()) ? hVideo : sVideo;

    let shape;

    // Get randomly selected shape
    switch (shapeTypeNumber) {
      case 1: shape = Sphere(VideoTexture(randomVideo)); break;
      case 2: shape = Cylinder(VideoTexture(randomVideo)); break;
      case 3: shape = Cone(VideoTexture(randomVideo)); break;
    }

    const shapeTrajectory = generateTrajectory(shape);

    SHAPES.push(shapeTrajectory);
    scene.add(shapeTrajectory.shape);
  }

  return SHAPES.map(trajectory => trajectory.shape);
}

export function renderShape(shapeTrajectory) {
  // Setting up new trajectory if shape has moved until the end
  if (!shapeTrajectory.position.route.length) {
    const newTrajectory = generateTrajectory(shapeTrajectory.shape);
    shapeTrajectory.position = newTrajectory.position;
    shapeTrajectory.rotation = newTrajectory.rotation;
  }

  const { x: newX, y: newY } = shapeTrajectory.position.route.shift();
  shapeTrajectory.shape.position.y = newY;
  shapeTrajectory.shape.position.x = newX;

  shapeTrajectory.shape.rotateX(shapeTrajectory.rotation.x);
  shapeTrajectory.shape.rotateY(shapeTrajectory.rotation.y);
  shapeTrajectory.shape.rotateZ(shapeTrajectory.rotation.z);
}

export function renderShapes() {
  for (let i = 0; i < SHAPES.length; i++) {
    renderShape(SHAPES[i]);
  }
}

function calculateRoute(start, end, speed) {
  const { y: endY, x: endX } = end;
  const { y: startY, x: startX } = start;
  const route = [];

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const numSteps = Math.ceil(distance / speed);

  const xStep = deltaX / numSteps;
  const yStep = deltaY / numSteps;

  for (let i = 0; i < numSteps; i++) {
    const newX = startX + xStep * i;
    const newY = startY + yStep * i;
    route.push({ x: newX, y: newY });
  }

  return route;
}

function allowedDirectionsToNumber({ top, right, bottom, left }) {
  return [top, right, bottom, left]
    .map((d, index) => d ? index + 1 : 0)
    .filter(d => !!d);
}

function generateTrajectory(shape) {
  // Setting shape start position to default
  shape.position.set(0, 0, -1);

  // Bounding box for calculating space needed outside visible area
  const { max } = new THREE.Box3().setFromObject(shape);
  const shapeHideAdjustment = Math.max(max.x, max.y) * 2;
  const visibleEdges = visibleBoundingBox(camera, shape.position.z);

  // Random start: top, right, bottom, left
  const startDirections = allowedDirectionsToNumber(ALLOWED_START_DIRECTION);
  const startDirection = startDirections[getRandomInt(1, startDirections.length) - 1];

  // Random end without start direction
  const leftoverDirections = allowedDirectionsToNumber(ALLOWED_END_DIRECTION).filter(d => d !== startDirection);
  const endDirection = leftoverDirections[getRandomInt(1, leftoverDirections.length) - 1];

  // Calculating shape start and end positions
  const [start, end] = [startDirection, endDirection].reduce((acc, direction) => {
    let x;
    let y;

    if (direction === 1) {
      // TOP
      y = visibleEdges.top + shapeHideAdjustment;
      x = getRandomInt(visibleEdges.left, visibleEdges.right);
    } else if (direction === 2) {
      // RIGHT
      x = visibleEdges.right + shapeHideAdjustment;
      y = getRandomInt(visibleEdges.top, visibleEdges.bottom);
    } else if (direction === 3) {
      // BOTTOM
      y = visibleEdges.bottom - shapeHideAdjustment;
      x = getRandomInt(visibleEdges.left, visibleEdges.right);
    } else if (direction === 4) {
      // LEFT
      x = visibleEdges.left - shapeHideAdjustment;
      y = getRandomInt(visibleEdges.top, visibleEdges.bottom);
    }

    return [...acc, { wall: direction, x, y }];
  }, []);

  // Setting random speed
  const speed = getRandomFloat(MOVE_SPEED_RANGE.min, MOVE_SPEED_RANGE.max);

  // Calculating route and extracting start coordinates  
  const route = calculateRoute(start, end, speed);
  const { x, y } = route.shift();

  const position = {
    speed,
    route,
    start,
    end
  };

  const rotation = {
    x: getRandomFloat(-0.05, 0.05),
    y: getRandomFloat(-0.05, 0.05),
    z: getRandomFloat(-0.05, 0.05)
  };

  shape.position.x = x;
  shape.position.y = y;
  shape.rotateX(rotation.x);
  shape.rotateY(rotation.y);
  shape.rotateZ(rotation.z);

  return {
    shape,
    position,
    rotation
  }
}
