import { renderHook } from "@testing-library/react-hooks";
import useFactory from "../../hooks/useFactory";

describe("useFactory", () => {
  const setUp = (tuples, deps) => renderHook(() => useFactory(tuples, deps));

  test("returns factory state on mount", () => {
    const { result } = setUp(() => [[true, () => true]]);
    expect(result.current()).toBe(true);
  });

  test("returns default state on mount", () => {
    const { result } = setUp(() => [[false, () => true], () => true]);
    expect(result.current()).toBe(true);
  });
});
