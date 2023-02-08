<script lang="ts">
  import CameraVideo from './lib/CameraVideo.svelte'
  // import FaceTracker from './lib/ClmTracker.svelte'
  import TensorFlow from './lib/TensorFlow.svelte'
</script>

<main>
  <CameraVideo>
    <!--    <FaceTracker />-->
    <TensorFlow />
  </CameraVideo>
</main>
