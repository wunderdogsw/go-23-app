<script lang="ts">
  // reference: https://github.com/tensorflow/tfjs-models/blob/master/hand-pose-detection/demos/live_video/src/camera.js
  import { getContext, onDestroy, onMount } from 'svelte'

  import { key as videoKey } from './camera-video'
  import { key as canvasKey } from './canvas'
  import { key as detectorKey } from './hands-detector'

  const { getVideo, hideVideo } = getContext(videoKey)
  const { drawFullImage, drawPoint } = getContext(canvasKey)
  const { getDetector } = getContext(detectorKey)

  let video
  let detector
  let rafId

  const drawVideoCanvas = () => {
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
      const hands = await detector.estimateHands(video, {
        flipHorizontal: false,
      })
      hideVideo()
      drawVideoCanvas()

      if (hands?.length) {
        drawResults(hands)
      }
    } catch (error) {
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
    detector = getDetector()
    await renderPrediction()
  })

  onDestroy(() => {
    window.cancelAnimationFrame(rafId)
  })
</script>
