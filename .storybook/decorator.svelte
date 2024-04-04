<script lang="ts">
  import { initializeTheme } from "@reader";
  import { onMount } from "svelte";
  onMount(() => {
    initializeTheme();
  });
</script>

<slot />
