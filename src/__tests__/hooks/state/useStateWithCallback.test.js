import { renderHook } from "@testing-library/react";
import useStateWithCallback from "../../../hooks/state/useStateWithCallback";

describe("useStateWithCallback", () => {
  const setUp = (val, onChange, predicate) =>
    renderHook(() => useStateWithCallback(val, onChange, predicate));

  test("returns default state", () => {
    let mockVal = "test";
    const fn = jest.fn(() => true);
    const { result } = setUp([mockVal], fn);
    expect(result.current[0]).toStrictEqual(["test"]);
    mockVal = "testing";
    expect(fn).toBeCalled();
  });
});
