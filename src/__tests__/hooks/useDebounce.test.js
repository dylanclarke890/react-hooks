import { renderHook, act } from "@testing-library/react-hooks";
import useDebounce from "../../hooks/useDebounce";

test("useDebounce should return a debounced function", () => {
  jest.useFakeTimers();
  const debounced = renderHook(
    useDebounce(
      jest.fn(() => true),
      1000
    )
  );

  expect(debounced).not.toBeCalled();
  jest.runAllTimers();
  expect(debounced).toBeCalled();
});
