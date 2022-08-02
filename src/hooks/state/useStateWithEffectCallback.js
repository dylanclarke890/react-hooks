import { useState, useEffect } from "react";
import useStateWithSetStateCallback from "../_internal/useStateWithSetStateCallback";

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
