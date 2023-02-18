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

const poseObjectsMap = new Map();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

const visibleWidth = visibleWidthAtZDepth();
const visibleHeight = visibleHeightAtZDepth();
//createPostureObjects();

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

// function createPostureObjects() {
//   poseObjectsMap.clear();
//   createDebug();
//   createHead();
//   createArm("left");
//   createArm("right");
// }

/*
 * param: handedness - left or right
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
  cylinder.position.copy(pointA);
  cylinder.quaternion.copy(quaternion);
  cylinder.scale.set(1, 1, 1);

  //poseObjectsMap.set(bodyPartName, cylinder);
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
  const material = new THREE.MeshMatcapMaterial({ color: colors[3] });
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
  poseObjectsMap.set("debug", debug);
}

function drawHead(headKeypoint) {
  if (!headKeypoint || !keypointPassesThreshold(headKeypoint)) return;

  const head = createHead(headKeypoint);
  scene.add(head);
  //poseObjectsMap.set("head", head);

  //console.log(head.position);
  //head.visible = true;
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

// // Thank you chatGPT
// // Well it didn't really work
// function relocateArm(elbowKeypoint, wristKeypoint, handedness) {
//   if (
//     !elbowKeypoint ||
//     !wristKeypoint ||
//     !keypointPassesThreshold(elbowKeypoint) ||
//     !keypointPassesThreshold(wristKeypoint)
//   ) {
//     return;
//   }
//   console.log("relocate", { elbowKeypoint, wristKeypoint, handedness });

//   const arm = poseObjectsMap.get(`${handedness}_arm`);

//   // Define the points
//   const point1 = new THREE.Vector3(elbowKeypoint.x, elbowKeypoint.y, 0); //elbowKeypoint.z);
//   const point2 = new THREE.Vector3(wristKeypoint.x, wristKeypoint.y, 0); // wristKeypoint.z);

//   // Calculate the direction from point1 to point2
//   const direction = new THREE.Vector3().subVectors(point2, point1).normalize();

//   // Set the position of the cylinder to the midpoint between point1 and point2
//   const midpoint = new THREE.Vector3().addVectors(point1, point2).multiplyScalar(0.5);
//   //arm.position.copy(midpoint);

//   // Set the quaternion of the cylinder to rotate it to the correct orientation
//   arm.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

//   arm.lookAt(point2);
//   arm.visible = true;
//   console.log({ arm, direction });
// }

function resetPoseObjects() {
  // poseObjectsMap.forEach((object) => {
  //   scene.remove(object);
  //   //object.visible = false;
  // });
  // poseObjectsMap.clear();
  scene.clear();
}

function drawResult(pose) {
  if (!pose.keypoints) {
    return;
  }

  resetPoseObjects();
  //poseObjectsMap.clear();
  //createPostureObjects(); // I probably don't need the objects in a set but I'm keeping it for now
  const headKeypoint = pose.keypoints[keypointNames.indexOf("nose")];
  drawHead(headKeypoint);
  // const leftWristKeypoint = pose.keypoints[keypointNames.indexOf("left_wrist")];
  // const leftElbowKeypoint = pose.keypoints[keypointNames.indexOf("left_elbow")];
  // const leftShoulderKeypoint = pose.keypoints[keypointNames.indexOf("left_shoulder")];
  // drawArm(leftElbowKeypoint, leftWristKeypoint, "left");
  // drawArm(leftElbowKeypoint, leftShoulderKeypoint, "left");
  const rightWristKeypoint = pose.keypoints[keypointNames.indexOf("right_wrist")];
  const rightElbowKeypoint = pose.keypoints[keypointNames.indexOf("right_elbow")];
  const rightShoulderKeypoint = pose.keypoints[keypointNames.indexOf("right_shoulder")];
  //drawArm(rightElbowKeypoint, rightWristKeypoint, "right");
  //drawArm(rightElbowKeypoint, rightShoulderKeypoint, "right");
  drawDebug(rightWristKeypoint);
  drawDebug(rightElbowKeypoint);
  drawDebug(rightShoulderKeypoint);
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
