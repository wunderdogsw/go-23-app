export async function getVideoCamera(width = 640, height = 480) {
  try {
    const video = document.createElement('video')

    if (!navigator?.mediaDevices) {
      throw Error('No mediaDevices')
    }

    const stream = await navigator.mediaDevices
      .getUserMedia({ video: { width, height} })
    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play()
    }

    return video
  }
  catch(error) {
    console.error(error)
  }
}
