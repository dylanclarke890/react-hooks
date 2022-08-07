import { renderHook, act } from "@testing-library/react";
import useToggle from "../../hooks/useToggle";

describe("useToggle", () => {
  test("mounts with default state", () => {
    const { result } = renderHook(() => useToggle());
    const [state, changeState] = result.current;
    expect(state).toBe(false);
    expect(typeof changeState).toBe("function");
  });

  test("mounts with initial state", () => {
    const { result } = renderHook(() => useToggle(true));
    const [state, changeState] = result.current;
    expect(state).toBe(true);
    expect(typeof changeState).toBe("function");
  });

  test("allows state to be changed", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current[0]).toBe(false);
    expect(typeof result.current[1]).toBe("function");
    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(true);
  });
});
