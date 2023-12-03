/**
 * Registers a custom component with the given name.
 * @param {import("./componentRegistry").ComponentName } name - The name of the component to register.
 */
export function registerComponent(name) {
  import(`./${name}/${name}.js`).then((module) => {
    const Component = module.default;
    customElements.define(name, Component);
  });
  const link = Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    href: `src/components/${name}/styles.css`,
  });
  document.getElementsByTagName("head")[0].appendChild(link);
}

/**
 * Registers a list of custom components.
 * @param {import("./componentRegistry").ComponentName[] } componentNames - An array of names of the components to register.
 */
export function registerComponents(componentNames) {
  componentNames.forEach((componentName) => {
    registerComponent(componentName);
  });
}
