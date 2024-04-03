<script context="module">
  import Link from "./Link.svelte";

  export const meta = {
    title: "Components/Link",
    component: Link,
    parameters: {
      docs: {
        description: {
          component: `Link is a flexible component that renders either a html \`button\` or \`a\`, 
            depending on the props passed. It does not have any custom logic and depends on the 
            built-in HTML functionalities. `,
        },
      },
    },
  };
</script>

<script>
  import { UserIcon } from "@icons";
  import { Story, Template } from "@storybook/addon-svelte-csf";

  let count = 0;
  function handleClick() {
    count += 1;
  }
</script>

<Template let:args>
  <!--👇 'on:click' allows to forward event to addon-actions  -->
  <Link {...args}>Click me</Link>
</Template>

<Story name="Default" args={{ href: "http://www.example.com" }} />

<Story name="Omit href to use as button" args={{}}>
  <Link on:click on:click={handleClick}>
    You clicked: {count}
  </Link>
</Story>

<Story
  name="Using icons"
  args={{}}
  parameters={{
    docs: {
      description: {
        story: `\`Link\` component allows to use slots to add icons to the left or right of the text,
        using the \`iconLeft\` and \`iconRight\` slots.`,
      },
    },
  }}
>
  <Link href="/profile">
    <UserIcon slot="iconLeft" />
    Profile
  </Link>
</Story>
