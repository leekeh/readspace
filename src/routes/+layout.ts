import { initializeTheme } from "@util";

/** @type {import('./$types').PageLoad} */
export function load({ params, data }) {
  // TODO: Figure out a way to run this before the app is initialized, to avoid flicker
  initializeTheme();
  return {
    ...data,
  };
}
