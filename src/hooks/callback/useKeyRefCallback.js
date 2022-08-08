import React, { useCallback, useRef } from "react";

/**
 * Hook to return a callback which, if called with a key/id, will return a new ref for that key
 * or the same ref for that key if the ref for that key was already created previously
 * (therefore this callback is useful e.g. when creating refs dynamically in a loop or when
 * using `.map()` during the rendering of a React component).
 * @return {(key: string|number) => {current: *}} The callback accepting a key and returning a
 * ref for that key (the same ref for that key if a ref for that key was already created
 * previously).
 */
export default function useKeyRefCallback() {
  const mapRef = useRef({});
  return useCallback((key) => {
    mapRef.current[key] = mapRef.current[key] || React.createRef();
    return mapRef.current[key];
  }, []);
}
