import { curry } from "dc-javascript-utils";
import primitive, { primitiveProp } from "./primitives";

const primitiveKey = "visitor-GanIjeOSkQd2ZgV";

/**
 * Visitor primitive.
 * @param {*} key The key to visit.
 * @param {Function} visit The visitor's function to execute when visiting some data
 * at the given key.
 */
function visitor(key, visit) {
  const visitor = {
    key,
    visit: (...args) => visit(...args),
  };
  primitive(visitor, primitiveKey);
  return visitor;
}

const curriedVisitor = curry(visitor);
curriedVisitor[primitiveProp] = primitiveKey;
export default curriedVisitor;
