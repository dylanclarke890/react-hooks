import usePrevious from "../state/usePrevious";

/**
 * Hook to tell if the current rendering is due to an update or not.
 * @return {boolean} True if the current rendering is due to an update, false otherwise.
 */
export default function useIsUpdate() {
  return !!usePrevious(true);
}
