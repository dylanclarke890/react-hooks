import { useCallback } from "react";
import { DeferredPromise } from "dc-javascript-utils";
import useStateWithEffectCallback from "../useStateWithEffectCallback";

/**
 * Hook used internally for all hooks allowing to set state and await for the state change.
 * (`useAwaitableStateWithEffect`, `useAwaitableStateWithLayoutEffect`, `useAwaitablePOJOStateWithEffect`, `useAwaitablePOJOStateWithEffect`).
 *
 * @type {Function}
 */
export const useAwaitableState = ({
  initialState,
  useStateWithSetStateCallback,
}) => {
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
};

/**
 * Hook to use a state with a `setState` function which can be awaited until the state change is performed
 * and the underlying effect (`useEffect`) is executed.
 * @param {*|Function} initialState The initial state or a lazy callback returning the initial
 * state.
 * @return {Array} A tuple of two values, current state and callback to set state, like the one
 * returned by the "useState" hook.
 * The callback to set state may be awaited until the state change is performed
 * and the underlying effect (`useEffect`) is executed.
 */
export default function useAwaitableStateWithEffect(initialState) {
  return useAwaitableState({
    initialState,
    useStateWithSetStateCallback: useStateWithEffectCallback,
  });
}
