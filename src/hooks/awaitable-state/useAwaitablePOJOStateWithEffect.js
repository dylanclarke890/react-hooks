import { useAwaitableState } from "./useAwaitableStateWithEffect";
import usePOJOStateWithEffectCallback from "../usePOJOStateWithEffectCallback";

/**
 * Hook to use a POJO state with a `setState` function which can be awaited until the POJO state
 * change is performed and the underlying effect (`useEffect`) is executed.
 * @param {*|Function} initialState The initial POJO state or a lazy callback returning the
 * initial POJO state.
 * @return {Array} A tuple of two values, current POJO state and callback to set POJO state, like
 * the one returned by the "usePOJOState" hook. The callback to set POJO state may be awaited
 * until the POJO state change is performed and the underlying effect (`useEffect`) is executed.
 */
export default function useAwaitablePOJOStateWithEffect(initialState) {
  return useAwaitableState({
    initialState,
    useStateWithSetStateCallback: usePOJOStateWithEffectCallback,
  });
}
