import * as THREE from 'three';

const video = document.querySelector('#video')
const canvas = document.querySelector('#canvas')
const canvasWidth = canvas.width
const canvasHeight = canvas.height

const scene = new THREE.Scene()
// const camera = new THREE.OrthographicCamera( canvas.width / - 2, canvas.width / 2, canvas.height / 2, canvas.height / - 2, 1, 1000 );
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
camera.position.z = 5;
scene.add( camera );

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.render( scene, camera );

const visibleHeight = visibleHeightAtZDepth()
const visibleWidth = visibleWidthAtZDepth()
const keyPointNames = [
  "nose", "left_eye_inner", "left_eye", "left_eye_outer", "right_eye_inner",
  "right_eye", "right_eye_outer", "left_ear", "right_ear", "mouth_left",
  "mouth_right", "left_shoulder", "right_shoulder", "left_elbow", "right_elbow",
  "left_wrist", "right_wrist", "left_pinky", "right_pinky", "left_index",
  "right_index", "left_thumb", "right_thumb", "left_hip",  "right_hip",
  "left_knee", "right_knee", "left_ankle",  "right_ankle", "left_heel",
  "right_heel", "left_foot_index", "right_foot_index"
]
const poseObjectsMap = new Map()
createPostureObjects()

// reference: https://codepen.io/discoverthreejs/pen/VbWLeM
function visibleHeightAtZDepth( depth = 0 ) {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if ( depth < cameraOffset ) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = camera.fov * Math.PI / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
}

function visibleWidthAtZDepth( depth = 0 ) {
  const height = visibleHeightAtZDepth( depth, camera );
  return height * camera.aspect;
}

function getObjectX(canvasX) {
  return (canvasX / canvasWidth - 0.5) * visibleWidth
}

function getObjectY(canvasY) {
  return (0.5 - canvasY / canvasHeight) * visibleHeight
}

function createPostureObjects() {
  keyPointNames.forEach((keypointName) => {
    const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    const material = new THREE.MeshMatcapMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    poseObjectsMap.set(keypointName, cube)
  })
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
      throw Error('No mediaDevices')
    }

    const stream = await navigator.mediaDevices
      .getUserMedia({ video: true })
    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play()
    }

    return video
  }
  catch(error) {
    console.error(error)
  }
}

async function getDetector() {
  try {
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
    };
    return await poseDetection.createDetector(model, detectorConfig);
  }
  catch(error) {
    console.error(error)
  }
}

function drawKeypoint(keypoint) {
  // If score is null, just show the keypoint.
  const score = keypoint?.score != null ? keypoint.score : 1;
  const scoreThreshold = 0.85;

  if (score >= scoreThreshold) {
    const object = poseObjectsMap.get(keypoint.name)
    const objectX = getObjectX(keypoint.x)
    const objectY = getObjectY(keypoint.y)
    object.position.set(objectX, objectY)
    renderer.render( scene, camera );
  }
}

function drawKeypoints(keypoints) {
  for (let i = 0; i < keypoints.length; i++) {
    drawKeypoint(keypoints[i])
  }
}


function drawResult(pose) {
  if (pose.keypoints) {
    drawKeypoints(pose.keypoints);
  }
}

function drawResults(poses) {
  if (!poses.length) {
    return
  }

  drawResult(poses[0]);
}


function render(detector) {
  async function posture() {
    const estimationConfig = {}
    const poses = await detector.estimatePoses(video, estimationConfig);
    drawResults(poses)
    requestAnimationFrame(posture)
  }

  posture()
}

async function init() {
  await getVideoCamera()
  const detector = await getDetector()
  render(detector)
}

init()
