<script lang="ts">
  export let routes: { url: string; icon: string; text: string }[];
  import NavItem from "./NavItem.svelte";
  import Cursor from "./Cursor.svelte";
  import SkipButton from "./SkipButton.svelte";
  let navRef: HTMLElement;
</script>

<nav bind:this={navRef}>
  <Cursor {navRef} />
  <ul>
    <SkipButton />
    {#each routes as route}
      <NavItem {...route} />
    {/each}
  </ul>
</nav>

<style>
  /* :global(body) {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100dvh;
  }

  :global(main) {
    flex: 1;
  } */

  nav {
    cursor: none;
    order: 1;
  }

  ul {
    border-top: 1.5px solid var(--foreground);
    width: 100%;
    height: 100%;
    background-color: var(--background);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    list-style: none;
  }

  @media (min-width: 700px) {
    :global(body) {
      flex-direction: row;
    }

    nav {
      height: 100%;
      order: 0;
    }

    ul {
      border-top: none;
      border-right: 1.5px solid var(--foreground);
      flex-direction: column;
      justify-content: center;
      gap: 24px;
    }
  }
</style>
