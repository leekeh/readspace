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
