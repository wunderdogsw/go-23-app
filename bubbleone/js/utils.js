let sizes = {
  video: {
    width: 640,
    height: 480,
  },
  scene: {
    width: null,
    height: null
  }
}

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

export function setSceneSize(camera) {
  const height = visibleHeightAtZDepth(camera);
  const width = visibleWidthAtZDepth(camera, height);

  sizes.scene = { width, height };
}

export function getSizes() {
  return sizes;
}

export function getObjectX(videoX) {
  // this calculation flips the x coordinate for a mirror effect
  return ((sizes.video.width - videoX) / sizes.video.width - 0.5) * sizes.scene.width;
}

export function getObjectY(videoY) {
  return (0.5 - videoY / sizes.video.height) * sizes.scene.height;
}
