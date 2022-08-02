import { debounce } from "dc-javascript-utils";

/**
 * Custom hook which returns a function which is forced
 * to wait a certain amount of time before running again.
 * @param {function} inputFunction Function which is to be modified.
 * @param {number} delay The time delay in milliseconds.
 * @returns {function} The modified function.
 */
export default function useDebounce(inputFunction, delay) {
  return useCallback(debounce(inputFunction, delay), []);
}
