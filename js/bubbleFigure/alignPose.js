import { getVectorsRadiansAngle } from '../utils/three.js';
import { createPoseKeypointsMap, createVectorByKeypointName } from './keypoints.js';
import { alignGroupPhysicalBody } from './physicalBody.js';

export function alignBubbleFigurePose({ figure, pose }) {
  const { keypoints } = pose;
  const keypointsMap = createPoseKeypointsMap(keypoints);

  if (!keypointsMap.size) {
    return;
  }

  alignBubbleHead(figure, keypointsMap);
  alignBubbleBody(figure, keypointsMap);
  alignGroupPhysicalBody(figure);
}

function alignBubbleHead(figure, keypointsMap) {
  const head = figure.getObjectByName('HEAD');

  const leftOuterEyeVector = createVectorByKeypointName(keypointsMap, 'left_eye_outer');
  const rightOuterEyeVector = createVectorByKeypointName(keypointsMap, 'right_eye_outer');
  const neckVector = createVectorByKeypointName(keypointsMap, 'neck');

  if (!(leftOuterEyeVector && rightOuterEyeVector && neckVector)) {
    head.visible = false;
    return;
  }

  head.position.set(leftOuterEyeVector.x, neckVector.y + head.userData.radius * 2);

  const headAngle = getVectorsRadiansAngle(leftOuterEyeVector, rightOuterEyeVector);

  for (let i = 0; i < head.children.length; i++) {
    const bubble = head.children[i];
    bubble.rotation.z = bubble.userData.rotation.z + headAngle;
  }

  head.visible = true;
}

function alignBubbleBody(figure, keypointsMap) {
  const body = figure.getObjectByName('BODY');

  body.traverse((entry) => {
    if (entry.type === 'Group') {
      alignBubbleLine(keypointsMap, entry);
    }
  });
}

function alignBubbleLine(keypointsMap, group) {
  const { userData } = group;

  // since the entire body is traversed, some groups don't need to be drawn
  if (!userData?.startKeypointName || !userData?.endKeypointName) {
    return;
  }

  const startVector = createVectorByKeypointName(keypointsMap, userData.startKeypointName);
  const endVector = createVectorByKeypointName(keypointsMap, userData.endKeypointName);

  if (!startVector || !endVector) {
    group.visible = false;
    return;
  }

  const direction = endVector.clone().sub(startVector);
  const angle = getVectorsRadiansAngle(endVector, startVector);

  for (let i = 0; i < group.children.length; i++) {
    const bubble = group.children[i];

    const scalar = i / group.children.length;
    const position = startVector.clone().add(direction.clone().multiplyScalar(scalar));
    position.add(bubble.userData.offset);
    bubble.position.copy(position);
    bubble.rotation.z = bubble.userData.rotation.z + angle;
  }

  group.visible = true;
}
