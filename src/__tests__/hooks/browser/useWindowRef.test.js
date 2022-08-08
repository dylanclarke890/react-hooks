import { renderHook } from "@testing-library/react";
import useWindowRef from "../../../hooks/browser/useWindowRef";

let windowSpy;

beforeEach(() => {
  windowSpy = jest.spyOn(window, "window", "get");
});

afterEach(() => {
  windowSpy.mockRestore();
});

test("useWindowRef returns a ref to the window", () => {
  renderHook(() => useWindowRef());
  expect(windowSpy).toBeCalled();
});
