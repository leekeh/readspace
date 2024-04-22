<script lang="ts">
  import DOMPurify from "isomorphic-dompurify";
  import { parse, use } from "marked";
  import { preparePages } from "./preparePages";
  import Loader from "./Loader/Loader.svelte";

  import { settings } from "@stores";
  console.log($settings.readMode);

  import Menu from "./Menu/Menu.svelte";
  import { testFile } from "./testfile";
  import { onMount } from "svelte";

  let isLoading = $state(true);
  let pageIndex = $state(0);
  let pagesTemp: {
    HTML: string[];
    headings: { id: string; text: string }[];
  }[] = $state([]);

  let prerenderNode: HTMLDivElement;
  let readerNode: HTMLElement;
  async function loadText() {
    const input = (await testFile.text()).replace(`\``, "");
    use({
      hooks: {
        postprocess: function sanitizeHTML(html) {
          return DOMPurify.sanitize(html);
        },
      },
    });
    const parsedText = await parse(input);
    const { amount, isBlank, pages, headings } = preparePages(
      parsedText,
      prerenderNode
    );
    pagesTemp = pages;
    isLoading = false;
  }

  onMount(() => {
    loadText();
  });

  const readerId = "readerCanvas";
</script>

<div class="container">
  <Menu {readerId} />

  <main
    class="reader"
    id={readerId}
    bind:this={readerNode}
    aria-busy={isLoading}
  >
    {#if isLoading}
      <Loader />
    {/if}
    <div class="canvas" id="resultNode">{@html pagesTemp[pageIndex]}</div>
    <div
      class="canvas"
      id="prerenderNode"
      bind:this={prerenderNode}
      aria-hidden
    ></div>
  </main>
  <button on:click={() => pageIndex++}>Next page</button>
</div>

<style>
  @import "./readerStyles.css";

  main {
    position: relative;
    flex-grow: 1;
    overflow: auto;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    width: 100vw;
  }

  .canvas {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  #prerenderNode {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    overflow-x: auto;
    z-index: -1;
  }
</style>
