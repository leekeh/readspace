<script lang="ts">
  import DOMPurify from "isomorphic-dompurify";
  import { parse, Renderer, use } from "marked";
  import { prerenderText } from "./prerenderText";

  import { settings } from "@stores";
  console.log($settings.readMode);

  import Menu from "./Menu/Menu.svelte";
  import { testFile } from "./testfile";
  import { onMount } from "svelte";

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
    const parser = new DOMParser();
    const doc = parser.parseFromString(parsedText, "text/html");
    const elements = Array.from(doc.body.children);
    if (elements.length === 0) {
      console.log("Empty document");
      return;
    }
    const remainingHTML = prerenderText(elements, prerenderNode);
    readerNode.insertAdjacentHTML("afterbegin", prerenderNode.innerHTML);
    prerenderNode.innerHTML = "";
    //TODO: Keep remainder HTML as buffer, figure out pagination.
    //Maybe keep rendering in the background and create an array of pages.
  }

  onMount(() => {
    loadText();
  });

  const readerId = "readerCanvas";
</script>

<div class="container">
  <Menu {readerId} />

  <main id={readerId} bind:this={readerNode}>
    <div id="prerenderNode" bind:this={prerenderNode} aria-hidden></div>
  </main>
</div>

<style>
  main {
    position: relative;
    flex-grow: 1;
  }

  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
    width: 100vw;
  }

  #prerenderNode {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow-x: auto;
  }
</style>
