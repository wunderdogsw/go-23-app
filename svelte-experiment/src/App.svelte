<script lang="ts">
  import CameraVideo from './lib/CameraVideo.svelte'
  import CircleHands from './lib/CircleHands.svelte'
  import Canvas from './lib/Canvas.svelte'
  import HandsDetector from './lib/HandsDetector.svelte'
</script>

<main>
  <CameraVideo>
    <Canvas>
      <HandsDetector>
        <CircleHands />
      </HandsDetector>
    </Canvas>
  </CameraVideo>
</main>
