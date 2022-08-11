import { useState, useMemo } from "react";
import { partialShallowEqual } from "dc-javascript-utils";

/**
 * Hook to use a POJO state which merges values of the previous state with the next one
 * if the partial state update of the next state is not the same as the previous state
 * for the same keys.
 * @param {Object|Function} initialState The initial state, either a POJO (Plain Old JavaScript
 * Object) or a function returning a POJO (lazy initial state).
 * @return {Array} A useState-like tuple of two values, current state POJO and a
 * callback to set the state.
 * The callback to set state may receive an updater function which will receive
 * the previous POJO state as argument and must return the next partial POJO state
 * update or "null" (to bail out of the state update, read below).
 * If the updater function returns "null" or a partial POJO state update which
 * has the same values for the same keys as the current POJO state, the update will be
 * bailed out as for the "useState" hook.
 */
export default function usePOJOState(initialState) {
  const [state, setState] = useState(initialState);
  const setPOJOState = useMemo(
    () => (nextState) =>
      setState((prevState) => {
        const newState =
          typeof nextState === "function" ? nextState(prevState) : nextState;
        if (newState === null) return prevState;
        return partialShallowEqual(prevState, newState)
          ? prevState
          : { ...prevState, ...newState };
      }),
    []
  );
  return [state, setPOJOState];
}
