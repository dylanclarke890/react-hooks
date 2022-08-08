import { render, renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useClientRect from "../../../hooks/browser/useClientRect";
const MockDiv = () => <div></div>;

const setUp = () => renderHook(() => useClientRect());

describe("useClientRect", () => {
  test("returns default state", () => {
    const { result } = setUp();
    expect(result.current[1]).toBeNull();
  });

  test("returns expected dimensions", () => {
    const { result } = setUp();
    expect(result.current[1]).toBeNull();

    const { container } = render(<MockDiv />);
    const measure = result.current[0];
    act(() => {
      measure(container);
    });

    const measured = result.current[1];
    expect(measured).toBeTruthy();
    expect(typeof measured).toBe("object");
  });
});
