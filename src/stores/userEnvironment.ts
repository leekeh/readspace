import { writable } from "svelte/store";

export const isTablet = writable(false);
export const isDesktop = writable(false);
export const isLargeScreen = writable(false);
export const isTouchDevice = writable(false);

export const platform = writable("Unknown");

export function initializeEnvironmentStores() {
  const mqTablet = window.matchMedia("(min-width: 768px)");
  const mqDesktop = window.matchMedia("(min-width: 1024px)");
  const mqLargeScreen = window.matchMedia("(min-width: 1440px)");

  isTablet.set(mqTablet.matches);
  isDesktop.set(mqDesktop.matches);
  isLargeScreen.set(mqLargeScreen.matches);

  mqTablet.onchange = (e) => {
    isTablet.set(e.matches);
  };
  mqDesktop.onchange = (e) => {
    isDesktop.set(e.matches);
  };
  mqLargeScreen.onchange = (e) => {
    isLargeScreen.set(e.matches);
  };

  isTouchDevice.set("ontouchstart" in window);
  platform.set(findPlatform());
}

function findPlatform() {
  const ua = navigator.userAgent.toLowerCase();

  if (ua.includes("windows")) {
    return "Windows";
  } else if (ua.includes("macintosh") || ua.includes("mac os x")) {
    return "Mac";
  } else if (ua.includes("linux")) {
    return "Linux";
  } else if (ua.includes("ipad")) {
    return "iPad";
  } else if (ua.includes("android")) {
    return "Android";
  } else {
    return "Unknown";
  }
}
