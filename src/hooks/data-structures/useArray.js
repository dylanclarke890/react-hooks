import useFactory from "../useFactory";
import { ImmutableLinkedOrderedMap } from "dc-javascript-utils";

/**
 * Hook returning an array for a given a data structure.
 * @param {Array|ImmutableLinkedOrderedMap} dataStructure A data structure.
 * @return {Array} An array containing the values of the data structure.
 * If an array is given as the data structure, the same array will be returned by this hook.
 */
export default function useArray(dataStructure) {
  const arrayFactoryFn = useFactory(
    () => [
      [
        ImmutableLinkedOrderedMap.isMap(dataStructure),
        () => dataStructure.values(),
      ],
      () => dataStructure,
    ],
    [dataStructure]
  );
  return arrayFactoryFn();
}
