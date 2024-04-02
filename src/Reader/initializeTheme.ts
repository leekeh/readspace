import { browser } from "$app/environment";
import { settings } from "@stores";
import { get } from "svelte/store";

export function initializeTheme() {
  const theme = get(settings);
  if (browser) {
    var r = document.querySelector(":root") as HTMLElement;
    r.style.setProperty("--background", theme.bg);
    r.style.setProperty("--foreground", theme.fg);
    r.style.setProperty("--hue", theme.accent);
    r.style.fontSize = theme.fontSize;
  }
}
