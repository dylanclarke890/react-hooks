import { render, renderHook } from "@testing-library/react";
import useClientRect from "../../../hooks/browser/useClientRect";
const mockDiv = () => <div style={"width:400px;height:400px"}></div>;

mockDiv(); // to shut up IDE about value not being read.

const setUp = () => renderHook(() => useClientRect());

describe("useClientRect", () => {
  test("returns default state", () => {
    const { result } = setUp();
    expect(result.current[1]).toBeNull();
  });

  test("returns expected dimensions", () => {
    const { result, rerender } = setUp();
    expect(result.current[1]).toBeNull();

    const { container } = render(<mockDiv />);
    const measure = result.current[0];

    measure(container);
    rerender();

    const measured = result.current[1];
    expect(measured).toBeTruthy();
    expect(typeof measured).toBe("object");
  });
});
