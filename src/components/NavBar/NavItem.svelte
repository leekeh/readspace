<script lang="ts">
  import { page } from "$app/stores";
  import { capitalizeFirstLetter } from "@util";
  export let url: string, icon: string, text: string;
  import * as Icons from "@icons";
  const iconId = `${capitalizeFirstLetter(icon)}Icon`;
  const Icon = iconId in Icons ? Icons[iconId as keyof typeof Icons] : null;
</script>

<li>
  <a href={url} aria-current={$page.url.pathname === url ? "page" : null}>
    {#if Icon}
      <Icon />
    {/if}
    {text}
  </a>
</li>

<style>
  a {
    padding: 0.5rem;
    background-color: transparent;
    border: none;
    color: inherit;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 44px;
    min-height: 44px;
    cursor: none;
    pointer-events: all;
    user-select: none;
  }

  a[aria-current] :global(> *) {
    border-radius: 999px;
    outline: 1.5px solid var(--foreground);
    position: relative;
    padding: 2px;
  }

  li,
  a :global(> *) {
    pointer-events: none;
  }
</style>
