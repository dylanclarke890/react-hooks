import { renderHook } from "@testing-library/react";
import usePOJOState from "../../../hooks/state/usePOJOState";

describe("usePOJOState", () => {
  const setUp = (initState) => renderHook(() => usePOJOState(initState));
  test("returns default state", () => {
    const { result } = setUp({ test: true });
    expect(result.current[0]).toStrictEqual({ test: true });
  });
});
