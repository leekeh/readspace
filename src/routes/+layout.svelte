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
