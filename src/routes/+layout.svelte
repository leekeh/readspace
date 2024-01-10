<script lang="ts">
  import { NavBar } from "@components";
  import { initializeEnvironmentStores } from "@stores";
  import { routes } from "@util";
  import { onMount } from "svelte";
  export let data;
  $: ({ title, hasNavBar } = data);
  //  todo: get theme color from settings
  const color = "#19483a";
  onMount(() => {
    initializeEnvironmentStores();
  });
</script>

<svelte:head>
  <meta name="theme-color" content={color} />
  <title>ReadSpace - {title}</title>
</svelte:head>

{#if hasNavBar}
  <NavBar {routes} />
  <main id="main">
    <slot />
  </main>
{:else}
  <slot />
{/if}

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

  main {
    overflow-y: auto;
  }

  :global(::selection) {
    background-color: var(--highlight-color);
  }

  /* CSS Variables */
  :root {
    --background: #fffffb;
    --foreground: #3d3d3d;
    --background-inverted: var(--foreground);
    --foreground-inverted: var(--background);
    --hue: 62, 0, 255;
    --foreground-colored: rgb(var(--hue), 0.8);
    --highlight-color: rgb(var(--hue), 0.2);
    --box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    --border-width: 2px;
    --border-radius: 2rem;
    --border: var(--border-width) solid var(--foreground);
    accent-color: var(--highlight-color);
  }

  /* CSS Reset
	http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

  :global(
      html,
      body,
      div,
      span,
      applet,
      object,
      iframe,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      blockquote,
      pre,
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strike,
      strong,
      sub,
      sup,
      tt,
      var,
      b,
      u,
      i,
      center,
      dl,
      dt,
      dd,
      ol,
      ul,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      article,
      aside,
      canvas,
      details,
      embed,
      figure,
      figcaption,
      footer,
      header,
      hgroup,
      menu,
      nav,
      output,
      ruby,
      section,
      summary,
      time,
      mark,
      audio,
      video
    ) {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  :global(
      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      hgroup,
      menu,
      nav,
      section
    ) {
    display: block;
  }
  :global(body) {
    line-height: 1;
  }
  :global(ol, ul) {
    list-style: none;
  }
  :global(blockquote, q) {
    quotes: none;
  }
  :global(blockquote:before, blockquote:after, q:before, q:after) {
    content: "";
    content: none;
  }
  :global(table) {
    border-collapse: collapse;
    border-spacing: 0;
  }

  :global(a) {
    color: inherit;
    text-decoration: none;
  }
</style>
