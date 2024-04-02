<script lang="ts">
  import { initializeEnvironmentStores, settings } from "@stores";
  import { onMount } from "svelte";
  export let data;
  $: ({ title } = data);
  onMount(() => {
    initializeEnvironmentStores();
  });
</script>

<svelte:head>
  <meta name="theme-color" content={$settings.accent} />
  <title>ReadSpace - {title}</title>
</svelte:head>
<slot />

<style>
  :global(body) {
    background-color: var(--bg-primary);
    font-family: "Source Serif Pro", serif;
    color: var(--foreground);
    background-color: var(--background);
    height: 100vh;
    max-height: 100dvh;
    position: relative;
    overflow: hidden;
  }

  :global(::selection) {
    background-color: var(--highlight-color);
  }

  /* CSS Variables */
  :root {
    --box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    --border-width: 2px;
    --border-radius: 2rem;
    --border: var(--border-width) solid var(--foreground);
    accent-color: var(--highlight-color);
  }
</style>
