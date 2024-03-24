<script lang="ts">
  export let style: string = "";
  export let href: string | undefined = undefined;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte does not recognize that this has an implicit role -->
<svelte:element
  this={href ? "a" : "button"}
  {href}
  {style}
  on:click
  on:focus
  on:focusout
>
  <slot name="icon" />
  <span><slot /></span>
</svelte:element>

<style>
  button,
  a {
    background-color: var(--background);
    color: var(--foreground);
    text-decoration: none;
    cursor: pointer;
    padding: 0.6rem 1rem;
    -webkit-tap-highlight-color: transparent;
    border-radius: var(--border-radius);
    border: var(--border);
    font-family: "Wix Madefor Display", sans-serif;
    font-size: inherit;
    transition: background-color var(--transition);
    user-select: none;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    font-size: 1.5rem;
  }

  button > *,
  a > * {
    vertical-align: middle;
  }

  button:hover,
  button:focus-visible,
  a:hover,
  a:focus-visible {
    background-color: var(--highlight-color);
  }

  a:active,
  b:active {
    box-shadow: var(--box-shadow);
  }

  button:focus-visible,
  a:focus-visible {
    /* outline: var(--border-width) solid var(--foreground);
    outline-offset: var(--border-width); */
  }
</style>
