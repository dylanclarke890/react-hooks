import { useLayoutEffect, useState } from "react";
import { useStateWithSetStateCallback } from "./useStateWithEffectCallback";

/**
 * Hook to use a state with a `setState` function receiving a callback as its second parameter
 * called in a layout effect after the state change is performed.
 * @param {*|Function} initialState The initial state or a lazy callback returning the initial
 * state.
 * @return {Array} A tuple of two values, current state and callback to set state, like the one
 * returned by the "useState" hook.
 * The callback to set state may receive an updater function which will receive the previous
 * state as argument and must return the next state.
 * The callback to set state may also receive a callback as its second parameter,
 * which is called in a layout effect after the state change is performed.
 */
export default function useStateWithLayoutEffectCallback(initialState) {
  return useStateWithSetStateCallback({
    initialState,
    useState,
    useEffect: useLayoutEffect,
  });
}
