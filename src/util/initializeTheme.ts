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
  }
}
/**
 *     --background: #fffffb;
    --foreground: #3d3d3d;
    --background-inverted: var(--foreground);
    --foreground-inverted: var(--background);
    --hue: 62, 0, 255;
    --foreground-colored: rgb(var(--hue), 0.8);
    --highlight-color: rgb(var(--hue), 0.2);
 */
