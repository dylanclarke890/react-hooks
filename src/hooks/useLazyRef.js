import { useState, useRef } from "react";

/**
 * Hook to create a ref initialized lazily during the initial render.
 * @param {(() => *)|*} func A function returning the initial value of the ref object's
 * "current" property or any other value to use as-is if as the initial value of the ref
 * object's "current" property.
 * @return {Object} A ref object with its "current" property set to the value returned by
 * the passed function or to the value passed as parameter to this hook if the
 * parameter is not a function.
 */
export default function useLazyRef(func) {
  const [initialValue] = useState(func);
  const ref = useRef(initialValue);
  return ref;
}
