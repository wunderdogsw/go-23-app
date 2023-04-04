import { getCameraVideoElement, getSelectedVideoInputDeviceId } from "./media.js";
import { getParameters } from "./parameters.js";
import { getSizes } from "./utils.js";

let video;
let detector;
let hasPoses = false;

async function getDetector() {
  try {
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
    };
    return await poseDetection.createDetector(model, detectorConfig);
  } catch (error) {
    console.error(error);
  }
}

export async function initBodyDetection() {
  const sizes = getSizes();
  const videoInputDeviceId = await getSelectedVideoInputDeviceId();
  video = await getCameraVideoElement(videoInputDeviceId, sizes.video.width, sizes.video.height);

  detector = await getDetector();
}

function calculateEstimateScore(keyPoints) {
  let estimateScore = 0;

  for (let i = 0; i < keyPoints.length; ++i) {
    estimateScore += keyPoints[i].score;
  }

  return estimateScore;
}

async function getPoses() {
  if (!(detector && video)) {
    return [];
  }

  const poses = await detector.estimatePoses(video, {});
  const hasPoses = !!poses?.length;

  if (!hasPoses) {
    return [];
  }

  const estimatePosesKeyPoints = poses[0].keypoints;
  const estimateScore = calculateEstimateScore(estimatePosesKeyPoints);

  const { minPosesScore } = getParameters();

  if (estimateScore < minPosesScore) {
    return [];
  }

  return poses;
}

export async function detectPoses() {
  const poses = await getPoses();
  const posesExist = !!poses.length;

  const posesLost = !posesExist && hasPoses;
  const posesFound = posesExist && !hasPoses;

  if (posesExist !== hasPoses) {
    hasPoses = posesExist;
  }

  return { poses, posesLost, posesFound };
}
