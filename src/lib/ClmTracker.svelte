<script lang="ts">
  import clm from 'clmtrackr'
  import { key } from './camera-video'
  import { getContext, onDestroy, onMount } from 'svelte'

  export let width = 400
  export let height = 300

  let video
  let canvas
  let ctracker

  const { getVideo } = getContext(key)

  function positionLoop() {
    requestAnimationFrame(positionLoop)
    const positions = ctracker.getCurrentPosition()
    console.log({ positions })
  }

  function drawLoop() {
    requestAnimationFrame(drawLoop)
    const cc = canvas.getContext('2d')
    cc.clearRect(0, 0, canvas.width, canvas.height)
    ctracker.draw(canvas)
  }

  onMount(() => {
    ctracker = new clm.tracker()
    ctracker.init()

    video = getVideo()
    ctracker.start(video)
    drawLoop()
  })

  onDestroy(() => {
    ctracker.stop()
  })
</script>

<canvas bind:this={canvas} {width} {height} />
