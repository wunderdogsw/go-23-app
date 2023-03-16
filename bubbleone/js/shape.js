import * as THREE from 'three';

import { getRandomInt, getRandomFloat, visibleBoundingBox, getRandomItem } from './utils.js';
import Cone from './shapes/Cone.js';
import Cylinder from './shapes/Cylinder.js';
import Sphere from './shapes/Sphere.js';
import { getRandomColorTexture } from './textures.js';

const AMOUNT_OF_GENERATED_SHAPES = 3;

const DEFAULT_POSITION = new THREE.Vector3(0, 0, -1);

const AVAILABLE_SHAPES = [Sphere, Cylinder, Cone];

const ALLOWED_START_DIRECTION = {
  top: true,
  right: false,
  bottom: false,
  left: false,
};

const ALLOWED_END_DIRECTION = {
  top: false,
  right: false,
  bottom: true,
  left: false,
};

const MOVE_SPEED_RANGE = {
  min: 2,
  max: 7
};

const ROTATION_RANGE = {
  min: -5,
  max: 5
};

export let SHAPES_WITH_TRAJECTORIES = [];


export function resetShapes({ scene, world }) {
  clearShapes(scene, world);

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

function createBody(shape) {
  const vertices = shape.geometry.attributes.position.array;
  const indices = Object.keys(vertices).map(Number);
  const cannonShape = new CANNON.Trimesh(vertices, indices);

  const body = new CANNON.Body({
    mass: 1,
    shape: cannonShape,
    position: new CANNON.Vec3(shape.position.x, shape.position.y, shape.position.z)
  });

  return body;
}

function applyTrajectory(shapeTrajectoryEntry) {
  if (!isShapeVisible(shapeTrajectoryEntry)) {
    shapeTrajectoryEntry.trajectory = generateTrajectory(shapeTrajectoryEntry.shape);

    // Hiding the shape if trajectory is immediately finished
    if (!isShapeVisible(shapeTrajectoryEntry)) {
      shapeTrajectoryEntry.shape.visible = false;
      console.error(`Invalid shape trajectory. Please check the allowed directions`);
      return;
    }

    updateBody(shapeTrajectoryEntry);
  }

  updateShape(shapeTrajectoryEntry);
}

function isShapeVisible(shapeTrajectoryEntry) {
  if (!shapeTrajectoryEntry.shape || !shapeTrajectoryEntry.trajectory) {
    return false;
  }

  const { shape, trajectory } = shapeTrajectoryEntry;

  return trajectory.worldEdges.containsPoint(shape.position);
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

function calculateVelocity(start, end, speed, depth = 0) {
  const angleRadians = Math.atan2(end.y - start.y, end.x - start.x);

  return new THREE.Vector3(
    speed * Math.cos(angleRadians),
    speed * Math.sin(angleRadians),
    depth
  );
}

function generateTrajectory(shape) {
  shape.position.copy(DEFAULT_POSITION);

  const { start, end, visibleEdges, worldEdges } = generateTrajectoryEdges(shape);

  const speed = getRandomFloat(MOVE_SPEED_RANGE.min, MOVE_SPEED_RANGE.max);

  const velocity = calculateVelocity(start, end, speed, shape.position.z);

  const rotation = new THREE.Vector3(
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max),
    getRandomFloat(ROTATION_RANGE.min, ROTATION_RANGE.max)
  );

  return {
    start,
    end,
    rotation,
    visibleEdges,
    worldEdges,
    velocity
  };
}

function trajectoryWorldEdges(shape) {
  // Bounding box for calculating space needed outside visible area
  const { max } = new THREE.Box3().setFromObject(shape);
  const shapeHideAdjustment = Math.max(max.x, max.y) * 2;
  const visibleEdges = visibleBoundingBox(shape.position.z);

  const worldEdges = new THREE.Box3(
    new THREE.Vector3(
      visibleEdges.left - shapeHideAdjustment,
      visibleEdges.bottom - shapeHideAdjustment,
      shape.position.z
    ),
    new THREE.Vector3(
      visibleEdges.right + shapeHideAdjustment,
      visibleEdges.top + shapeHideAdjustment,
      0
    )
  );

  return worldEdges;
}

function generateTrajectoryEdges(shape) {
  const depth = shape.position.z;
  const visibleEdges = visibleBoundingBox(depth);
  const worldEdges = trajectoryWorldEdges(shape);

  const startDirectionKeys = extractEnabledKeys(ALLOWED_START_DIRECTION);
  const startDirectionKey = getRandomItem(startDirectionKeys);

  const endDirectionKeys = extractEnabledKeys(ALLOWED_END_DIRECTION, [startDirectionKey]);
  const endDirectionKey = getRandomItem(endDirectionKeys);

  const start = generateSingleTrajectoryEdge({
    directionKey: startDirectionKey,
    visibleEdges,
    worldEdges,
    depth
  });
  const end = generateSingleTrajectoryEdge({
    directionKey: endDirectionKey,
    visibleEdges,
    worldEdges,
    depth
  });

  return { start, end, visibleEdges, worldEdges };
}

function generateSingleTrajectoryEdge({ directionKey, visibleEdges, worldEdges, depth = 0 }) {
  let x;
  let y;

  if (directionKey === 'top') {
    y = worldEdges.max.y;
    x = getRandomInt(visibleEdges.left, visibleEdges.right);
  } else if (directionKey === 'right') {
    x = worldEdges.max.x;
    y = getRandomInt(visibleEdges.top, visibleEdges.bottom);
  } else if (directionKey === 'bottom') {
    y = worldEdges.min.y;
    x = getRandomInt(visibleEdges.left, visibleEdges.right);
  } else if (directionKey === 'left') {
    x = worldEdges.min.x;
    y = getRandomInt(visibleEdges.top, visibleEdges.bottom);
  }

  return new THREE.Vector3(x, y, depth);
}

function clearShapes(scene, world) {
  SHAPES_WITH_TRAJECTORIES.forEach(({ shape, body }) => {
    scene.remove(shape);
    world.remove(body);
  });
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
