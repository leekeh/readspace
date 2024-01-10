import { effect } from "@util";
import { page } from "$app/stores";
import { isTouchDevice } from "@stores";
import { get } from "svelte/store";

const stylisticOffset = 4;

function queryActiveLinkLocation() {
  const currentItem = document.querySelector("a[aria-current]");
  if (currentItem !== null) {
    return currentItem.getElementsByTagName("svg")[0].getBoundingClientRect();
  }
}

const getActiveLinkLocation = effect(queryActiveLinkLocation, () =>
  page.subscribe((value) => {
    return value.route.id;
  })
);

export class Cursor {
  cursorDiv: HTMLElement;
  navElement: HTMLElement;
  config: {
    size: "default" | "large";
    mode: "initial" | "pointer" | "default";
    innerSize: number;
    offset: { left: number; top: number };
  };
  constructor(cursorReference: HTMLElement, navReference: HTMLElement) {
    this.cursorDiv = cursorReference;
    this.navElement = navReference;

    const { top, left } = getActiveLinkLocation() ?? { top: 0, left: -100 };

    this.config = {
      size: "default",
      innerSize: 24,
      mode: "initial",
      offset: { top: top, left: left + stylisticOffset },
    };

    this.cursorDiv.style.left = `${left + stylisticOffset}px`;
    this.cursorDiv.style.top = `${top}px`;

    navReference.addEventListener("mousemove", this.handleHover.bind(this));
    navReference.addEventListener(
      "mouseleave",
      this.handleMouseLeave.bind(this)
    );
    navReference.addEventListener("focusin", this.handleFocusIn.bind(this));
    navReference.addEventListener("focusout", this.handleFocusOut.bind(this));

    setInterval(this.animate.bind(this), 20);

    window.addEventListener("resize", this.focusCurrentElement.bind(this));
  }

  handleHover(e: MouseEvent) {
    // Mouse cursor grows on clickable links
    const size =
      !get(isTouchDevice) &&
      e.target instanceof Element &&
      e.target.tagName === "A" &&
      e.target.getAttribute("aria-current") === null
        ? "large"
        : "default";

    this.setSize(size);
    this.setMode("pointer");
    this.setOffset({ left: e.clientX, top: e.clientY });
  }
  handleMouseLeave() {
    this.focusCurrentElement();
    this.setSize("default");
    this.setMode("default");
  }

  handleFocusIn(e: FocusEvent) {
    const anchorPosition = (e.target as Element).getBoundingClientRect();
    const left =
      anchorPosition.left + (anchorPosition.right - anchorPosition.left) / 2;
    const top =
      anchorPosition.top + (anchorPosition.bottom - anchorPosition.top) / 2;
    this.setSize("large");
    this.setMode("pointer");
    this.setOffset({ left, top });
  }

  handleFocusOut(e: FocusEvent) {
    const anchors = Array.from(this.navElement.getElementsByTagName("a"));
    if (e.target === anchors[anchors.length - 1] || !e.relatedTarget) {
      this.focusCurrentElement();
      this.setSize("default");
      this.setMode("default");
    }
  }
  centerOnPointer() {
    const size = this.config.innerSize;
    this.cursorDiv.style.transform = `translate(-${size / 2}px, -${
      size / 2
    }px)`;
  }

  focusCurrentElement() {
    const activeLinkLocation = getActiveLinkLocation();
    if (activeLinkLocation) {
      this.config.offset = {
        left: activeLinkLocation.left + stylisticOffset,
        top: activeLinkLocation.top,
      };
    } else {
      this.config.offset = { left: -100, top: this.config.offset.top };
    }
  }

  // Animate the cursor for smooth movement
  animate() {
    const { left, top } = this.cursorDiv.style;
    const xp = +left.replace("px", "");
    const yp = +top.replace("px", "");
    const animationValue = 6;
    this.cursorDiv.style.left = `${
      xp + (this.config.offset.left - xp) / animationValue
    }px`;
    this.cursorDiv.style.top = `${
      yp + (this.config.offset.top - yp) / animationValue
    }px`;
  }
  setSize(size: "default" | "large") {
    const sizePx = size === "default" ? 24 : 44;
    this.config.innerSize = sizePx;
    this.cursorDiv.style.width = `${sizePx}px`;
    this.cursorDiv.style.height = `${sizePx}px`;
    //@ts-ignore inner object is not properly typed by ts
    if (this.config.mode === "pointer") {
      this.centerOnPointer();
    }
  }
  setMode(mode: "initial" | "pointer" | "default") {
    this.config.mode = mode;
    if (mode === "pointer") {
      this.centerOnPointer();
    } else {
      this.cursorDiv.style.transform = "none";
    }
  }
  setOffset(offset: { left: number; top: number }) {
    this.config.offset = offset;
  }
}
