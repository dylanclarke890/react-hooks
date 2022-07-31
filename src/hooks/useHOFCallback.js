import { useCallback, useRef } from "react";

/**
 * Hook returning a HOF (higher-order function) which, when called
 * with a given key, returns a memoized function for that same key
 * which can be easily used e.g. in a loop without causing re-renders
 * because of inline arrow functions.
 * @param {Function} func The function to memoize.
 * @param {Array|undefined} deps Dependencies array for the function, or undefined.
 * @return {Function} A higher-order function which, when called with a given key,
 * returns the memoized function "func" which, when called, will receive
 * the key as the first parameter as well as the other parameters passed
 * to the memoized function when calling it.
 */
export default function useHOFCallback(func, deps) {
  const callback = useCallback(func, deps);
  const ref = useRef({ map: new Map(), callback });

  if (callback !== ref.current.callback) {
    ref.current.map.clear();
    ref.current.callback = callback;
  }

  const HOFCallback = useCallback(
    (key) => {
      let memoizedFunc = ref.current.map.get(key);
      if (!memoizedFunc) {
        memoizedFunc = (...args) => callback(key, ...args);
        ref.current.map.set(key, memoizedFunc);
      }
      return memoizedFunc;
    },
    [callback]
  );

  return HOFCallback;
}
