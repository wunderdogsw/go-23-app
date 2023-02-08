<script lang="ts">
  import CameraVideo from './lib/CameraVideo.svelte'
  // import FaceTracker from './lib/ClmTracker.svelte'
  import TensorFlow from './lib/CircleHands.svelte'
  import Canvas from './lib/Canvas.svelte'
  import HandsDetector from './lib/HandsDetector.svelte'
</script>

<main>
  <CameraVideo>
    <!--    <FaceTracker />-->
    <Canvas>
      <HandsDetector>
        <TensorFlow />
      </HandsDetector>
    </Canvas>
  </CameraVideo>
</main>
