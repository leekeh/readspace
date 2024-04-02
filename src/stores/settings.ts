import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { Settings } from "@util/types";

const defaultSettings = {
  readMode: "flip",
  font: "calibri",
  fontSize: "16px",
};

const defaultSettingsDark = {
  bg: "#211f11",
  fg: "#f0f0f0",
  accent: "#ffd900",
};

const defaultSettingsLight = {
  bg: "#f0f0f0",
  fg: "#211f11",
  accent: "#ffd900",
};

function initializeSettingsStore() {
  const key = "settings";

  const cachedValue = browser && localStorage.getItem(key);
  let initial: Settings;

  if (cachedValue) {
    initial = JSON.parse(cachedValue);
  } else {
    if (
      browser &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      initial = { ...defaultSettingsDark, ...defaultSettings };
    } else {
      initial = { ...defaultSettingsLight, ...defaultSettings };
    }
  }

  const { subscribe, set, update } = writable<Settings>(initial);

  subscribe((value: Settings) => {
    browser && localStorage.setItem(key, JSON.stringify(value));
  });

  return {
    subscribe,
    set,
    update,
  };
}

export const settings = initializeSettingsStore();
