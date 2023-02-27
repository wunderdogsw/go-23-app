import * as THREE from "three";

const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const keypointNames = [
  "nose",
  "left_eye_inner",
  "left_eye",
  "left_eye_outer",
  "right_eye_inner",
  "right_eye",
  "right_eye_outer",
  "left_ear",
  "right_ear",
  "mouth_left",
  "mouth_right",
  "left_shoulder",
  "right_shoulder",
  "left_elbow",
  "right_elbow",
  "left_wrist",
  "right_wrist",
  "left_pinky",
  "right_pinky",
  "left_index",
  "right_index",
  "left_thumb",
  "right_thumb",
  "left_hip",
  "right_hip",
  "left_knee",
  "right_knee",
  "left_ankle",
  "right_ankle",
  "left_heel",
  "right_heel",
  "left_foot_index",
  "right_foot_index",
];
const colors = ["FFFF05", "750DFF", "4DEBA2", "FDB0F3", "FA58E9"];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

const visibleWidth = visibleWidthAtZDepth();
const visibleHeight = visibleHeightAtZDepth();

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.render(scene, camera);

// reference: https://codepen.io/discoverthreejs/pen/VbWLeM
function visibleHeightAtZDepth(depth = 0) {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}

function visibleWidthAtZDepth(depth = 0) {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
}

function getObjectX(canvasX) {
  return (canvasX / canvasWidth - 0.5) * visibleWidth;
}

function getObjectY(canvasY) {
  return (0.5 - canvasY / canvasHeight) * visibleHeight;
}

function hexStringToHex(hexString) {
  return parseInt(hexString, 16);
}

function getKeypointColor(keypointName) {
  if (keypointName.indexOf("left") > -1) {
    return colors[0];
  }
  if (keypointName.indexOf("right") > -1) {
    return colors[1];
  }

  return colors[4];
}

/*
 * Thank you ChatGPT
 */
function createArm(handedness, startPoint, endPoint) {
  const bodyPartName = `${handedness}_arm`;

  // Define the start and end points
  const startX = getObjectX(startPoint.x);
  const startY = getObjectY(startPoint.y);
  const endX = getObjectX(endPoint.x);
  const endY = getObjectY(endPoint.y);

  const pointA = new THREE.Vector3(startX, startY, 0); // Starting point
  const pointB = new THREE.Vector3(endX, endY, 0); // Ending point

  // Calculate the distance between the two points
  const height = pointA.distanceTo(pointB);

  // Calculate the axis of the cylinder
  const direction = new THREE.Vector3().subVectors(pointB, pointA).normalize();

  // Calculate the quaternion rotation to align the cylinder with the axis
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const width = 0.4;
  const radialSegments = 32;
  const geometry = new THREE.CylinderGeometry(width, width, height, radialSegments);
  const color = hexStringToHex(getKeypointColor(bodyPartName));
  const material = new THREE.MeshMatcapMaterial({ color });
  const cylinder = new THREE.Mesh(geometry, material);

  // Calculate the midpoint between the two points
  const midpoint = new THREE.Vector3().addVectors(pointA, pointB).multiplyScalar(0.5);

  cylinder.position.copy(midpoint);
  cylinder.quaternion.copy(quaternion);
  cylinder.scale.set(1, 1, 1);

  return cylinder;
}

function createTorso(leftShoulderKeypoint, rightShoulderKeypoint, leftHipKeypoint, rightHipKeypoint) {
  const bodyPartName = `torso`;

  const midpointShoulders = {
    x: (leftShoulderKeypoint.x + rightShoulderKeypoint.x) / 2,
    y: (leftShoulderKeypoint.y + rightShoulderKeypoint.y) / 2,
  };
  const midpointHips = {
    x: (leftHipKeypoint.x + rightHipKeypoint.x) / 2,
    y: (leftHipKeypoint.y + rightHipKeypoint.y) / 2,
  };

  // Define the start and end points
  const startX = getObjectX(midpointShoulders.x);
  const startY = getObjectY(midpointShoulders.y);
  const endX = getObjectX(midpointHips.x);
  const endY = getObjectY(midpointHips.y);

  const pointA = new THREE.Vector3(startX, startY, 0); // Starting point
  const pointB = new THREE.Vector3(endX, endY, 0); // Ending point

  // Calculate the distance between the two points
  const height = pointA.distanceTo(pointB);

  // Calculate the axis of the cylinder
  const direction = new THREE.Vector3().subVectors(pointB, pointA).normalize();

  // Calculate the quaternion rotation to align the cylinder with the axis
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const width = 1; // same as head
  const radialSegments = 32;
  const geometry = new THREE.CylinderGeometry(0, width, height, radialSegments);
  const color = hexStringToHex(getKeypointColor(bodyPartName));
  const material = new THREE.MeshMatcapMaterial({ color });
  const cylinder = new THREE.Mesh(geometry, material);

  // Calculate the midpoint between the two points
  const midpoint = new THREE.Vector3().addVectors(pointA, pointB).multiplyScalar(0.5);

  cylinder.position.copy(midpoint);
  cylinder.quaternion.copy(quaternion);
  cylinder.scale.set(1, 1, 1);

  return cylinder;
}

