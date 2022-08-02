import { useAwaitableState } from "./useAwaitableStateWithEffect";
import usePOJOStateWithLayoutEffectCallback from "./usePOJOStateWithLayoutEffectCallback";

/**
 * Hook to use a POJO state with a `setState` function which can be awaited until the POJO
 * state change is performed and the underlying layout effect (`useLayoutEffect`) is executed.
 * @param {*|Function} initialState The initial POJO state or a lazy callback returning the
 * initial POJO state.
 * @return {Array} A tuple of two values, current POJO state and callback to set POJO state, like
 * the one returned by the "useState" hook. The callback to set POJO state may be awaited until
 * the POJO state change is performed and the underlying layout effect (`useLayoutEffect`) is
 * executed.
 */
export default function useAwaitablePOJOStateWithLayoutEffect(initialState) {
  return useAwaitableState({
    initialState,
    useStateWithSetStateCallback: usePOJOStateWithLayoutEffectCallback,
  });
}
