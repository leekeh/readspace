<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Cursor } from "./cursorHelpers";
  export let navRef: HTMLElement;
  let cursorRef: HTMLElement;
  onMount(async () => {
    await tick();
    new Cursor(cursorRef, navRef);
  });
</script>

<div bind:this={cursorRef} style="left: -100px" />

<style>
  div {
    background-color: rgb(var(--accent), 0.2);
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    pointer-events: none;
    transition:
      width 0.2s ease,
      height 0.2s ease,
      translate 0.2s ease;
  }
</style>
