const previousKeys = ["ArrowLeft", "ArrowUp"];
const nextKeys = ["ArrowRight", "ArrowDown"];
const homeKeys = ["Home"];
const endKeys = ["End"];
const navigationKeys = [...previousKeys, ...nextKeys, ...homeKeys, ...endKeys];

/**
 * Creates a roving tab index for a given node.
 * Optimized for the Aria Toolbar design pattern, but can be made configurable in the future.
 * @url https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export function roveTabIndex(node: HTMLElement) {
  const focusableElements: HTMLElement[] = Array.from(
    node.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    )
  );
  const length = focusableElements.length;

  focusableElements.forEach((element, index) => {
    if (index === 0) {
      element.tabIndex = 0;
    } else {
      element.tabIndex = -1;
    }
  });

  node.addEventListener("keydown", (event: KeyboardEvent) => {
    if (navigationKeys.includes(event.key)) {
      event.preventDefault();
      const currentIndex = focusableElements.findIndex(
        (element) => element === document.activeElement
      );

      let nextIndex: number;

      if (homeKeys.includes(event.key)) {
        nextIndex = 0;
      } else if (endKeys.includes(event.key)) {
        nextIndex = length - 1;
      } else if (previousKeys.includes(event.key)) {
        nextIndex = (currentIndex - 1 + length) % length;
      } else {
        nextIndex = (currentIndex + 1) % length;
      }
      focusableElements[currentIndex].tabIndex = -1;
      focusableElements[nextIndex].focus();
      focusableElements[nextIndex].tabIndex = 0;
    }
  });
}
