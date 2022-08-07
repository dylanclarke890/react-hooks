import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useUniqueKey from "../../hooks/useUniqueKey";

describe("useUniqueKey", () => {
  test("Should return default state", () => {
    const { result } = renderHook(() => useUniqueKey());
    expect(result.current).toContain("react-hooks");
  });

  test("Should return a new key if a dependency changes.", () => {
    let valToChange = 5;
    const { result, rerender } = renderHook(() => useUniqueKey(valToChange));
    const first = result.current;
    expect(first).toContain("react-hooks");
    act(() => {
      valToChange = 10;
      rerender();
    });
    expect(result.current).not.toBe(first);
  });
});
