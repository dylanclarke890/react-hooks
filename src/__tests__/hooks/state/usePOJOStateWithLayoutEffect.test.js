import { renderHook } from "@testing-library/react";
import usePOJOStateWithLayoutEffect from "../../../hooks/state/usePOJOStateWithLayoutEffect";

describe("usePOJOStateWithLayoutEffect", () => {
  const setUp = (initState) =>
    renderHook(() => usePOJOStateWithLayoutEffect(initState));
  test("returns default state", () => {
    const { result } = setUp({ test: true });
    expect(result.current[0]).toStrictEqual({ test: true });
  });
});
