import { useCallback } from "react";
import useCallbackRef from "./useCallbackRef";

function setRef(refToSync, args) {
  const [ref] = args;
  if (typeof refToSync === "function") refToSync(...args);
  else if (refToSync) refToSync.current = ref;
}

/**
 * Hook returning a callback ref which synchronizes all the refs given as parameter.
 * @param {...Object} refs The refs to sync.
 * @return {Function} The callback ref synchronizing the given refs.
 */
export default function useSyncRefsCallback(...refs) {
  const syncCallbackRef = useCallbackRef((...args) => {
    refs.map((refToSync) => setRef(refToSync, args));
  });
  const callbackRef = useCallback(
    (...args) => {
      syncCallbackRef.current(...args);
    },
    [syncCallbackRef]
  );
  return callbackRef;
}
