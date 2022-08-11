import { renderHook } from "@testing-library/react";
import usePOJOMemoState from "../../../hooks/state/usePOJOMemoState";

describe("usePOJOMemoState", () => {
  const setUp = (initState) => renderHook(() => usePOJOMemoState(initState));
  test("returns default state", () => {
    const { result } = setUp({ test: true });
    expect(result.current[0]).toStrictEqual({ test: true });
  });
});
