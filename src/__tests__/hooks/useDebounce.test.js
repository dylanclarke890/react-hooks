import { renderHook, act } from "@testing-library/react-hooks";
import useDebounce from "../../hooks/useDebounce";

describe("useExampleCustomReactHook", () => {
  it("Should provide a default message", () => {
    const { result } = renderHook(useDebounce);
    expect(result.current.message).toEqual(defaultMessage);
  });

  it("Should return a function", () => {
    const updatedMessage = "hello world!";
    const { result } = renderHook(useExampleCustomReactHook);
    expect(result.current.message).toEqual(defaultMessage);

    act(() => {
      result.current.setMessage(updatedMessage);
    });

    expect(result.current.message).toEqual(updatedMessage);
  });
});
