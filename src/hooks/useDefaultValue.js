import { useState } from "react";
import { defaultVal } from "../utils";

/**
 * Hook for default values.
 * @param {*} [defaultValue] A default value.
 * @param {*} [valueIfDefaultValueIsUndefined] A value to use if the given default value is undefined.
 * @return {Array} A tuple with initially the default value at index 0, as well as a callback to set
 *                 the value at index 1.
 */
export default function useDefaultValue(
  defaultValue = void 0,
  valueIfDefaultValueIsUndefined = void 0
) {
  const [value, setValue] = useState(
    defaultVal(defaultValue, valueIfDefaultValueIsUndefined)
  );
  return [value, setValue];
}
