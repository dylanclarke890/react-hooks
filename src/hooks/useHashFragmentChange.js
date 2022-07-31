import useEventListener from "./useEventListener";

/**
 * Hook to execute a callback whenever the hash fragment of the page
 * ("window.location.hash") changes.
 */
export default function useHashFragmentChange(onChange) {
  useEventListener("hashchange", onChange);
}
