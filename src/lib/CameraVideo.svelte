<script lang="ts">
  import { setContext } from 'svelte'
  import { key } from './camera-video'

  export let width = 640
  export let height = 480

  let video
  let visibility = 'visible'

  setContext(key, {
    getVideo: () => video,
    hideVideo: () => (visibility = 'hidden'),
  })

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

<div class="wrapper">
  <video
    bind:this={video}
    style:visibility
    {width}
    {height}
    preload="auto"
    playsinline
    autoplay
  >
    <!-- required just to remove a build error -->
    <track kind="captions" />
  </video>

  {#if video}
    <div class="slot">
      <slot />
    </div>
  {/if}
</div>

{#if showError}
  <div>Can't get camera feed. Please check your browser permissions.</div>
{/if}

<style>
  .wrapper {
    position: relative;
  }

  video,
  .slot {
    transform: scale(-1, 1);
  }

  .slot {
    left: 0;
    position: absolute;
    top: 0;
  }
</style>
