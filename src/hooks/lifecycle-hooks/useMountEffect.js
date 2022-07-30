import { useEffect } from "react";

/**
 * Hook to execute a callback on mount.
 * @param {Function} func The callback to execute.
 */
export default function useMountEffect(func) {
  useEffect(func, []);
}
