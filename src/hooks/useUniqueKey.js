import { useMemo } from "react";
import { uniqueId, trimEnd } from "dc-javascript-utils";

const uniqueKeyPrefix = "react-hooks-ellViKYMFK-";

/**
 * Hook returning a unique key.
 * @param {*} [dep] An optional dep which, if set and when changed, will force the generation
 * of a new key.
 * @return {string} A unique key.
 */
export default function useUniqueKey(dep = void 0) {
  const key = useMemo(
    () =>
      uniqueId(
        `${trimEnd(
          `${uniqueKeyPrefix}${typeof dep === "string" ? dep : ""}-`,
          "-"
        )}-`
      ),
    [dep]
  );
  return key;
}
