import { useLayoutEffect } from "react";
import useStateWithSetStateCallback from "../_internal/useStateWithSetStateCallback";
import usePOJOState from "./usePOJOState";
import {
  onStateUpdate,
  onHasBailedOut,
} from "./usePOJOStateWithEffectCallback";

/**
 * Hook to use a POJO state with a `setState` function receiving a callback as its second
 * parameter called in a layout effect after the state change is performed.
 * @param {*|Function} initialState The initial POJO state or a lazy callback returning the
 * initial POJO state.
 * @return {Array} A tuple of two values, current POJO state and callback to set the POJO state,
 * like the one returned by the "usePOJOState" hook.
 * The callback to set state may receive an updater function which will receive
 * the previous state as argument and must return the next state.
 * The callback to set state may also receive a callback as its second parameter,
 * which is called in a layout effect after the state change is performed.
 */
export default function usePOJOStateWithLayoutEffectCallback(initialState) {
  return useStateWithSetStateCallback({
    initialState,
    useState: usePOJOState,
    useEffect: useLayoutEffect,
    onStateUpdate,
    onHasBailedOut,
  });
}
