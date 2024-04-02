<script lang="ts">
  import { Link } from "@components";
  import { settings } from "@stores";
  console.log($settings.readMode);
  import { testFile } from "./testfile";
</script>

Readmode: {$settings.readMode} <br />
