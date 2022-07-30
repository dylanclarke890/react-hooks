/**
 * Returns a default value.
 * @param {*} [defaultValue] A default value.
 * @param {*} [fallbackValue] A value to return if the given default value is "undefined".
 * @return {*} A default value.
 */
export function defaultVal(defaultValue = void 0, fallbackValue = void 0) {
  if (defaultValue) return defaultValue;
  if (typeof defaultValue === "undefined") return fallbackValue;
  return !defaultValue ? void 0 : defaultValue;
}
