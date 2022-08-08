import { renderHook } from "@testing-library/react";
import useLazyRef from "../../hooks/useLazyRef";

describe("useLazyRef", () => {
  const setUp = (fn) => renderHook(() => useLazyRef(fn));

  test("returns a func on mount which returns state lazily", () => {
    const mockFn = jest.fn(() => () => true);
    const { result } = setUp(mockFn);
    expect(mockFn).toBeCalled();
    expect(result.current.current()).toBe(true);
  });
});
