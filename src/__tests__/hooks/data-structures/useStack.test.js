import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useStack from "../../../hooks/data-structures/useStack";

describe("useStack", () => {
  const setUp = () => renderHook(() => useStack([]));
  test("returns default state", () => {
    const { result } = setUp();
    const [arr, push, pop] = result.current;
    expect(arr).toStrictEqual([]);
  });

  test("pushes an item to the stack", () => {
    const { result } = setUp();
    const [arr, push, pop] = result.current;
    expect(arr).toStrictEqual([]);
    push("test");
    expect(result.current[0]).toStrictEqual(["test"]);
  });

  test("pops an item from the stack", () => {
    const { result } = setUp();
    const [arr, push, pop] = result.current;
    expect(arr).toStrictEqual([]);
    push("test");
    expect(result.current[0]).toStrictEqual(["test"]);
    expect(result.current[2]()).toStrictEqual("test");
    expect(result.current[0]).toStrictEqual([]);
  });
});
