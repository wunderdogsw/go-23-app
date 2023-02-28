export function getCameraVideo(width = 640, height = 480) {
  return new Promise((resolve, reject) => {
    if (!navigator?.mediaDevices) {
      reject('No media devices')
    }

    navigator.mediaDevices.getUserMedia({ video: { width, height} })
      .then((stream) => {
        const video = document.createElement('video')
        video.srcObject = stream
        video.onloadedmetadata = () => {
          video.play()
          resolve(video)
        }
      }).catch(reject)
  })
}
