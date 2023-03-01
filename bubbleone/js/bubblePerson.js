import Bubble from './Bubble.js'
import { POSE_KEYPOINT_NAMES } from './bodyDetection.js'
import { getObjectX, getObjectY } from './utils.js'

export function createPoseBubblesMap() {
  const map = new Map();

  POSE_KEYPOINT_NAMES.forEach((keypoint) => {
    const bubble = Bubble({ radius: 0.2 });
    bubble.visible = false;
    map.set(keypoint, bubble);
  });

  return map;
}

function hidePoseBubbles(poseBubblesMap) {
  poseBubblesMap.forEach((bubble) => bubble.visible = false)
}

const SCORE_THRESHOLD = 0.85;

export function drawPoseBubbles({ pose, poseBubblesMap, videoWidth, videoHeight, visibleWidth, visibleHeight }) {
  hidePoseBubbles(poseBubblesMap);

  const { keypoints } = pose;
  for (let i = 0; i < keypoints.length; i++) {
    const { score, name, x, y } = keypoints[i];

    if (score < SCORE_THRESHOLD) {
      continue;
    }

    const bubble = poseBubblesMap.get(name)
    const objectX = getObjectX(x, videoWidth, visibleWidth)
    const objectY = getObjectY(y, videoHeight, visibleHeight)
    bubble.position.set(objectX, objectY)
    bubble.visible = true
  }
}
