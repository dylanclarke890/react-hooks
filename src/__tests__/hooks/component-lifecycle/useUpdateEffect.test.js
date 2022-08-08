import { renderHook, act } from "@testing-library/react-hooks";
import useUpdateEffect from "../../../hooks/component-lifecycle/useUpdateEffect";

describe("useUpdateEffect", () => {
  let effectMock;
  beforeEach(() => {
    effectMock = jest.fn();
  });

  afterEach(() => {
    effectMock = null;
  });

  const setUp = () => renderHook(() => useUpdateEffect(effectMock));
  test("Shouldn't call func on mount", () => {
    setUp();
    expect(effectMock).not.toBeCalled();
  });

  test("Shouldn't call func on unmount", () => {
    const { unmount } = setUp();
    expect(effectMock).not.toBeCalled();
    unmount();
    expect(effectMock).not.toBeCalled();
  });

  test("Should call func on update", () => {
    const { rerender } = renderHook(() => useUpdateEffect(effectMock));
    expect(effectMock).not.toHaveBeenCalled();
    let expectedCount = 0;
    for (let i = 0; i < 5; i++) {
      expectedCount++;
      rerender();
      expect(effectMock).toHaveBeenCalledTimes(expectedCount);
    }
  });
});
