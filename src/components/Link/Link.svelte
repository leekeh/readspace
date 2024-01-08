<script lang="ts">
  export let style: string = "";
  export let href: string | undefined = undefined;
</script>

<svelte:element
  this={href ? "a" : "button"}
  {href}
  {style}
  on:click
  on:focus
  on:focusout
>
  <slot name="iconLeft" />
  <span><slot /></span>
  <slot name="iconRight" />
</svelte:element>

<style>
  button,
  a {
    position: relative;
    display: inline-block;
    color: var(--foreground-colored);
    text-decoration: none;
    transition: color 0.3s;
  }

  button::after,
  a::after {
    content: "";
    position: absolute;
    bottom: calc(var(--border-width) * -1);
    left: 0;
    width: 100%;
    height: var(--border-width);
    background-color: var(--foreground-colored);
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  a:hover,
  a:focus {
    color: var(--foreground-colored);
  }

  button:hover::after,
  a:hover::after {
    transform: scaleX(1);
  }
</style>