function createHead(centerPoint) {
  const bodyPartName = `head`;

  const headX = getObjectX(centerPoint.x);
  const headY = getObjectY(centerPoint.y);

  const width = 1;
  const geometry = new THREE.SphereGeometry(width, 32, 16);
  const color = hexStringToHex(getKeypointColor(bodyPartName));
  const material = new THREE.MeshMatcapMaterial({ color });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(headX, headY);

  return sphere;
}

function createDebug(debugKeypoint) {
  const bodyPartName = `debug`;
  const debugX = getObjectX(debugKeypoint.x);
  const debugY = getObjectY(debugKeypoint.y);

  const geometry = new THREE.SphereGeometry(0.1, 16, 8);
  const color = hexStringToHex(getKeypointColor(bodyPartName));
  const material = new THREE.MeshMatcapMaterial(); //({ color: colors[3] });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(debugX, debugY);
  return sphere;
}

async function getVideoCamera() {
  try {
    if (!navigator?.mediaDevices) {
      throw Error("No mediaDevices");
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };

    return video;
  } catch (error) {
    console.error(error);
  }
}

async function getDetector() {
  try {
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: "mediapipe",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
    };
    return await poseDetection.createDetector(model, detectorConfig);
  } catch (error) {
    console.error(error);
  }
}

function keypointPassesThreshold(keypoint) {
  // If score is null, just show the keypoint.
  const keypointScore = keypoint?.score != null ? keypoint.score : 1;
  const scoreThreshold = 0.85;

  return keypointScore >= scoreThreshold;
}

function drawDebug(debugKeypoint) {
  if (!debugKeypoint || !keypointPassesThreshold(debugKeypoint)) return;

  const debug = createDebug(debugKeypoint);
  scene.add(debug);
}

function drawHead(headKeypoint) {
  if (!headKeypoint || !keypointPassesThreshold(headKeypoint)) return;

  const head = createHead(headKeypoint);
  scene.add(head);
}

function drawArm(elbowKeypoint, wristKeypoint, handedness) {
  if (
    !elbowKeypoint ||
    !wristKeypoint ||
    !keypointPassesThreshold(elbowKeypoint) ||
    !keypointPassesThreshold(wristKeypoint)
  ) {
    return;
  }

  const arm = createArm(handedness, elbowKeypoint, wristKeypoint);
  scene.add(arm);
}

function drawTorso(leftShoulderKeypoint, rightShoulderKeypoint, leftHipKeypoint, rightHipKeypoint) {
  if (
    !leftShoulderKeypoint ||
    !rightShoulderKeypoint ||
    !leftHipKeypoint ||
    !rightHipKeypoint ||
    !keypointPassesThreshold(leftShoulderKeypoint) ||
    !keypointPassesThreshold(rightShoulderKeypoint) ||
    !keypointPassesThreshold(leftHipKeypoint) ||
    !keypointPassesThreshold(rightHipKeypoint)
  ) {
    return;
  }

  const torso = createTorso(leftShoulderKeypoint, rightShoulderKeypoint, leftHipKeypoint, rightHipKeypoint);
  scene.add(torso);
}

function resetCanvas() {
  scene.clear();
}

function drawResult(pose) {
  if (!pose.keypoints) {
    return;
  }

  const headKeypoint = pose.keypoints[keypointNames.indexOf("nose")];
  drawHead(headKeypoint);
  const leftShoulderKeypoint = pose.keypoints[keypointNames.indexOf("left_shoulder")];
  const leftHipKeypoint = pose.keypoints[keypointNames.indexOf("left_hip")];
  const rightShoulderKeypoint = pose.keypoints[keypointNames.indexOf("right_shoulder")];
  const rightHipKeypoint = pose.keypoints[keypointNames.indexOf("right_hip")];
  drawTorso(leftShoulderKeypoint, rightShoulderKeypoint, leftHipKeypoint, rightHipKeypoint);
  const leftWristKeypoint = pose.keypoints[keypointNames.indexOf("left_wrist")];
  const leftElbowKeypoint = pose.keypoints[keypointNames.indexOf("left_elbow")];
  drawArm(leftElbowKeypoint, leftWristKeypoint, "left");
  drawArm(leftElbowKeypoint, leftShoulderKeypoint, "left");
  const rightWristKeypoint = pose.keypoints[keypointNames.indexOf("right_wrist")];
  const rightElbowKeypoint = pose.keypoints[keypointNames.indexOf("right_elbow")];
  drawArm(rightElbowKeypoint, rightWristKeypoint, "right");
  drawArm(rightElbowKeypoint, rightShoulderKeypoint, "right");

  // drawDebug(leftShoulderKeypoint);
  // drawDebug(rightShoulderKeypoint);
  // drawDebug(leftHipKeypoint);
  // drawDebug(rightHipKeypoint);
}

function drawResults(poses) {
  if (!poses.length) {
    return;
  }

  resetCanvas();
  // It seems only one pose is returned
  for (let ix = 0; ix < poses.length; ix++) {
    drawResult(poses[ix]);
  }
  renderer.render(scene, camera);
}

function render(detector) {
  async function posture() {
    const estimationConfig = {};
    const poses = await detector.estimatePoses(video, estimationConfig);
    drawResults(poses);
    requestAnimationFrame(posture);
  }

  posture();
}

async function init() {
  await getVideoCamera();
  const detector = await getDetector();
  render(detector);
}

init();
