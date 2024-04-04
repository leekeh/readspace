type MenuItem = {
  icon?: string;
  /** Label to be shown */
  label: string;
  /** Programatic setting name that should be updated */
  name: string;
  type: "color" | "font" | "fontSize" | "theme";
  category: "Theme";
  grouping: Grouping;
};

export type Grouping = "Font" | "Color";

export type Controls = MenuItem[];

export const controls: Controls = [
  {
    icon: "paintbrush",
    label: "Theme",
    name: "theme",
    type: "theme",
    category: "Theme",
    grouping: "Color",
  },
  {
    icon: "text",
    label: "Font size",
    name: "fontSize",
    type: "font",
    category: "Theme",
    grouping: "Font",
  },
  {
    icon: "text",
    label: "Font family",
    name: "fontFamily",
    type: "font",
    category: "Theme",
    grouping: "Font",
  },
  {
    icon: "paintbrush",
    label: "Background",
    name: "bg",
    type: "color",
    category: "Theme",
    grouping: "Color",
  },
  {
    icon: "paintbrush",
    label: "Foreground",
    name: "fg",
    type: "color",
    category: "Theme",
    grouping: "Color",
  },
  {
    icon: "paintbrush",
    label: "Accent",
    name: "accent",
    type: "color",
    category: "Theme",
    grouping: "Color",
  },
];
