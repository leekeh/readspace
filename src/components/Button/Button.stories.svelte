<script context="module">
  import Button from "./Button.svelte";

  export const meta = {
    title: "Components/Button",
    component: Button,
    parameters: {
      docs: {
        description: {
          component: `Button is a flexible component that renders either a html \`button\` or \`a\`, 
            depending on the props passed. It does not have any custom logic and depends on the 
            built-in HTML functionalities. `,
        },
      },
    },
  };
</script>

<script>
  import { PlusIcon } from "@icons";
  import { Story, Template } from "@storybook/addon-svelte-csf";

  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<Template let:args>
  <!--👇 'on:click' allows to forward event to addon-actions  -->
  <Button {...args} on:click on:click={handleClick}>
    You clicked: {count}
  </Button>
</Template>

<Story name="Default" args={{}} />

<Story
  name="`href` renders as anchor"
  args={{ href: "http://www.example.com" }}
/>

<Story name="Style property" args={{ style: "width: 100%" }} />

<Story name="Using icon slot" args={{}}>
  <Button on:click on:click={handleClick}>
    You clicked: {count}
    <PlusIcon slot="icon" />
  </Button>
</Story>
