import { renderHook } from "@testing-library/react-hooks";
import useCallbackRef from "../../../hooks/callback/useCallbackRef";
describe("useCallbackRef", () => {
  test("returns ref to callback", () => {
    const mock = jest.fn(() => true);
    const { result } = renderHook(() => useCallbackRef(mock));
    expect(result.current.current()).toBe(true);
  });

  test("updates ref if callback changes", () => {
    let mockVal = true;
    let mock = jest.fn(() => mockVal);
    const { result, rerender } = renderHook(() => useCallbackRef(mock));
    expect(result.current.current()).toBe(true);
    mockVal = false;
    rerender(mock);
    expect(result.current.current()).toBe(false);
  });
});
