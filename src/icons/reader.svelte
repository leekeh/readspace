<script lang="ts">
  import IconWrapper from "./IconWrapper.svelte";
  export let size = 24;
</script>

<IconWrapper {size}>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
  <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
  <path d="M3 6l0 13" />
  <path d="M12 6l0 13" />
  <path d="M21 6l0 13" />
</IconWrapper>
