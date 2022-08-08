import { useState, useCallback } from "react";

/**
 * Hook returning a ref callback to measure the dimensions of a DOM element and the current
 * dimensions of the measured element.
 * @see https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
 * @return {[Function, DOMRect]} An array containing the ref callback
 * at index 0 and the dimensions (an object with i property) of the last
 * measurement of the element at index 1.
 */
export default function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [ref, rect];
}
