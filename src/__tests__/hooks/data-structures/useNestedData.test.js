import { renderHook } from "@testing-library/react";
import useNestedData from "../../../hooks/data-structures/useNestedData";

describe("useNestedData", () => {
  const setUp = (data, keys) => renderHook(() => useNestedData(data, keys));
  test("returns default state", () => {
    const { result } = setUp({ test: ["ing"] }, ["test"]);
    expect(result.current).toStrictEqual(["ing"]);
  });
});