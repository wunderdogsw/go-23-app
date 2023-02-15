import * as THREE from "three";

const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let isGameOn = true;
let currentScore = 0;

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

const poseObjectsMap = new Map();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

const visibleWidth = visibleWidthAtZDepth();
const visibleHeight = visibleHeightAtZDepth();
createPostureObjects();

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

function createPostureObjects() {
  keypointNames.forEach((keypointName) => {
    const geometry = new THREE.SphereGeometry(0.1, 32, 16);
    const color = hexStringToHex(getKeypointColor(keypointName));
    const material = new THREE.MeshMatcapMaterial({ color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.visible = false;
    scene.add(sphere);
    //poseObjectsMap.set(keypointName, sphere);
  });
  createHead();
  createArm("left");
  createArm("right");
}

/*
 * param: handedness - left or right
 */
function createArm(handedness) {
  const bodyPartName = `${handedness}_arm`;
  const height = 5;
  const radialSegments = 32;
  const geometry = new THREE.CylinderGeometry(0.4, 0.4, height, radialSegments);
  const color = hexStringToHex(getKeypointColor(bodyPartName));
  const material = new THREE.MeshMatcapMaterial({ color });
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.visible = false;
  scene.add(cylinder);
  poseObjectsMap.set(bodyPartName, cylinder);
}

function createHead() {
  const bodyPartName = `head`;
  const geometry = new THREE.SphereGeometry(0.4, 32, 16);
  const color = hexStringToHex(getKeypointColor(bodyPartName));
  const material = new THREE.MeshMatcapMaterial({ color });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.visible = false;
  scene.add(sphere);
  poseObjectsMap.set(bodyPartName, sphere);
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

function keypointPassesThreshold() {
  // If score is null, just show the keypoint.
  const keypointScore = keypoint?.score != null ? keypoint.score : 1;
  const scoreThreshold = 0.85;

  return keypointScore >= scoreThreshold;
}

function drawHead(headKeypoint) {
  const object = poseObjectsMap.get("head");
  const objectX = getObjectX(headKeypoint.x);
  const objectY = getObjectY(headKeypoint.y);
  object.position.set(objectX, objectY);
  object.visible = true;
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

  const headKeypoint = pose.keypoints[keypointNames.indexOf("nose")];
  drawHead(headKeypoint);
}

function drawResults(poses) {
  if (!poses.length) {
    return;
  }

  drawResult(poses[0]);
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
