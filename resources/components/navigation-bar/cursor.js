/**
 * Create a cursor ball that replaces the user cursor
 * @param {HTMLDataListElement | null} currentItem - Reference to the active nav item.
 * @param {HTMLElement} navElement - Reference to the navigation-bar element.
 */
export function createCursor(currentItem, navElement) {
  /** Bring the cursor ball to the currently active navigation item */
  function focusCurrentElement() {
    if (currentItem) {
      const imgPosition = currentItem
        .getElementsByTagName("img")[0]
        .getBoundingClientRect();
      cursor.offset = { left: imgPosition.left + 4, top: imgPosition.top };
    } else {
      cursor.offset = { left: -100, top: cursor.offset.top };
    }
  }

  navElement.addEventListener("mousemove", function (e) {
    // Cursor grows on clickable links
    cursor.size =
      e.target?.tagName === "A" &&
      e.target.getAttribute("aria-current") === null
        ? "large"
        : "default";
    cursor.mode = "pointer";
    cursor.offset = { left: e.clientX, top: e.clientY };
  });

  navElement.addEventListener("focusin", function (e) {
    const anchorPosition = e.target.getBoundingClientRect();
    const left =
      anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
    const top =
      anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;
    cursor.size = "large";
    cursor.mode = "pointer";
    cursor.offset = {
      left,
      top,
    };
  });

  navElement.addEventListener("focusout", function (e) {
    console.log(e);
    const anchors = Array.from(navElement.getElementsByTagName("a"));
    if (e.target === anchors[anchors.length - 1] || !e.relatedTarget) {
      focusCurrentElement();
      cursor.size = "default";
      cursor.mode = "default";
    }
  });

  navElement.addEventListener("mouseleave", function (e) {
    focusCurrentElement();
    cursor.size = "default";
    cursor.mode = "default";
  });

  focusCurrentElement();

  return cursor.element;
}

/**
 * The cursor configuration object.
 *
 * @type {import("./cursor").Cursor }
 */
const cursor = new Proxy(
  {
    size: "default",
    innerSize: 24,
    mode: "initial",
    offset: { top: 0, left: 0 },
    element: Object.assign(document.createElement("div"), {
      className: "cursor",
      id: "cursor",
    }),
  },
  {
    set(object, prop, value) {
      const element = object.element;
      if (prop === "size") {
        const size = value === "default" ? 24 : 44;
        object.innerSize = size;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        //@ts-ignore inner object is not properly typed by ts
        if (object.mode === "pointer") {
          centerOnPointer(element, object.innerSize);
        }
      }
      if (prop === "mode") {
        object.mode = value;
        if (value === "pointer") {
          centerOnPointer(element, object.innerSize);
        } else {
          element.style.transform = "none";
        }
      }
      if (prop === "offset") {
        offsetLeft = value.left;
        offsetTop = value.top;
      }
      return true;
    },
  }
);

let offsetLeft = 0;
let offsetTop = 0;

// Animate the cursor for smooth movement
setInterval(function () {
  if (cursor.mode !== "initial") {
    const { left, top } = cursor.element.style;
    const xp = +left.replace("px", "");
    const yp = +top.replace("px", "");
    const animationValue = 6;
    cursor.element.style.left = `${xp + (offsetLeft - xp) / animationValue}px`;
    cursor.element.style.top = `${yp + (offsetTop - yp) / animationValue}px`;
  } else {
    cursor.element.style.left = `${offsetLeft}px`;
    cursor.element.style.top = `${offsetTop}px`;
  }
}, 20);

/**
 * Adjust positioning so that the pointer circle is centered on the user pointer position
 * @param {HTMLElement} element Cursor element
 * @param {number} size Size of the cursor
 */
function centerOnPointer(element, size) {
  element.style.transform = `translate(-${size / 2}px, -${size / 2}px)`;
}
