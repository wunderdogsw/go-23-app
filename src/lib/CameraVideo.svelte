<script lang="ts">
  import { setContext } from 'svelte'
  import { key } from './camera-video'

  export let width = 640
  export let height = 480

  let video

  setContext(key, {
    getVideo: () => video,
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
    {width}
    {height}
    preload="auto"
    playsinline
    autoplay
  />
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
    height: 300px;
    position: relative;
    width: 400px;
  }

  video,
  .slot {
    left: 0;
    position: absolute;
    top: 0;
  }
</style>
