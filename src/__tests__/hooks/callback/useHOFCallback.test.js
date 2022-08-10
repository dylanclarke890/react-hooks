import { renderHook } from "@testing-library/react-hooks";
import useHOFCallback from "../../../hooks/callback/useHOFCallback";

describe("useHOFCallback", () => {
  const setUp = (fn, deps) => renderHook(() => useHOFCallback(fn, deps));

  test("returns function to create functions with", () => {
    let mockVal = ["yes"];
    const mock = jest.fn(() => mockVal);
    const { result } = setUp(mock, [mockVal]);
    expect(typeof result.current).toBe("function");
    const res = result.current();
    expect(res()).toStrictEqual(["yes"]);
  });

  test("update function if deps change", () => {
    let mockVal = ["yes"];
    const mock = jest.fn(() => mockVal);
    const { result } = setUp(mock, [mockVal]);
    expect(typeof result.current).toBe("function");
    const res = result.current();
    expect(res()).toStrictEqual(["yes"]);
    mockVal = ["no"];
    const change = result.current();
    expect(change()).toStrictEqual(["no"]);
  });
});
