import { renderHook } from "@testing-library/react";
import useMemoCallback from "../../../hooks/callback/useMemoCallback";

describe("useMemoCallback", () => {
  const setUp = (fn) => renderHook(() => useMemoCallback(fn));

  test("returns a callback", () => {
    let fnVal = true;
    const mock = jest.fn(() => fnVal);
    const { result } = setUp(mock);
    expect(result.current()).toBe(true);
  });
});
