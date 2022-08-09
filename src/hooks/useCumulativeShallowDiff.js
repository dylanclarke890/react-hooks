import { useRef, useMemo } from "react";
import useIsUpdate from "./component-lifecycle/useIsUpdate";
import {
  isObjectLiteral,
  isEqualShallow,
  objDiffShallow,
  isObjectEmpty,
  extend,
} from "dc-javascript-utils";

/**
 * Hook to use a cumulative shallow diff of a value.
 * @param {*} value A value.
 * @return {*} The given value, initially.
 * The previous value if the given value is equal to the previous one and both
 * are not objects.
 * If the previous value and the given value are both objects,
 * then this hook will only return an object containing the diff between the two
 * accumulating the new keys and their corresponding values.
 * In this last case, if the resulting object containing the diff is empty
 * (meaning there's no diff) or if the diff is shallowly equal
 * to the previous one, then the previous diff object will be returned
 * if a diff was performed at least once previously, otherwise the previous value
 * will be returned, meaning that there wasn't a diff before yet
 * (useful for the array of dependencies of other hooks like "useEffect" and "useMemo").
 */
export default function useCumulativeShallowDiff(value) {
  console.log(value);
  const valueDiffRef = useRef({
    value,
    diff: {},
    hasFoundDiff: false,
  });
  const isUpdate = useIsUpdate();
  value = useMemo(() => {
    const previousValue = valueDiffRef.current.value;
    if (!isUpdate) return previousValue;
    if (isObjectLiteral(previousValue) && isObjectLiteral(value)) {
      const previousDiff = valueDiffRef.current.diff;
      const diff = objDiffShallow(previousValue, value);
      const newDiff = diff.objB;
      if (isObjectEmpty(newDiff) || isEqualShallow(previousDiff, newDiff))
        return valueDiffRef.current.hasFoundDiff ? previousDiff : previousValue;
      valueDiffRef.current.hasFoundDiff = true;
      valueDiffRef.current.value = extend({}, previousValue, newDiff);
      valueDiffRef.current.diff = newDiff;
      return newDiff;
    }
    valueDiffRef.current.hasFoundDiff = false;
    valueDiffRef.current.diff = {};
    if (isEqualShallow(previousValue, value)) return previousValue;
    valueDiffRef.current.value = value;
    return value;
  }, [isUpdate, value]);

  return value;
}
