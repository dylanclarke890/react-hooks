import { useRef, useEffect } from "react";

/**
 * Hook to use the previous value of a value.
 * @param {*} value The new value.
 * @return {*} The previous value, or, initially, "undefined".
 */
export default function usePrevious(value) {
  const ref = useRef(void 0);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
