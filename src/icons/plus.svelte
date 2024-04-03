<script lang="ts">
  import IconWrapper from "./IconWrapper.svelte";
  export let size = 24;
</script>

<IconWrapper {size}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 5l0 14" />
  <path d="M5 12l14 0" />
</IconWrapper>
