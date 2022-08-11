import { renderHook } from "@testing-library/react";
import useStateWithLayoutEffectCallback from "../../../hooks/state/useStateWithLayoutEffectCallback";

describe("useStateWithLayoutEffectCallback", () => {
  const setUp = (initState) =>
    renderHook(() => useStateWithLayoutEffectCallback(initState));

  test("returns default state", () => {
    const { result } = setUp("test");
    expect(result.current[0]).toBe("test");
  });
});
