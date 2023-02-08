<script lang="ts">
  import { onMount, setContext } from 'svelte'

  import { key } from './canvas'

  export let width = 640
  export let height = 480

  let canvas
  let ctx

  const drawFullImage = (image) => {
    ctx.drawImage(image, 0, 0, width, height)
  }

  const drawPoint = ({ x, y, r, fillStyle }) => {
    ctx.beginPath()
    ctx.fillStyle = fillStyle
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
  }

  setContext(key, {
    getCanvas: () => canvas,
    getCtx: () => ctx,
    drawFullImage,
    drawPoint,
  })

  onMount(() => {
    ctx = canvas.getContext('2d')
  })
</script>

<canvas bind:this={canvas} {width} {height} />

{#if canvas && ctx}
  <slot />
{/if}
