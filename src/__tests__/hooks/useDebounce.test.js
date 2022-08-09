import { renderHook } from "@testing-library/react-hooks";
import useDebounce from "../../hooks/useDebounce";

describe("useDebounce", () => {
  const setUp = (fn, delay) => renderHook(() => useDebounce(fn, delay));
  test("executes just once", () => {
    jest.useFakeTimers();
    const func = jest.fn(() => true);
    const { result } = setUp(func, 1000);
    for (let i = 0; i < 100; i++) result.current();
    jest.runAllTimers();
    expect(func).toBeCalledTimes(1);
  });
});
