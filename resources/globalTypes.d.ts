declare global {
  interface MouseEvent {
    target: HTMLElement | null;
  }
  interface FocusEvent {
    target: HTMLElement;
  }
}

export {};
