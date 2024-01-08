<script lang="ts">
  import Button from "../Button/Button.svelte";
  let isFocused = false;
</script>

<div class:focused={isFocused}>
  <Button
    href="#main"
    on:focus={() => (isFocused = true)}
    on:focusout={() => (isFocused = false)}>Skip to main content</Button
  >
</div>

<style>
  div {
    position: absolute;
    top: -1000px;
    left: -1000px;
  }

  .focused {
    top: 0;
    left: 0;
  }
</style>
