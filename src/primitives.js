export const primitiveProp = "project-primitive-rFOxpeMOVTDJMxE";

/**
 * Marks a function as a project primitive.
 * @param {Function} primitive A function to mark as a primitive.
 * @param {string} primitiveKey A unique key identifying the primitive.
 * @return {undefined}
 */
export default function primitive(primitive, primitiveKey) {
  primitive[primitiveProp] = {
    ...(primitive[primitiveProp] || {}),
    [primitiveKey]: true,
  };
}

/**
 * Tests if the given value is a primitive of the given primitive type.
 * @param {*} possiblePrimitive The given value.
 * @param {Function} primitiveType The given primitive type.
 * @return {boolean} True if the given value is a primitive of the given primitive type.
 */
export function isPrimitiveOfType(possiblePrimitive, primitiveType) {
  const primitiveKey = primitiveType[primitiveProp];
  return !!(
    possiblePrimitive &&
    possiblePrimitive[primitiveProp] &&
    possiblePrimitive[primitiveProp][primitiveKey]
  );
}
