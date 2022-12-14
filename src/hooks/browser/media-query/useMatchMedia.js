import { useCallback, useEffect, useMemo, useState } from "react";

const isWindowDefined = typeof window !== "undefined";
/**
 * Returns a flag which determines if the document matches the given media query string.
 * @param {string} query Media query string
 * @returns {boolean} Whether the document matches the given media query string
 */
export default function useMatchMedia(query) {
  const mql = useMemo(
    () => (isWindowDefined ? window.matchMedia(query) : null),
    [query]
  );
  const [matches, setMatches] = useState(mql ? mql.matches : null);
  const handleMql = useCallback((event) => {
    setMatches(event.matches);
  }, []);
  useEffect(() => {
    if (!mql) return undefined;
    mql.addEventListener("change", handleMql);
    return () => {
      mql.removeEventListener("change", handleMql);
    };
  }, [mql, handleMql]);

  return matches;
}
