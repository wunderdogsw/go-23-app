import { Keypoint, Pose, PoseDetector } from '@tensorflow-models/pose-detection';

import { getCameraVideoElement, getSelectedVideoInputDeviceId } from './media';
import { getParameters } from './parameters';
import { getSum } from './utils/maths';

// importing pose detection libraries locally doesn't work
// @ts-ignore
const { poseDetection } = window;

let video: HTMLVideoElement;
let detector: PoseDetector;
let hasPoses = false;

async function getDetector(): Promise<PoseDetector> {
  const model = poseDetection.SupportedModels.BlazePose;
  const detectorConfig = {
    runtime: 'mediapipe',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose',
  };
  return await poseDetection.createDetector(model, detectorConfig);
}

export async function initBodyDetection() {
  try {
    const videoInputDeviceId = await getSelectedVideoInputDeviceId();
    video = await getCameraVideoElement(videoInputDeviceId);
    detector = await getDetector();
  } catch (error) {
    console.error(error);
  }
}

async function getPoses(): Promise<Pose[]> {
  if (!(detector && video)) {
    return [];
  }

  const poses = await detector.estimatePoses(video, {});

  if (!poses?.length) {
    return [];
  }

  const { keypoints } = poses[0];
  const scoreSum = getSum<Keypoint>(keypoints, (keypoint) => keypoint?.score ?? 0);

  const { minPosesScore } = getParameters();

  if (scoreSum < minPosesScore) {
    return [];
  }

  return poses;
}

type DetectPosesReturnType = {
  poses: Pose[];
  posesLost: boolean;
  posesFound: boolean;
};
export async function detectPoses(): Promise<DetectPosesReturnType> {
  const poses = await getPoses();
  const posesExist = !!poses.length;

  const posesLost = !posesExist && hasPoses;
  const posesFound = posesExist && !hasPoses;

  hasPoses = posesExist;

  return { poses, posesLost, posesFound };
}
