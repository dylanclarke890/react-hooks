import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useForm from "../../../hooks/browser/useForm";

describe("useForm", () => {
  test("returns default state on mount", () => {
    const { result } = renderHook(() => useForm());
    const [values, _] = result.current;
    expect(values).toStrictEqual({});
  });

  test("returns passed initial state on mount", () => {
    const { result } = renderHook(() => useForm({ name: "Test" }));
    const [values, _] = result.current;
    expect(values).toStrictEqual({ name: "Test" });
  });

  test("updates state with the onchange callback", () => {
    const mockEvent = {
      target: {
        name: "name",
        value: "Testing",
      },
    };

    const { result } = renderHook(() => useForm({ name: "Test" }));
    const [values, onChange] = result.current;
    expect(values).toStrictEqual({ name: "Test" });

    act(() => {
      onChange(mockEvent);
    });

    expect(result.current[0]).toStrictEqual({ name: "Testing" });
  });
});
