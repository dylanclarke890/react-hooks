import useFactory from "./useFactory";
import { ImmutableLinkedOrderedMap } from "dc-javascript-utils";

/**
 * Hook generating a callback to easily loop through a data structure.
 * @param {Array|ImmutableLinkedOrderedMap} dataStructure A data structure.
 * @return {(fn: (value: *) => *) => Array} A function which receives a callback to loop through
 * the values of the data structure returning an array with the mapped values.
 */
export default function useLoopCallback(dataStructure) {
  const loopCallback = useFactory(
    () => [
      [
        ImmutableLinkedOrderedMap.isMap(dataStructure),
        (fn) => dataStructure.map(fn),
      ],
      (fn) => dataStructure.map(fn),
    ],
    [dataStructure]
  );
  return loopCallback;
}
