<script lang="ts">
  let video

  const success = (stream) => {
    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play()
    }
  }

  let showError = false
  const failure = () => (showError = true)

  const getCameraFeed = () => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(success)
        .catch(failure)
      return
    }

    failure()
  }

  getCameraFeed()
</script>

<video
  bind:this={video}
  width="400"
  height="300"
  preload="auto"
  playsinline
  autoplay
/>

{#if showError}
  <div>Can't get camera feed. Please check your browser permissions.</div>
{/if}
