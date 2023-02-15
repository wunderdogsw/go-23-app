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
const visibleHeight = visibleHeightAtZDepth()
const visibleWidth = visibleWidthAtZDepth()

const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const material = new THREE.MeshMatcapMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
setPositionOnCanvas(cube, 100, 50)

scene.add( cube )

renderer.render( scene, camera );

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

function setPositionOnCanvas(object, x, y) {
  // calculation => get distance from center relative to canvas, then multiply by total visible distance
  const objectX = (x / canvasWidth - 0.5) * visibleWidth
  const objectY = (0.5 - y / canvasHeight) * visibleHeight
  object.position.set(objectX, objectY)
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
    const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(keypoint.x, keypoint.y, 0)
    scene.add( cube );

    camera.position.z = 5;
    renderer.render( scene, camera );
  }
}

function drawKeypoints(keypoints) {
  for (let i = 0; i < keypoints.length; i++) {
    drawKeypoint(keypoints[i])
  }
}


function drawResult(pose) {
  if (pose.keypoints != null) {
    drawKeypoints(pose.keypoints);
  }
}

function drawResults(poses) {
  for (const pose of poses) {
    drawResult(pose);
  }
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
  // render(detector)
}

init()
