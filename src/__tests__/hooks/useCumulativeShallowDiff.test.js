import { renderHook } from "@testing-library/react-hooks";
import useCumulativeShallowDiff from "../../hooks/useCumulativeShallowDiff";

describe("useCumulativeShallowDiff", () => {
  const setUp = (val) => renderHook(() => useCumulativeShallowDiff(val));

  test("should return default state on mount", () => {
    const { result } = setUp(true);
    expect(result.current).toBe(true);
  });
});
