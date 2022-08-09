import { renderHook } from "@testing-library/react-hooks";
import useDefaultValue from "../../hooks/useDefaultValue";

describe("useDefaultValue", () => {
  const setUp = (main, fallback) =>
    renderHook(() => useDefaultValue(main, fallback));

  test("returns undefined if no params passed on mount", () => {
    const { result } = setUp();
    const [val] = result.current;
    expect(val).toBeUndefined();
  });

  test("returns fallback val if default val is defined", () => {
    const { result } = setUp("Test", undefined);
    const [val] = result.current;
    expect(val).toBe("Test");
  });

  test("returns fallback val if default val is undefined", () => {
    const { result } = setUp(undefined, "Test");
    const [val] = result.current;
    expect(val).toBe("Test");
  });

  test("allows value to be changed with callback", () => {
    const { result } = setUp(undefined, "Test");
    let [val, callback] = result.current;
    expect(val).toBe("Test");
    callback("Testing");
    [val, callback] = result.current;
    expect(val).toBe("Testing");
  });
});
