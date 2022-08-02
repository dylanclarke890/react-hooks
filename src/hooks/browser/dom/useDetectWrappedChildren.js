import { useLayoutEffect } from "react";
import { detectWrapped, isEmpty } from "dc-javascript-utils";
import useElementSize from "../useElementSize";
import usePrevious from "../../usePrevious";
import usePOJOState from "./usePOJOState";

/**
 * Hook detecting wrapped DOM children elements given a ref.
 * @param {Object} ref A ref.
 * @return {Object} An object with the following properties:
 * - areWrapped (bool): true if the DOM children elements wrap and are not on the same line
 * (according to their top position);
 * - wrapped (Element[]): An array of the wrapped DOM children elements;
 */
export default function useDetectWrappedChildren(ref) {
  const [{ width }] = useElementSize(ref, ["width"]);
  const prevWidth = usePrevious(width);
  const [state, setState] = usePOJOState(() => ({
    areWrapped: void 0,
    wrapped: [],
  }));
  useLayoutEffect(() => {
    if (ref.current && ref.current.children && width !== prevWidth) {
      const wrapped = detectWrapped(ref.current.children);
      setState({
        areWrapped: !isEmpty(wrapped),
        wrapped,
      });
    }
  }, [setState, prevWidth, width, ref]);
  return state;
}
