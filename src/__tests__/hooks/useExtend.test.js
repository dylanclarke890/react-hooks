import { renderHook } from "@testing-library/react-hooks";
import useExtend from "../../hooks/useExtend";

describe("useExtend", () => {
  const setUp = (deps, initialState = {}) =>
    renderHook(() => useExtend(initialState, deps || []));
  test("returns initial state on mount", () => {
    const { result } = setUp();
    expect(result.current).toStrictEqual({});
  });

  test("allows state to be extended if obj passed in deps", () => {
    const { result } = setUp([{ test: true }]);
    expect(result.current).toStrictEqual({ test: true });
  });

  test("updates the state when a dependancy changes", () => {
    let dep = ["someVal"];
    const { result } = setUp([dep], () => dep);
    expect(result.current).toStrictEqual(["someVal"]);

    dep = ["newVal"];
    expect(result.current).toStrictEqual(["someVal"]);
  });
});
