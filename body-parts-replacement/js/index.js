import * as THREE from "three";

const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const timer = document.querySelector("#timer");
const score = document.querySelector("#score");

let isGameOn = true;
let currentScore = 0;

const keyPointNames = [
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

const poseObjectsMap = new Map();

const scene = new THREE.Scene();
// const camera = new THREE.OrthographicCamera( canvas.width / - 2, canvas.width / 2, canvas.height / 2, canvas.height / - 2, 1, 1000 );
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

const visibleWidth = visibleWidthAtZDepth();
const visibleHeight = visibleHeightAtZDepth();
createPostureObjects();

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const color = hexStringToHex(colors[3]);
const material = new THREE.MeshMatcapMaterial({ color });
const targetCube = new THREE.Mesh(geometry, material);
targetCube.position.set(-visibleWidth / 2 + 0.5, visibleHeight / 2 - 0.5);
scene.add(targetCube);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.render(scene, camera);

// reference: ChatGPT
function getRandomFloatWithDecimalPlaces(min, max, decimalPlaces = 8) {
  const factor = Math.pow(10, decimalPlaces);
  const randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum * factor) / factor;
}

function moveTargetCube() {
  const margin = 0.5;
  const maxX = visibleWidth / 2 - margin;
  const x = getRandomFloatWithDecimalPlaces(-maxX, maxX);
  const maxY = visibleHeight / 2 - margin;
  const y = getRandomFloatWithDecimalPlaces(-maxY, maxY);
  targetCube.position.set(x, y);
}

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

function createPostureObjects() {
  keyPointNames.forEach((keypointName) => {
    const geometry = new THREE.SphereGeometry(0.4, 32, 16);
    const color = hexStringToHex(getKeypointColor(keypointName));
    const material = new THREE.MeshMatcapMaterial({ color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.visible = false;
    scene.add(sphere);
    poseObjectsMap.set(keypointName, sphere);
  });
}

// function animate() {
//   requestAnimationFrame( animate );
//
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//
//   renderer.render( scene, camera );
// }
//
// animate();

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

// simple bounding box intersection. reference: ChatGPT
function intersects(object1, object2) {
  const box1 = new THREE.Box3().setFromObject(object1);
  const box2 = new THREE.Box3().setFromObject(object2);

  return box1.intersectsBox(box2);
}

function getRandomInt(x) {
  return Math.floor(Math.random() * x);
}

function drawKeypoint(keypoint) {
  // If score is null, just show the keypoint.
  const keypointScore = keypoint?.score != null ? keypoint.score : 1;
  const scoreThreshold = 0.85;

  if (keypointScore < scoreThreshold) {
    return;
  }

  const object = poseObjectsMap.get(keypoint.name);
  const objectX = getObjectX(keypoint.x);
  const objectY = getObjectY(keypoint.y);
  object.position.set(objectX, objectY);
  object.visible = true;

  if (isGameOn && intersects(object, targetCube)) {
    moveTargetCube();
    currentScore++;
    score.innerHTML = currentScore;
  }
}

function drawKeypoints(keypoints) {
  for (let i = 0; i < keypoints.length; i++) {
    drawKeypoint(keypoints[i]);
  }
}

function resetPoseObjects() {
  poseObjectsMap.forEach((object) => {
    object.visible = false;
  });
}

function drawResult(pose) {
  if (!pose.keypoints) {
    return;
  }

  resetPoseObjects();
  drawKeypoints(pose.keypoints);
}

function drawResults(poses) {
  if (!poses.length) {
    return;
  }

  drawResult(poses[0]);
  renderer.render(scene, camera);
}

let timerIntervalId;
function updateTimer(leftTime) {
  const seconds = leftTime / 1000;
  timer.innerHTML = seconds.toFixed(0).toString();
}

function startTimer() {
  const startTime = Date.now();
  // ugly fix with one second spare so that the timer starts on time
  const totalTime = (15 + 1) * 1000;

  timerIntervalId = setInterval(() => {
    const elapsedMilliseconds = Date.now() - startTime;
    const leftTime = totalTime - elapsedMilliseconds;

    if (leftTime <= 0) {
      clearInterval(timerIntervalId);
      isGameOn = false;
      timer.innerHTML = "Game Over";
      return;
    }

    updateTimer(leftTime);
  }, 500);
}

function render(detector) {
  async function posture() {
    const estimationConfig = {};
    const poses = await detector.estimatePoses(video, estimationConfig);
    drawResults(poses);
    if (!timerIntervalId) {
      startTimer();
    }
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
