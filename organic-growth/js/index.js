import * as THREE from "three";

function resetCanvas() {
  scene.clear();
}

function drawInitialSphere(pose) {
  if (!pose.keypoints) {
    return;
  }

  const headKeypoint = pose.keypoints[keypointNames.indexOf("nose")];

  // Add the first sphere to the scene
  const sphere = createInitialSphere(headKeypoint);
  scene.add(sphere);
  console.log("Added initial sphere", sphere.position);

  let sphereCount = 1;
  async function grow(cloneFrom) {
    const newSphere = drawOrganicSphere(cloneFrom);
    setTimeout(() => {
      if (sphereCount < 10) {
        requestAnimationFrame(() => grow(newSphere));
        sphereCount++;
      }
    }, 500);
  }

  grow(sphere);
}

function drawOrganicSphere(cloneFrom) {
  const newSphere = createSphere(cloneFrom);
  scene.add(newSphere);
  console.log("Added new sphere", newSphere.position);
  return newSphere;
}

function createInitialSphere(centerPoint) {
  const pointX = getObjectX(centerPoint.x);
  const pointY = getObjectY(centerPoint.y);

  const width = 0.1;
  const geometry = new THREE.SphereGeometry(width, 32, 16);
  const color = hexStringToHex(colors[0]);
  const material = new THREE.MeshMatcapMaterial({ color });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(pointX, pointY);

  return sphere;
}

let currentColorIndex = 0;
function createSphere(cloneFrom) {
  currentColorIndex++;
  if (currentColorIndex === colors.length) {
    currentColorIndex = 0;
  }

  const color = hexStringToHex(colors[currentColorIndex]);
  const material2 = new THREE.MeshBasicMaterial({ color });
  const newSphere = cloneFrom.clone(); // create a copy of sphere
  newSphere.material = material2;
  const positionX = getRandomShift(newSphere.position.x);
  const positionY = getRandomShift(newSphere.position.y);
  newSphere.position.set(positionX, positionY, newSphere.position.z);

  return newSphere;
}

function getRandomShift(originalValue) {
  return originalValue * Math.random() * 0.4 - 0.2;
}

/****************************************************/
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

function drawResults(poses) {
  if (!poses.length) {
    return;
  }

  //resetCanvas();
  drawInitialSphere(poses[0]);
  renderer.render(scene, camera);
}

function render(detector) {
  async function posture() {
    const estimationConfig = {};
    const poses = await detector.estimatePoses(video, estimationConfig);
    drawResults(poses);
    //requestAnimationFrame(posture);
  }

  posture();
}

async function init() {
  await getVideoCamera();
  const detector = await getDetector();
  render(detector);
}

init();
