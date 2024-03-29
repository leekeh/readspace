// This file contains higher order functions,
// which are functions that take functions as arguments.
// Use them to optimize js performance and reduce code duplication.

import type { AnyExceptVoid } from "./types";

/** Run callback fn only when the result of the second
 * callback changes
 */
export function effect<T extends AnyExceptVoid, C extends AnyExceptVoid>(
  fn: () => T,
  eff: () => C
): () => T {
  let cache: T | undefined = undefined;
  let cachedEff: C | undefined = undefined;
  return () => {
    const cacheTest = eff();
    if (cachedEff !== cacheTest) {
      cachedEff = cacheTest;
      const newValue = fn();
      cache = newValue;
      return newValue;
    } else {
      return cache as T;
    }
  };
}
