import useArray from "../../../hooks/data-structures/useArray";
import { renderHook } from "@testing-library/react-hooks";

describe("useArray", () => {
  const setUp = () => renderHook(() => useArray());
  test("returns default state", () => {
    const { result } = setUp();
    expect(result.current).toBeUndefined();
  });
});

