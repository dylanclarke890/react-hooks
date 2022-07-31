import { useState, useCallback } from "react";

/**
 * Hook exposing an imperative callback which, if called, forces a component to update.
 * @return {Function} A callback to call to force a component to update.
 */
export default function useForceUpdate() {
  const [, setState] = useState();
  const forceUpdate = useCallback(() => setState({}), []);
  return forceUpdate;
}
