export async function getVideoCamera() {
  try {
    const video = document.createElement('video')

    if (!navigator?.mediaDevices) {
      throw Error('No mediaDevices')
    }

    const stream = await navigator.mediaDevices
      .getUserMedia({ video: true })
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
