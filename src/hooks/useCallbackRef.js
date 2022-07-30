import { useRef, useEffect } from "react";

/**
 * Returns a ref for a callback.
 * Useful e.g. when using callbacks within a callback of useEffect hook
 * which should not interfere with the deps array of the hook and yet having
 * a reference to the up-to-date callback within that hook's callback
 * through the ref's 'current' property.
 * @see https://github.com/donavon/use-event-listener/issues/27
 * @param {Function} callback A callback.
 * @return {Object} A ref for the given callback.
 * The returned ref could and should be passed as a dep to the dependencies array
 * of a hook using it because React guarantees that the returned object will persist
 * for the full lifetime of the component.
 * @return {Object.current} The up-to-date callback.
 */
export default function useCallbackRef(callback) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return callbackRef;
}
