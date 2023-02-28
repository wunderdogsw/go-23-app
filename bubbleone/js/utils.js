// reference: https://codepen.io/discoverthreejs/pen/VbWLeM
export function visibleHeightAtZDepth(camera, depth = 0 ) {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if ( depth < cameraOffset ) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = camera.fov * Math.PI / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
}

export function visibleWidthAtZDepth( camera, visibleHeight ) {
  return visibleHeight * camera.aspect;
}

export function getObjectX(videoX, videoWidth, visibleWidth) {
  // this calculation flips the x coordinate for a mirror effect
  return ((videoWidth - videoX) / videoWidth - 0.5) * visibleWidth
}

export function getObjectY(videoY, videoHeight, visibleHeight) {
  return (0.5 - videoY / videoHeight) * visibleHeight
}

// source: ChatGPT
export function getRadiansAngle(startX, startY, endX, endY) {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  return Math.atan2(deltaY, deltaX);
}
