import useUnmountEffect from "../../../hooks/component-lifecycle/useUnmountEffect";
import { renderHook } from "@testing-library/react-hooks";

describe("useUnmountEffect", () => {
  test("only calls func on unmount", () => {
    const mock = jest.fn();
    const { rerender, unmount } = renderHook(() => useUnmountEffect(mock));
    expect(mock).not.toBeCalled();
    for (let i = 0; i < 5; i++) {
      rerender();
      expect(mock).not.toBeCalled();
    }
    unmount();
    expect(mock).toBeCalled();
  });
});
