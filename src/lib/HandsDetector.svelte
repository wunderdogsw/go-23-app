<script lang="ts">
  import { onDestroy, onMount, setContext, getContext } from 'svelte'

  import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
  import '@tensorflow/tfjs-core'
  import '@tensorflow/tfjs-backend-webgl'
  import '@mediapipe/hands'

  import { key } from './hands-detector'
  import { key as videoKey } from './camera-video'

  let video
  let detector

  const createDetector = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands
    const detectorConfig = {
      runtime: 'mediapipe', // or 'tfjs',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
      modelType: 'full',
    }
    return await handPoseDetection.createDetector(model, detectorConfig)
  }

  setContext(key, {
    getDetector: () => detector,
  })

  const { getVideo } = getContext(videoKey)

  onMount(async () => {
    video = getVideo()
    detector = await createDetector()
  })

  onDestroy(() => {
    detector.dispose()
  })
</script>

{#if detector}
  <slot />
{/if}
