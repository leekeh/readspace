<script context="module">
  import Toolbar from "./Toolbar.svelte";
  import { controls } from "../controls";
  import { Story, Template } from "@storybook/addon-svelte-csf";

  export const meta = {
    title: "Reader/Toolbar",
    component: Toolbar,
    args: {
      controls,
      idControls: "readerId",
    },
    parameters: {
      docs: {
        description: {
          component: `The \`Toolbar\` component is a container for the controls of the reader. It receives the controls and the readerId as props. Based on the controls,
          it renders the corresponding menu items. It follows the [ARIA Toolbar design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/), which includes a role="toolbar" 
          attribute and keyboard navigation using the arrow keys.
         
By default, the \`Toolbar\` is only rendered on desktop devices.`,
        },
      },
    },
  };
</script>

<Template let:args>
  <!--👇 'on:click' allows to forward event to addon-actions  -->
  <Toolbar {...args} />
  <div id="readerId"></div>
</Template>

<Story name="Story view" args={{}} />
