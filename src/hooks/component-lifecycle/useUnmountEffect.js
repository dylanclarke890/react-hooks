import { useEffect } from "react";
import useCallbackRef from "../useCallbackRef";

/**
 * Hook to execute a callback on unmount.
 * @param {Function} func The callback to execute.
 */
export default function useUnmountEffect(func) {
  const funcRef = useCallbackRef(func);
  useEffect(() => () => funcRef.current(), [funcRef]);
}
