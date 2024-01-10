<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Cursor } from "./cursorHelpers";
  import { afterNavigate } from "$app/navigation";
  import { isTouchDevice } from "@stores";
  export let navRef: HTMLElement;
  let cursorRef: HTMLElement;
  let cursor: Cursor;
  onMount(async () => {
    await tick();
    cursor = new Cursor(cursorRef, navRef);
  });

  afterNavigate(() => {
    if ($isTouchDevice && cursor) {
      cursor.focusCurrentElement();
    }
  });
</script>

<div bind:this={cursorRef} style="left: -100px" />

<style>
  div {
    background-color: var(--highlight-color);
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
