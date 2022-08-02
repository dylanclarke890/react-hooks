import { useCallback, useRef, useMemo } from "react";

/**
 * Returns a memoized callback which never change and doesn't need a deps array
 * as it is always up to date with the last callback given as parameter.
 * @param {Function | any} callback A callback or another value.
 * @return {Function | any} The memoized callback which never changes or the given value
 * if the callback is not a function.
 */
export default function useMemoCallback(callback) {
  const callbackRef = useRef(callback);
  useMemo(() => {
    callbackRef.current = callback;
  }, [callback]);
  const memoCallback = useCallback(
    (...args) => {
      return callbackRef.current(...args);
    },
    [callbackRef]
  );
  return typeof callbackRef.current === "function" ? memoCallback : callback;
}
