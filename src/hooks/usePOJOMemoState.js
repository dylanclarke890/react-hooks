import { useRef, useMemo, useEffect } from "react";
import usePOJOState from "./usePOJOState";

/**
 * Hook to use a POJO state which merges values of the previous state with the next one
 * if the partial state update of the next state is not the same as the previous state
 * for the same keys depending on the POJO passed as parameter.
 * The difference from the "usePOJOState" hook is that as soon as the POJO passed as
 * parameter changes (i.e. its reference points to another object), the state is reinitialized.
 * @param {Object} pojo A POJO (Plain Old JavaScript Object).
 * @return {Array} A useState-like tuple of two values, current state POJO and a callback to set
 * the state. The callback to set state may receive an updater function which will receive
 * the previous POJO state as argument and must return the next partial POJO state
 * update or "null" (to bail out of the state update, read below).
 * If the updater function returns "null" or a partial POJO state update which
 * has the same values for the same keys as the current POJO state, the update will be
 * bailed out as for the "useState" hook.
 */
export default function usePOJOMemoState(pojo) {
  const originalPojo = pojo;

  const rehydrateStateRef = useRef(false);
  pojo = useMemo(() => {
    rehydrateStateRef.current = true;
    return originalPojo;
  }, [originalPojo]);

  let setState;
  [pojo, setState] = usePOJOState(pojo);

  useEffect(() => {
    if (rehydrateStateRef.current) {
      rehydrateStateRef.current = false;
      setState(originalPojo);
    }
  }, [originalPojo, setState]);

  return [pojo, setState];
}
