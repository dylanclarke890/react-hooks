import useFactory from "../useFactory";

/**
 * Hook returning an array for a given data structure.
 * @param {Array} dataStructure A data structure.
 * @return {Array} An array containing the values of the data structure.
 * If an array is given as the data structure, the same array will be returned by this hook.
 */
export default function useArray(dataStructure) {
  const arrayFactoryFn = useFactory(
    () => [
      [dataStructure instanceof Map, () => dataStructure.values()],
      () => dataStructure,
    ],
    [dataStructure]
  );
  return arrayFactoryFn();
}
