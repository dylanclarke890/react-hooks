import { useRef, useMemo } from "react";
import { isEqualShallow } from "dc-javascript-utils";

/**
 * Hook to use the previous given value if the currently given value is shallowly equal
 * to the previous one.
 * @param {*} value A value.
 * @return {*} The given value the very first time or the previous value if the given
 * value is shallowly equal to the previous given value.
 */
export default function useShallowEqualMemo(value) {
  const ref = useRef({
    init: true,
    value,
  });
  const ret = useMemo(() => {
    if (ref.current.init) {
      ref.current.init = false;
      ref.current.value = value;
      return value;
    }
    if (isEqualShallow(value, ref.current.value)) {
      return ref.current.value;
    } else {
      ref.current.value = value;
      return value;
    }
  }, [value]);
  return ret;
}
