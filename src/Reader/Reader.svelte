<script lang="ts">
  import { settings } from "@stores";
  console.log($settings.readMode);
  import Menu from "./menu/Menu.svelte";
  import { testFile } from "./testfile";
  let text = "";
  async function loadText() {
    text = await testFile.text();
  }

  loadText();

  const readerId = "readerCanvas";
</script>

<Menu {readerId} />

<main id={readerId}>
  {text}
</main>
