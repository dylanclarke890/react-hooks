import { renderHook } from "@testing-library/react";
import usePrevious from "../../../hooks/state/usePrevious";

describe("usePrevious", () => {
  test("Should return undefined for the initial state", () => {
    const { result } = renderHook(() => usePrevious(1));
    expect(result.current).toBeUndefined();
  });

  test("Should return the previous state on state change", () => {
    let initial = 1;
    const { result, rerender } = renderHook(() => usePrevious(initial));
    expect(result.current).toBeUndefined();
    initial = 5;
    rerender();
    expect(result.current).toBe(1);
    initial = 10;
    rerender();
    expect(result.current).toBe(5);
  });
});
