import { useCallback } from "react";
import { isEqualShallow, declarativeFactory } from "dc-javascript-utils";
import useFactory from "../useFactory";
import usePrevious from "../state/usePrevious";
import visitor from "../../utils/visitor";
import { isPrimitiveOfType } from "../../utils/primitives";

const dataGetKey = (data, key) => data.get(key);

const mapTraverseFactory = {
  traverse: dataGetKey,
};
const weakMapTraverseFactory = {
  traverse: dataGetKey,
};
const propTraverseFactory = {
  traverse: (data, key) => data[key],
};
const yesVisitorKeyFactory = (visitor) => ({
  key: () => visitor.key,
  visit: (...args) => visitor.visit(...args),
});
const noVisitorKeyFactory = (finalKey) => ({
  key: () => finalKey,
  visit: () => {},
});

/**
 * Hook returning a callback to traverse nested data.
 * @param {Array|Object|Map|WeakMap} data The data. Can be any of
 * the specified types which in turn have nested data of any of the specified types.
 * @param {Object} [obj] An optional object with further parameters.
 * @param {boolean} [obj.pathCopy] Whether or not to create a copy of the current path and the
 * data forming the path when traversing the nested data instead of pushing to a single path
 * array. This parameter should be set to false only when the nested data is very deep and
 * performance issues are experienced when using this hook for the given data. In case this
 * parameter is set to false, eventual visitors (explained below) will receive an object where
 * the "path" and "pathData" properties will refer to the same arrays for every visitor.
 * @return {(keys: Array) => *} The nested data callback which receives the keys and if called
 * returns the nested data for the given keys, if any, or undefined. The nested data callback
 * takes an array of keys as argument. Note that the array is flattened (only its first dimension)
 * and therefore the following arrays will be treated as being the same array of keys:
 * The visitor function allows to perform a custom behaviour when visiting the nested data.
 * Note that the visitor function will only be called if the underlying visited data for a given
 * nested key is not "undefined".
 */
export default function useNestedDataCallback(data, { pathCopy = true } = {}) {
  const prevData = usePrevious(data);
  const finalDataFactory = useFactory(
    () => [() => (isEqualShallow(prevData, data) ? prevData : data)],
    [data]
  );

  const finalData = finalDataFactory();
  const callback = useCallback(
    (keys) => {
      const data = finalData;
      const effectiveKeys = keys.flat();
      let depth = 0;
      let currentData = data;
      let path = [];
      let pathData = [];
      for (const key of effectiveKeys) {
        if (!currentData) {
          break;
        }
        const traverseFactory = declarativeFactory([
          [() => currentData instanceof Map, mapTraverseFactory],
          [() => currentData instanceof WeakMap, weakMapTraverseFactory],
          propTraverseFactory,
        ]);
        const visitorFactory = declarativeFactory([
          [() => isPrimitiveOfType(key, visitor), yesVisitorKeyFactory(key)],
          noVisitorKeyFactory(key),
        ]);
        const finalKey = visitorFactory.key();
        currentData = traverseFactory.traverse(currentData, finalKey);
        if (pathCopy) {
          path = path.concat(finalKey);
          pathData = pathData.concat(currentData);
        } else {
          path.push(finalKey);
          pathData.push(currentData);
        }
        if (typeof currentData !== "undefined") {
          visitorFactory.visit({
            currentData,
            depth,
            key: finalKey,
            path,
            pathData,
            data,
          });
        }
        depth++;
      }
      return depth === effectiveKeys.length ? currentData : void 0;
    },
    [finalData, pathCopy]
  );
  return callback;
}
