<script lang="ts">
  import { getContext, onDestroy, onMount } from 'svelte'

  // reference: https://github.com/tensorflow/tfjs-models/blob/master/hand-pose-detection/demos/live_video/src/camera.js
  import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
  import '@tensorflow/tfjs-core'
  import '@tensorflow/tfjs-backend-webgl'
  import '@mediapipe/hands'

  import { key } from './camera-video'

  export let width = 640
  export let height = 480

  const { getVideo } = getContext(key)

  let video
  let canvas
  let ctx
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

  const drawCtx = () => {
    ctx.drawImage(video, 0, 0, width, height)
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

  const drawPoint = (y, x, r) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
  }

  const drawKeypoints = (keypoints, handedness) => {
    const keypointsArray = keypoints
    ctx.fillStyle = handedness === 'Left' ? '#FFFE18' : '#881BFF'
    ctx.strokeStyle = 'White'
    ctx.lineWidth = 3

    for (let i = 0; i < keypointsArray.length; i++) {
      const y = keypointsArray[i].x
      const x = keypointsArray[i].y
      drawPoint(x - 2, y - 2, 20)
    }
  }

  const drawResult = (hand) => {
    if (hand.keypoints != null) {
      drawKeypoints(hand.keypoints, hand.handedness)
    }
  }

  const renderResult = async () => {
    try {
      if (!detector) {
        return
      }
      const hands = await estimateHands()

      drawCtx()

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
    ctx = canvas.getContext('2d')
    detector = await createDetector()
    await renderPrediction()
  })

  onDestroy(() => {
    window.cancelAnimationFrame(rafId)
    detector.dispose()
  })
</script>

<canvas bind:this={canvas} {width} {height} />
