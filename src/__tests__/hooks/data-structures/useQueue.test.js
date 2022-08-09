import { renderHook } from "@testing-library/react-hooks";
import useQueue from "../../../hooks/data-structures/useQueue";

describe("useQueue", () => {
  const setUp = () => renderHook(() => useQueue([]));
  test("returns default state", () => {
    const { result } = setUp();
    expect(result.current[0]).toStrictEqual([]);
  });

  test("adds item to queue", () => {
    const { result } = setUp();
    expect(result.current[0]).toStrictEqual([]);
    result.current[1]("test");
    expect(result.current[0]).toStrictEqual(["test"]);
    result.current[1]("ing");
    expect(result.current[0]).toStrictEqual(["test", "ing"]);
  });

  test("removes item from queue", () => {
    const { result } = setUp();
    expect(result.current[0]).toStrictEqual([]);
    result.current[1]("test");
    expect(result.current[0]).toStrictEqual(["test"]);
    result.current[1]("ing");
    expect(result.current[0]).toStrictEqual(["test", "ing"]);
    expect(result.current[2]()).toBe("test");
    expect(result.current[0]).toStrictEqual(["ing"]);
  });
});
