import useNestedDataCallback from "../useNestedDataCallback";
import { useMemo } from "react";

/**
 * Hook to traverse nested data.
 * @param {Array|Object|Map|WeakMap|ImmutableLinkedOrderedMap} data The data. Can be any of the
 * specified types which in turn have nested data of any of the specified types.
 * @param {Array} keys An array of keys which will be passed to the underlying callback returned
 * by the "useNestedDataCallback" hook used by "useNestedData". See the "useNestedDataCallback"
 * hook for information about the shape of the keys array.
 * @param {Object} [obj] An optional object with further parameters. See the
 * "useNestedDataCallback" hook for information about the shape of this parameter.
 * @return {*} The nested data.
 */
export default function useNestedData(data, keys, obj = {}) {
  const callback = useNestedDataCallback(data, obj);
  const nestedData = useMemo(() => callback(keys), [callback, keys]);
  return nestedData;
}
