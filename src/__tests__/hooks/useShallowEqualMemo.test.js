import { renderHook } from "@testing-library/react";
import useShallowEqualMemo from "../../hooks/useShallowEqualMemo";

describe("useShallowEqualMemo", () => {
  const setUp = (val) => renderHook(() => useShallowEqualMemo(val));
  test("returns the value passed in on mount", () => {
    const { result } = setUp("Test");
    expect(result.current).toBe("Test");
  });

  test("returns the given value if not shallowly equal to the previous", () => {
    const initial = { Test: "yes" };
    const { result, rerender } = setUp(initial);
    expect(result.current).toStrictEqual(initial);
    initial.equal = "Yes";
    rerender();
    expect(result.current).toStrictEqual({ equal: "Yes", Test: "yes" });
  });

  test("returns the previous value if the next compares shallowly equal", () => {
    const initial = { Test: ["yes"] };
    const { result, rerender } = setUp(initial);
    expect(result.current).toStrictEqual(initial);
    initial.equal = "No";
    rerender();
    expect(result.current).toStrictEqual(initial);
  });
});
