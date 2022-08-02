import { useEffect, useCallback, useState } from "react";
import {
  throttle,
  debounce,
  hasHorizontalScrollbar,
  hasVerticalScrollbar,
} from "dc-javascript-utils";
import useEventListener from "../useEventListener";

function detect({
  ref,
  isScrollable,
  setIsScrollable,
  shouldDetectHorizontallyScrollable,
}) {
  if (ref.current) {
    const hasScrollbar = shouldDetectHorizontallyScrollable
      ? hasHorizontalScrollbar(ref.current)
      : hasVerticalScrollbar(ref.current);
    if (hasScrollbar && !isScrollable) setIsScrollable(true);
    else if (!hasScrollbar && isScrollable) setIsScrollable(false);
  }
}

const throttledDetect = throttle(detect, 100);
const debouncedDetect = debounce(detect, 110);

function useDetectScrollablePrivate(
  ref,
  { detectOnResize = true, shouldDetectHorizontallyScrollable = false } = {}
) {
  const [isScrollable, setIsScrollable] = useState(false);

  const detectIfScrollable = useCallback(() => {
    detect({
      ref,
      isScrollable,
      setIsScrollable,
      shouldDetectHorizontallyScrollable,
    });
  }, [ref, isScrollable, shouldDetectHorizontallyScrollable]);

  useEffect(() => {
    detectIfScrollable();
  });

  useEffect(() => {
    if (ref.current && window.ResizeObserver) {
      const element = ref.current;
      const resizeObserver = new ResizeObserver(() => {
        detectIfScrollable();
      });
      resizeObserver.observe(ref.current);
      return () => {
        element && resizeObserver.unobserve(element);
        resizeObserver.disconnect();
      };
    }
  }, [ref, detectIfScrollable]);

  const [eventName, listener] = detectOnResize
    ? [
        "resize",
        () => {
          throttledDetect({
            ref,
            isScrollable,
            setIsScrollable,
            shouldDetectHorizontallyScrollable,
          });
          debouncedDetect({
            ref,
            isScrollable,
            setIsScrollable,
            shouldDetectHorizontallyScrollable,
          });
        },
      ]
    : [void 0, () => {}];
  useEventListener(eventName, listener);

  return isScrollable;
}

/**
 * Hook to determine if an element is scrollable.
 *
 * @param {Object} ref A React ref (e.g. returned by `useRef()`) for the underlying element.
 * @param {Object} [options] Options.
 * @param {boolean} [options.detectOnResize] True to detect the scrollbars also when the window is resized (default),
 *                                           false otherwise.
 * @return {Object} An object with two properties:
 *
 *                      - isVerticallyScrollable (boolean): True if the element is vertically scrollable, false otherwise.
 *                      - isHorizontallyScrollable (boolean): True if the element is horizontally scrollable, false otherwise.
 *
 */
export default function useDetectScrollable(
  ref,
  { detectOnResize = true } = {}
) {
  const isVerticallyScrollable = useDetectScrollablePrivate(ref, {
    detectOnResize,
  });
  const isHorizontallyScrollable = useDetectScrollablePrivate(ref, {
    detectOnResize,
    shouldDetectHorizontallyScrollable: true,
  });

  return { isVerticallyScrollable, isHorizontallyScrollable };
}

/**
 * Hook to determine if an element is vertically scrollable.
 *
 * @param {Object} ref A React ref (e.g. returned by `useRef()`) for the underlying element.
 * @param {Object} [options] Options.
 * @param {boolean} [options.detectOnResize] True to detect the scrollbars also when the window is resized (default),
 *                                           false otherwise.
 * @return {boolean} True if the element is vertically scrollable, false otherwise.
 */
export function useDetectVerticallyScrollable(
  ref,
  { detectOnResize = true } = {}
) {
  return useDetectScrollablePrivate(ref, { detectOnResize });
}

/**
 * Hook to determine if an element is horizontally scrollable.
 * @param {Object} ref A React ref (e.g. returned by `useRef()`) for the underlying element.
 * @param {Object} [options] Options.
 * @param {boolean} [options.detectOnResize] True to detect the scrollbars also when the window
 * is resized (default), false otherwise.
 * @return {Object} True if the element is horizontally scrollable, false otherwise.
 */
export function useDetectHorizontallyScrollable(
  ref,
  { detectOnResize = true } = {}
) {
  return useDetectScrollablePrivate(ref, {
    detectOnResize,
    shouldDetectHorizontallyScrollable: true,
  });
}
