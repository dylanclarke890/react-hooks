import { renderHook } from "@testing-library/react-hooks";
import useCallbackRef from "../../../hooks/callback/useCallbackRef";
describe("useCallbackRef", () => {
  test("returns ref to callback", () => {
    const mock = jest.fn(() => true);
    const { result } = renderHook(() => useCallbackRef(mock));
    expect(result.current.current()).toBe(true);
  });
});
