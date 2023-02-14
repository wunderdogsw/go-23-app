const video = document.querySelector('#video')
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');


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

function clearCtx() {
  ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);
}

function drawKeypoint(keypoint) {
  // If score is null, just show the keypoint.
  const score = keypoint?.score != null ? keypoint.score : 1;
  const scoreThreshold = 0.85;

  if (score >= scoreThreshold) {
    const circle = new Path2D();
    circle.arc(keypoint.x, keypoint.y, 10, 0, 2 * Math.PI);
    ctx.fill(circle);
    ctx.stroke(circle);
  }
}

/**
 * Draw the keypoints on the video.
 * @param keypoints A list of keypoints.
 */
function drawKeypoints(keypoints) {
  ctx.fillStyle = 'Green';
  ctx.strokeStyle = 'Green';
  ctx.lineWidth = 2;

  for (let i = 0; i < keypoints.length; i++) {
    drawKeypoint(keypoints[i])
  }
}

/**
 * Draw the keypoints and skeleton on the video.
 * @param pose A pose with keypoints to render.
 */
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
    clearCtx()
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
