import { useEffect, useState } from "react";

/**
 * Use state with a use effect hook that calls the onChange func if the val meets the criteria
 * of unlessPredicate (if specified).
 * @param {any} val The initial value for useState.
 * @param {(val) =>} onChange The callback to execute each time val changes.
 * @param {((val) => boolean) | null} unlessPredicate (optional) A predicate which should return
 * a boolean. It will run prior to executing onChange if specified.
 */
export default function useStateWithCallback(val, onChange, unlessPredicate) {
  const [value, setValue] = useState(val);
  useEffect(() => {
    if (unlessPredicate) unlessPredicate(value);
    onChange(value);
  }, [value]);
  return [value, setValue];
}
