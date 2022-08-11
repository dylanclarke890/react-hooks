import { renderHook } from "@testing-library/react";
import useSyncRefsCallback from "../../../hooks/callback/useSyncRefsCallback";

describe("useSyncRefsCallback", () => {
  const setUp = (refs) => renderHook(() => useSyncRefsCallback(...refs));
  test("returns default state", () => {
    const { result } = setUp([]);
    expect(result.current()).toBe(undefined);
  });
});
