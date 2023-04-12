import { getCameraVideoElement, getSelectedVideoInputDeviceId } from './media.js';
import { getParameters } from './parameters.js';
import { getSum } from './utils/maths.js';

// importing pose detection libraries locally doesn't work
const { poseDetection } = window;

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
  const videoInputDeviceId = await getSelectedVideoInputDeviceId();
  video = await getCameraVideoElement(videoInputDeviceId);

  detector = await getDetector();
}

async function getPoses() {
  if (!(detector && video)) {
    return [];
  }

  const poses = await detector.estimatePoses(video, {});

  if (!poses?.length) {
    return [];
  }

  const { keypoints } = poses[0];
  const scoreSum = getSum(keypoints, 'score');

  const { minPosesScore } = getParameters();

  if (scoreSum < minPosesScore) {
    return [];
  }

  return poses;
}

export async function detectPoses() {
  const poses = await getPoses();
  const posesExist = !!poses.length;

  const posesLost = !posesExist && hasPoses;
  const posesFound = posesExist && !hasPoses;

  hasPoses = posesExist;

  return { poses, posesLost, posesFound };
}
