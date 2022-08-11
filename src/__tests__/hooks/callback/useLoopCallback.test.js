import { renderHook } from "@testing-library/react";
import useLoopCallback from "../../../hooks/callback/useLoopCallback";

describe("useLoopCallback", () => {
  const setUp = (arr) => renderHook(() => useLoopCallback(arr));

  test("returns default state", () => {
    const { result } = setUp(["test"]);
    expect(result.current((v) => v + "ing")).toStrictEqual(["testing"]);
  });
});
