import { useRef } from "react";

/**
 * Hook to get a ref to the global "window" object.
 * @return {Object} A ref to the global "window" object, available through the "current"
 * property.
 */
export default function useWindowRef() {
  const ref = useRef(window);
  return ref;
}
