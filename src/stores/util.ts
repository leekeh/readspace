import { writable } from "svelte/store";
import { browser } from "$app/environment";

export function createCachedStore<T>(key: string, initialValue?: T | null) {
  // Get the value from localStorage if it exists
  const cachedValue = browser && localStorage.getItem(key);
  const initial = cachedValue ? JSON.parse(cachedValue) : initialValue;
  // Create a writable store with the initial value
  const { subscribe, set, update } = writable<T>(initial);

  // Update localStorage whenever the store value changes
  subscribe((value: T) => {
    browser && localStorage.setItem(key, JSON.stringify(value));
  });

  // Return the store methods
  return {
    subscribe,
    set,
    update,
  };
}
