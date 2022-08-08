import useMountEffect from "../../../hooks/component-lifecycle/useMountEffect";
import { renderHook } from "@testing-library/react-hooks";

describe("useMountEffect", () => {
  test("should only run on mount", () => {
    const mock = jest.fn();
    const { rerender } = renderHook(() => useMountEffect(mock));
    expect(mock).toBeCalledTimes(1);

    for (let i = 0; i < 5; i++) {
      rerender();
      expect(mock).toBeCalledTimes(1);
    }
  });
});
