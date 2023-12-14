export type Cursor = {
  size: "default" | "large";
  mode: "initial" | "pointer" | "default";
  element: HTMLDivElement;
  offset: { left: number; top: number };
};
