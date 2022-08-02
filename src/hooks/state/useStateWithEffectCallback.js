import { useEffect, useState, useRef, useCallback } from "react";
import { randomString, isUndefined, LinkedQueue } from "dc-javascript-utils";
import usePOJOState from "../pojo-state/usePOJOState";
import useShallowEqualMemo from "../useShallowEqualMemo";
import useLazyRef from "../useLazyRef";

function defaultOnStateUpdate({ newState }) {
  return newState;
}

/**
 * Return false by default, for non-POJO state, bail out only if the new state is the same as the previous state.
 *
 */
function defaultOnHasBailedOut({ prevState, newState }) {
  return newState === prevState;
}

/**
 * Hook used internally for all hooks allowing to set state with a `setState` callback
 * (`useStateWithEffectCallback`, `useStateWithLayoutEffectCallback`, `usePOJOStateWithEffectCallback`, `usePOJOStateWithLayoutEffectCallback`).
 * @type {Function}
 */
export const useStateWithSetStateCallback = ({
  initialState,
  useEffect,
  onStateUpdate = defaultOnStateUpdate,
  onHasBailedOut = defaultOnHasBailedOut,
}) => {
  const counterRef = useRef([]);
  const randomValueCallback = useCallback(() => {
    counterRef.current++;
    counterRef.current = counterRef.current % Number.MAX_SAFE_INTEGER;
    return `${randomString()}@${counterRef.current}`;
  }, []);

  const [derivedState, setDerivedState] = usePOJOState((...args) => ({
    state:
      typeof initialState === "function" ? initialState(...args) : initialState,
    rand: randomValueCallback(),
  }));

  const state = useShallowEqualMemo(derivedState.state);

  const callbacksQueueRef = useLazyRef(() => new LinkedQueue());

  useEffect(() => {
    const len = callbacksQueueRef.current.length;
    for (let i = 0; i < len; i++) {
      const callback = callbacksQueueRef.current.dequeue();
      callback(state);
    }
  }, [derivedState.rand, state, callbacksQueueRef]);

  const setStateWithCallback = useCallback(
    (newStateUpdate, callback = void 0) => {
      const stateUpdate = (derivedState, ...args) => {
        let update = null;
        const prevState = derivedState.state;

        let newState =
          typeof newStateUpdate === "function"
            ? newStateUpdate(prevState, ...args)
            : newStateUpdate;

        const hasBailedOut = onHasBailedOut({ prevState, newState });
        const hasCallback = !isUndefined(callback);
        if (hasBailedOut) {
          if (hasCallback) {
            // State update has bailed out, but there is a "setState" callback to execute.
            // Execute the callback right away with the previous state.
            callback(prevState);
          }
        } else {
          update = {
            state: onStateUpdate({ prevState, newState }),
          };
          if (hasCallback) {
            // There is a state update and a "setState" callback to execute.
            // Enqueue the callback to execute it later with the updated state in the effect when the state has been updated.
            callbacksQueueRef.current.enqueue(callback);
            update.rand = randomValueCallback();
          }
        }

        return update;
      };
      return setDerivedState(stateUpdate);
    },
    [
      setDerivedState,
      randomValueCallback,
      callbacksQueueRef,
      onStateUpdate,
      onHasBailedOut,
    ]
  );

  return [state, setStateWithCallback];
};

/**
 * Hook to use a state with a `setState` function receiving a callback as its second parameter
 * called in an effect after the state change is performed.
 * @param {*|Function} initialState The initial state or a lazy callback returning the initial
 * state.
 * @return {Array} A useState-like tuple of two values, current state and callback to set state.
 * The callback to set state may receive an updater function which will receive the previous
 * state as argument and must return the next state. The callback to set state may also receive
 * a callback as its second parameter, which is called in an effect after the state change is
 * performed.
 */
export default function useStateWithEffectCallback(initialState) {
  return useStateWithSetStateCallback({ initialState, useState, useEffect });
}