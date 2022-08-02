import useElementSize from "../useElementSize";
import { useMemo } from "react";

/**
 * Hook like `useElementSize()`, but optimized for height only.
 * @param {string|Element} element A selector of a DOM element or a DOM element.
 * @return {Array|Object} The return value of this hook can be destructured as an array as
 * well as an object and its the same as the return value of the "useElementSize()" hook,
 * the only difference being that the dimension object will only have the "height" property.
 */
export default function useElementHeight(element) {
  const dimensionProps = useMemo(() => ["height"], []);
  return useElementSize(element, dimensionProps);
}
