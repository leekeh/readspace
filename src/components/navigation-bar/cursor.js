let offsetLeft = 0;
let offsetTop = 0;
let xp = 0;
let yp = 0;

const cursorDefault = 24;
const cursorLarge = 44;

/**
 * Create a cursor ball that replaces the user cursor
 * @param {HTMLDataListElement | null} currentItem - Reference to the active nav item.
 * @param {HTMLElement} navElement - Reference to the navigation-bar element.
 */
export function createCursor(currentItem, navElement) {
  const cursor = Object.assign(document.createElement("div"), {
    className: "cursor",
    id: "cursor",
  });

  function setDefaultStyle() {
    cursor.style.width = `${cursorDefault}px`;
    cursor.style.height = `${cursorDefault}px`;
    cursor.style.translate = `-${cursorDefault / 2}px`;
  }

  function setLargeStyle() {
    cursor.style.width = `${cursorLarge}px`;
    cursor.style.height = `${cursorLarge}px`;
    cursor.style.translate = `-${cursorLarge / 2}px`;
  }

  /**
   * Focuses on the current element.
   * @param {boolean} [immediate] - Indicates whether the focus should happen immediately.
   */
  function focusCurrentElement(immediate) {
    if (currentItem) {
      offsetLeft = currentItem.getBoundingClientRect().left + 30;
      offsetTop = currentItem.getBoundingClientRect().top + 9;
      if (immediate) {
        xp = offsetLeft;
        yp = offsetTop;
        cursor.style.left = `${offsetLeft}px`;
        cursor.style.top = `${offsetTop}px`;
      }
    } else {
      offsetLeft = -100;
    }
  }

  navElement.addEventListener("mousemove", function (e) {
    offsetLeft = e.clientX;
    offsetTop = e.clientY;
    if (
      e.target?.tagName === "A" &&
      e.target.getAttribute("aria-current") === null
    ) {
      setLargeStyle();
    } else {
      setDefaultStyle();
    }
  });

  navElement.addEventListener("focusin", function (e) {
    offsetLeft = e.target.getBoundingClientRect().left + 30;
    offsetTop = e.target.getBoundingClientRect().top + 9;
    setLargeStyle();
  });

  navElement.addEventListener("focusout", function (e) {
    const anchors = Array.from(navElement.getElementsByTagName("a"));
    if (e.target === anchors[anchors.length - 1]) {
      focusCurrentElement();
      setDefaultStyle();
    }
  });

  navElement.addEventListener("mouseleave", function (e) {
    focusCurrentElement();
    setDefaultStyle();
  });

  setDefaultStyle();
  focusCurrentElement(true);

  setInterval(function () {
    xp += (offsetLeft - xp) / 6;
    yp += (offsetTop - yp) / 6;
    cursor.style.left = `${xp}px`;
    cursor.style.top = `${yp}px`;
  }, 20);

  return cursor;
}
