import { getVectorsRadiansAngle } from '../utils/three';
import { createPoseKeypointsMap, createVectorByKeypointName } from './keypoints';
import { alignMeshPhysicalBody } from './physicalBody';

export function alignBubbleFigurePose({ figure, pose }: any) {
  const { keypoints } = pose;
  const keypointsMap = createPoseKeypointsMap(keypoints);

  if (!keypointsMap.size) {
    return;
  }

  alignBubbleHead(figure, keypointsMap);
  alignBubbleBody(figure, keypointsMap);
}

function alignBubbleHead(figure: any, keypointsMap: any) {
  const head = figure.getObjectByName('HEAD');

  const leftOuterEyeVector = createVectorByKeypointName(keypointsMap, 'left_eye_outer');
  const rightOuterEyeVector = createVectorByKeypointName(keypointsMap, 'right_eye_outer');
  const noseVector = createVectorByKeypointName(keypointsMap, 'nose');
  const neckVector = createVectorByKeypointName(keypointsMap, 'neck');

  if (!(leftOuterEyeVector && rightOuterEyeVector && neckVector && noseVector)) {
    head.visible = false;
    return;
  }

  const y = neckVector.y + head.userData.radius * 2;
  head.position.set(noseVector.x, y);

  const headAngle = getVectorsRadiansAngle(leftOuterEyeVector, rightOuterEyeVector);

  for (let i = 0; i < head.children.length; i++) {
    const bubble = head.children[i];
    bubble.rotation.z = bubble.userData.rotation.z + headAngle;
    alignMeshPhysicalBody(bubble);
  }

  head.visible = true;
}

function alignBubbleBody(figure: any, keypointsMap: any) {
  const body = figure.getObjectByName('BODY');

  body.traverse((entry: any) => {
    if (entry.type === 'Group') {
      alignBubbleLine(keypointsMap, entry);
    }
  });
}

function alignBubbleLine(keypointsMap: any, group: any) {
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

    alignMeshPhysicalBody(bubble);
  }

  group.visible = true;
}
