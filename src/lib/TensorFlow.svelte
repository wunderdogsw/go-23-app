<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte'

  // reference: https://github.com/tensorflow/tfjs-models/blob/master/hand-pose-detection/demos/live_video/src/camera.js
  import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
  import '@tensorflow/tfjs-core'
  import '@tensorflow/tfjs-backend-webgl'
  import '@mediapipe/hands'

  import { key as videoKey } from './camera-video'
  import { key as canvasKey } from './canvas'

  const { getVideo } = getContext(videoKey)
  const { drawFullImage, drawPoint } = getContext(canvasKey)

  let video
  let detector
  let rafId

  const createDetector = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands
    const detectorConfig = {
      runtime: 'mediapipe', // or 'tfjs',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
      modelType: 'full',
    }
    return await handPoseDetection.createDetector(model, detectorConfig)
  }

  const estimateHands = async () =>
    await detector.estimateHands(video, {
      flipHorizontal: false,
    })

  const drawVideo = () => {
    drawFullImage(video)
  }

  const drawResults = (hands) => {
    hands.sort((hand1, hand2) => {
      if (hand1.handedness < hand2.handedness) return 1
      if (hand1.handedness > hand2.handedness) return -1
      return 0
    })

    // Pad hands to clear empty scatter GL plots.
    while (hands.length < 2) hands.push({})

    for (let i = 0; i < hands.length; ++i) {
      // Third hand and onwards scatterGL context is set to null since we
      // don't render them.
      drawResult(hands[i])
    }
  }

  const drawKeypoints = ({ keypoints, handedness }) => {
    const keyPointsArray = keypoints
    const fillStyle = handedness === 'Left' ? '#FFFE18' : '#881BFF'

    for (let i = 0; i < keyPointsArray.length; i++) {
      const x = keyPointsArray[i].x
      const y = keyPointsArray[i].y
      drawPoint({ x: x - 2, y: y - 2, r: 20, fillStyle })
    }
  }

  const drawResult = (hand) => {
    if (hand.keypoints != null) {
      drawKeypoints(hand)
    }
  }

  const renderResult = async () => {
    try {
      if (!detector) {
        return
      }
      const hands = await estimateHands()

      drawVideo()

      if (hands?.length > 0) {
        drawResults(hands)
      }
    } catch (error) {
      window.cancelAnimationFrame(rafId)
      detector.dispose()
      detector = null
      console.error(error)
    }
  }

  const renderPrediction = async () => {
    await renderResult()
    rafId = requestAnimationFrame(renderPrediction)
  }

  onMount(async () => {
    video = getVideo()
    detector = await createDetector()
    await renderPrediction()
  })

  onDestroy(() => {
    window.cancelAnimationFrame(rafId)
    detector.dispose()
  })
</script>
