import { useState } from "react";

/**
 * A function which fetches the value corresponding to the key from localStorage.
 * If the item doesn't exist returns the input value.
 * @param {*} value
 * @param {string} key Key for the localStorage.
 * @returns {*} The value fetched from localStorage.
 */
const getItem = (key, value) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : value;
  } catch (error) {
    return value; // If something went wrong returns the value itself.
  }
};

const hasLocalStorage = typeof localStorage !== "undefined";

/**
 * Custom useState hook which saves the state value in localStorage
 * @param {*} initialValue Initial value of the state.
 * @param {string} key Key for the localStorage.
 * @returns {Array} Array containing stateful value and updater function.
 */
export default function useLocalStorage(
  initialValue,
  key,
  throwErrIfUnsupported = false
) {
  const [storedValue, setStoredValue] = useState(getItem(key, initialValue));

  const setValue = (value) => {
    if (!hasLocalStorage)
      if (throwErrIfUnsupported) throw new Error("localStorage does not exist");
      else return;

    // If value passed is a function, evaluating the function.
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    // Setting state and saving the value to localStorage.
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}
