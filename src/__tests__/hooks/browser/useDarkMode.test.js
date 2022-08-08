import MatchMedia from "../../../_jest_mocks/matchMediaMock";
import { renderHook, act } from "@testing-library/react";
import useDarkMode from "../../../hooks/browser/useDarkMode";

let matchMedia;

const setUp = () => renderHook(() => useDarkMode("dark"));

describe("useDarkMode", () => {
  beforeAll(() => {
    matchMedia = new MatchMedia();
  });
  afterEach(() => {
    matchMedia.clear();
  });

  test("Returns default state", () => {
    const { result } = setUp();
    const [isDark, _] = result.current;
    expect(isDark).toBe(false);
  });

  test("Allows dark mode to be toggled via the callback", () => {
    const { result } = setUp();
    const [isDark, toggle] = result.current;
    expect(isDark).toBe(false);
    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(true);
  });

  test("Returns true if the user prefers dark mode", () => {
    matchMedia.useMediaQuery("(prefers-color-scheme: dark)");
    const { result } = setUp();
    const [isDark, _] = result.current;
    expect(isDark).toBe(true);
  });
});
