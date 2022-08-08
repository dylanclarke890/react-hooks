import { renderHook } from "@testing-library/react-hooks";
import useGeolocation from "../../../hooks/browser/useGeolocation";

describe("useGeolocation", () => {
  test("Should return geolocation if supported", () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((onSuccess, _) =>
        onSuccess({
          coords: {
            latitude: 12,
            longitude: 12,
          },
        })
      ),
    };
    global.navigator.geolocation = mockGeolocation;
    const { result } = renderHook(() => useGeolocation());
    expect(result.current).toStrictEqual({ latitude: 12, longitude: 12 });
  });

  test("Should return empty object if not supported and throwErr is set to false", () => {
    navigator.geolocation = undefined;
    const { result } = renderHook(() => useGeolocation());
    expect(result.current).toStrictEqual({});
  });

  test("Should throw error if not supported and throwErr is set to true", () => {
    navigator.geolocation = undefined;
    const { result } = renderHook(() => useGeolocation(true));
    expect(() => result.current).toThrow();
  });
});
