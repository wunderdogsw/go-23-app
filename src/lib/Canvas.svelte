<script lang="ts">
  import { onMount, setContext } from 'svelte'

  import { key } from './canvas'

  export let width = 640
  export let height = 480

  let canvas
  let ctx

  setContext(key, {
    getCanvas: () => canvas,
    getCtx: () => ctx,
  })

  onMount(() => {
    ctx = canvas.getContext('2d')
  })
</script>

<canvas bind:this={canvas} {width} {height} />

{#if canvas && ctx}
  <slot />
{/if}
