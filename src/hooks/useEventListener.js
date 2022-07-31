import { useEffect, useRef } from "react";

/**
 * Hook for adding an event listener which is removed on cleanup. Its use of
 * useRef allows useEffect to always get latest handler
 * without needing to pass it in effect deps array
 * and potentially cause effect to re-run every render.
 * @param {string} eventName The name of the event e.g "onclick".
 * @param {Function} handler The event handler.
 * @param {Element} element The element to attach the event to. Defaults to the window.
 * */
export default function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();
  // Update ref.current value if handler changes.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      const eventListener = (event) => savedHandler.current(event);
      element.addEventListener(eventName, eventListener);
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
