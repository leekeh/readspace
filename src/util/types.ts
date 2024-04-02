export type AnyExceptVoid =
  | number
  | string
  | boolean
  | object
  | symbol
  | bigint
  | null
  | undefined
  | Function
  | Array<any>;

export type SettingsNarrow = {
  bg: `#${string}`;
  fg: `#${string}`;
  accent: `#${string}`;
  readMode: "flip" | "scroll";
  font: "calibri";
  fontSize: `${number}px`;
};

export type Settings = {
  bg: string;
  fg: string;
  accent: string;
  readMode: string;
  font: string;
  fontSize: string;
};
