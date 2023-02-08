<script lang="ts">
  import CameraVideo from './lib/CameraVideo.svelte'
  // import FaceTracker from './lib/ClmTracker.svelte'
  import TensorFlow from './lib/TensorFlow.svelte'
  import Canvas from './lib/Canvas.svelte'
</script>

<main>
  <CameraVideo>
    <!--    <FaceTracker />-->
    <Canvas>
      <TensorFlow />
    </Canvas>
  </CameraVideo>
</main>
