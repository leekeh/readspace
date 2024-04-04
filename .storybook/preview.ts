import type { Preview } from "@storybook/svelte";
import Decorator from "./decorator.svelte";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  //@ts-ignore Typing error in Storybook
  decorators: [() => Decorator],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        // The label to show for this toolbar item
        title: "Theme",
        icon: "paintbrush",
        // Array of plain string values or MenuItem shape (see below)
        items: ["light", "dark", "classic"],
      },
    },
  },
};

export default preview;
