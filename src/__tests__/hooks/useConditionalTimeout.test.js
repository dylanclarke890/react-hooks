import { renderHook } from "@testing-library/react-hooks";
import useConditionalTimeout from "../../hooks/useConditionalTimeout";

describe("useConditionalTimeout", () => {
  const setUp = (fn, delay) =>
    renderHook(() => useConditionalTimeout(fn, delay, true));

  test("returns delayed function", () => {
    jest.useFakeTimers();
    const mock = jest.fn(() => "test");
    setUp(mock, 1000);
    expect(mock).not.toBeCalled();
    jest.runAllTimers();
    expect(mock).toBeCalled();
  });
});
