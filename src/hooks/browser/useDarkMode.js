import { useState, useEffect } from "react";

/**
 * @returns {boolean} True if dark mode is globally preferred.
 */
const getGlobalPreference = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * @returns {boolean} True if user prefers dark mode.
 */
const getUserPreferredMode = () => {
  // If localStorage is available user preference is stored, return the stored value.
  if (localStorage) {
    const localPreference = localStorage.getItem("dark-mode");
    return localPreference
      ? JSON.parse(localPreference)
      : getGlobalPreference();
  }
  // If localStorage does not exist, return the global dark-mode preference.
  return getGlobalPreference();
};

/**
 * Custom hook which let's you toggle dark-mode by adding a class to the body.
 * @param {string} className Class name which is to be added to body when dark mode.
 * @returns {Array} Array containing a boolean isDarkMode and a darkModeToggle function.
 */
export default function useDarkMode(className) {
  const [isDarkMode, setIsDarkMode] = useState(getUserPreferredMode());

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    localStorage.setItem("dark-mode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleDarkMode];
}
