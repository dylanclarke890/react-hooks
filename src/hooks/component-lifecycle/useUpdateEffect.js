import { useRef, useEffect } from "react";
import { isArray } from "dc-javascript-utils";

/**
 * Hook to execute a callback each time a component updates
 * (not when it mounts on the initial render).
 * @param {Function} func The callback to execute.
 * @param {Array|undefined} [deps] Dependencies array to use.
 * @return {undefined}
 */
export default function useUpdateEffect(func, deps = null) {
  const isInitialRenderRef = useRef(true);
  if (isArray(deps)) {
    // This is needed so that the update effect is triggered on the first update
    // even if the deps array didn't change.
    if (deps.length) {
      if (isInitialRenderRef.current) {
        deps = [...deps];
        let shouldBreak = false;
        while (true) {
          const rand = Math.random();
          for (let i = 0; i < deps.length; i++) {
            const value = deps[i];
            if (rand !== value) {
              shouldBreak = true;
              break;
            }
            deps[i] = rand + 1;
          }
          if (shouldBreak) break;
        }
      }
    } else deps = isInitialRenderRef.current ? [0] : [1];
  }
  useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }
    return func();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
