import { renderHook } from "@testing-library/react";
import useStateWithEffectCallback from "../../../hooks/state/useStateWithEffectCallback";

describe("useStateWithEffectCallback", () => {
  const setUp = (initState) =>
    renderHook(() => useStateWithEffectCallback(initState));

  test("returns default state", () => {
    const { result } = setUp("test");
    expect(result.current[0]).toBe("test");
  });
});
