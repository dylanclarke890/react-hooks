import useAwaitableState from "../_internal/useAwaitableState";
import useStateWithLayoutEffectCallback from "../state/useStateWithLayoutEffectCallback";

/**
 * Hook to use a state with a `setState` function which can be awaited until the state change
 * is performed and the underlying layout effect (`useLayoutEffect`) is executed.
 * @param {*|Function} initialState The initial state or a lazy callback returning the initial state.
 * @return {Array} A tuple of two values, current state and callback to set state, like the one
 * returned by the "useState" hook. The callback to set state may be awaited until the state
 * change is performed and the underlying layout effect (`useLayoutEffect`) is executed.
 */
export default function useAwaitableStateWithLayoutEffect(initialState) {
  return useAwaitableState({
    initialState,
    useStateWithSetStateCallback: useStateWithLayoutEffectCallback,
  });
}
