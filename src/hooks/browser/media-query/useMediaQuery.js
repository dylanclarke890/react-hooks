import { useEffect, useState } from "react";

/**
 * A hook which takes a media query as the argument and returns a state
 * which will be true when the media query is active.
 * @example const isMobile = useMediaQuery("(max-width:600px)");
 * @returns {boolean} True if the media query is active
 */
export default function useMediaQuery(mediaQuery) {
  const [doesQueryMatch, setDoesQueryMatch] = useState(
    () => window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    const mediaQueryChangeHandler = (e) => {
      setDoesQueryMatch(e.matches);
    };

    // Adding event listener for media query change on component mount
    window
      .matchMedia(mediaQuery)
      .addEventListener("change", mediaQueryChangeHandler);

    // Removing event listener component unmount
    return () => {
      window
        .matchMedia(mediaQuery)
        .removeEventListener("change", mediaQueryChangeHandler);
    };
  }, []);

  return doesQueryMatch;
}
