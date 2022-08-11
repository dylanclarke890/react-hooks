import { renderHook } from "@testing-library/react";
import useNestedDataCallback from "../../../hooks/callback/useNestedDataCallback";

describe("useNestedDataCallback", () => {
  const setUp = (arr) => renderHook(() => useNestedDataCallback(arr));

  test("returns initial state", () => {
    const { result } = setUp({ test: ["testing"] });
    expect(result.current(["test"])).toStrictEqual(["testing"]);
  });
});
