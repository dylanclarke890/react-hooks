import { useEffect } from "react";
import { useStateWithSetStateCallback } from "./state/useStateWithEffectCallback";
import usePOJOState from "./usePOJOState";
import { partialShallowEqual } from "dc-javascript-utils";

export const onStateUpdate = ({ prevState, newState }) => ({
  ...prevState,
  ...newState,
});

export function onHasBailedOut({ prevState, newState }) {
  return newState === null || partialShallowEqual(prevState, newState);
}

/**
 * Hook to use a POJO state with a `setState` function receiving a callback as its second
 * parameter called in an effect after the state change is performed.
 * @param {*|Function} initialState The initial POJO state or a lazy callback returning the
 * initial POJO state.
 * @return {Array} A tuple of two values, current POJO state and callback to set the POJO state,
 * like the one returned by the "usePOJOState" hook. The callback to set state may receive an
 * updater function which will receive the previous state as argument and must return the next
 * state. The callback to set state may also receive a callback as its second parameter, which
 * is called in an effect after the state change is performed.
 */
export default function usePOJOStateWithEffectCallback(initialState) {
  return useStateWithSetStateCallback({
    initialState,
    useState: usePOJOState,
    useEffect,
    onStateUpdate,
    onHasBailedOut,
  });
}
