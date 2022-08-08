import { renderHook, act } from "@testing-library/react-hooks";
import useIsOnline from "../../../hooks/browser/useIsOnline";
describe("useIsOnline", () => {
  describe("with user offline", () => {
    const originalNav = window.navigator;

    beforeAll(() => {
      const navigator = {
        onLine: false,
      };
      Object.defineProperty(window, "navigator", {
        value: navigator,
        writable: true,
      });
    });

    afterAll(() => {
      Object.definePropertywindow,
        "navigator",
        {
          value: originalNav,
        };
    });

    const setUp = () => renderHook(() => useIsOnline());

    test("returns false if user is offline", () => {
      const { result } = setUp();
      expect(result.current).toBe(false);
    });

    test("sets isOnline to true when online event listener fires", () => {
      const { result } = setUp();
      expect(result.current).toBe(false);
      act(() => {
        window.dispatchEvent(new Event("online"));
      });
      expect(result.current).toBe(true);
    });
  });

  describe("with user online", () => {
    const originalNav = window.navigator;

    beforeAll(() => {
      const navigator = {
        onLine: true,
      };
      Object.defineProperty(window, "navigator", {
        value: navigator,
        writable: true,
      });
    });

    afterAll(() => {
      Object.definePropertywindow,
        "navigator",
        {
          value: originalNav,
        };
    });

    const setUp = () => renderHook(() => useIsOnline());

    test("returns true if user is online", () => {
      const { result } = setUp();
      expect(result.current).toBe(true);
    });

    test("sets isOnline to false when offline event listener fires", () => {
      const { result } = setUp();
      expect(result.current).toBe(true);
      act(() => {
        window.dispatchEvent(new Event("offline"));
      });
      expect(result.current).toBe(false);
    });
  });
});
