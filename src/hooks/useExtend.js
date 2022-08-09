import { useMemo } from "react";
import { extend, isObject } from "dc-javascript-utils";
import useShallowEqualMemo from "./useShallowEqualMemo";

/**
 * Hook to extend an object with an array of source objects.
 * @param {Object|Function} target Destination object or a function returning a destination
 * object.
 * @param {Array} deps An array which defines the dependecies of the hook as well the source
 * objects to use to extend the destination object. If the nth element of this array is an
 * object, it will always be used as a source object when extending the destination object
 * "destination", as well as used as a dep. If the nth element of this array is not an object,
 * it will only be used as a dep.
 * @param {Object} [extendOptions] The options for the extension.
 * @param {boolean} [extendOptions.extendArrays] If true, will also extend arrays.
 * @return {Object} The extended destination object.
 */
export default function useExtend(target, deps = [], extendOptions = {}) {
  const obj = useMemo(
    typeof target === "function" ? target : () => target,
    deps
  );
  extendOptions = useShallowEqualMemo(extendOptions);
  const extendFn = () => extend(obj, ...deps.filter(isObject), [extendOptions]);
  const extendedObj = useMemo(extendFn, [...deps, extendOptions]);
  return extendedObj;
}
