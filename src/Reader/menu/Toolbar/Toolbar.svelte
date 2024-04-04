<script lang="ts">
  import type { Controls } from "../controls";
  import { roveTabIndex } from "@util";
  import { groupByGrouping } from "./util";

  export let controls: Controls;
  export let idControls: string;

  const groupedControls = groupByGrouping(controls);
</script>

<div
  role="toolbar"
  class="toolbar"
  aria-label="Reader settings"
  use:roveTabIndex
  aria-controls={idControls}
>
  {#each Object.entries(groupedControls) as [group, controls]}
    <div class="group" aria-label={group}>
      {#each controls as control}
        <button>{control.label}</button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .toolbar,
  .group {
    flex-direction: row;
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
    border-bottom: 1px solid var(--foreground);
  }

  .group {
    display: inline-flex;
    gap: 8px;
  }
</style>
