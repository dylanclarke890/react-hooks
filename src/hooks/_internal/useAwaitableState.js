import { useCallback } from "react";
import { DeferredPromise } from "dc-javascript-utils";

/**
 * Hook used internally for all hooks allowing to set state and await for the state change.
 * (`useAwaitableStateWithEffect`, `useAwaitableStateWithLayoutEffect`, `useAwaitablePOJOStateWithEffect`, `useAwaitablePOJOStateWithEffect`).
 */
export default function useAwaitableState({
  initialState,
  useStateWithSetStateCallback,
}) {
  const [state, setState] = useStateWithSetStateCallback(initialState);
  const setStateCallback = useCallback(
    (newState) => {
      const defPromise = new DeferredPromise();
      setState(newState, (...args) => {
        defPromise.resolve(...args);
      });
      return defPromise;
    },
    [setState]
  );
  return [state, setStateCallback];
}
