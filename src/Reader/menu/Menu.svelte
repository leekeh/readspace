
<script lang="ts">
    import { isDesktop } from "@stores";
    import Toolbar from "./Toolbar/Toolbar.svelte";
    import { controls } from "./controls";

    export let readerId: string;
</script>

{#if $isDesktop}
    <Toolbar {controls} idControls={readerId}/>
{:else}
    <p> Mobile menu not yet implemented </p>
{/if}
