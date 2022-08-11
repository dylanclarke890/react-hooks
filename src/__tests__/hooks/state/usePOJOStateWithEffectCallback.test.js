import { renderHook } from "@testing-library/react";
import usePOJOStateWithEffectCallback from "../../../hooks/state/usePOJOStateWithEffectCallback";

describe("usePOJOStateWithEffectCallback", () => {
  const setUp = (initState) =>
    renderHook(() => usePOJOStateWithEffectCallback(initState));
  test("returns default state", () => {
    const { result } = setUp({ test: true });
    expect(result.current[0]).toStrictEqual({ test: true });
  });
});
