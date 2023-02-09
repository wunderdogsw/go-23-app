<script lang="ts">
  import { onDestroy, onMount, setContext, getContext } from 'svelte'

  import '@tensorflow/tfjs-core'
  import '@tensorflow/tfjs-backend-webgl'
  import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'

  import { key } from './hands-detector'
  import { key as videoKey } from './camera-video'

  let video
  let detector

  const createDetector = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands
    const detectorConfig = {
      // mediapipe runtime doesn't work when building :(
      maxHands: 2,
      runtime: 'tfjs',
      modelType: 'lite',
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
