import { getLocalStorageKey } from './localStorage.js';

export function getCameraVideoElement(deviceId, width = 640, height = 480) {
  return new Promise((resolve, reject) => {
    if (!navigator?.mediaDevices) {
      reject('No media devices');
    }

    navigator.mediaDevices
      .getUserMedia({ video: { deviceId, width, height } })
      .then((stream) => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          resolve(video);
        };
      })
      .catch(reject);
  });
}

export async function getVideoInputDevices() {
  if (!navigator?.mediaDevices) {
    return [];
  }

  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter(({ kind }) => kind === 'videoinput');
}

export async function getVideoInputDeviceId() {
  const videoInputDevices = await getVideoInputDevices();
  const defaultInputDeviceId = videoInputDevices[0]?.deviceId ?? null;
  return getLocalStorageKey('videoDeviceId') ?? defaultInputDeviceId;
}
