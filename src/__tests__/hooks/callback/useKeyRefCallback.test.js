import { renderHook } from "@testing-library/react";
import useKeyRefCallback from "../../../hooks/callback/useKeyRefCallback";

describe("useKeyRefCallback", () => {
  const setUp = () => renderHook(() => useKeyRefCallback());

  test("returns default state", () => {
    const { result } = setUp();
    expect(result.current("test")).toEqual({ current: null });
  });
});
