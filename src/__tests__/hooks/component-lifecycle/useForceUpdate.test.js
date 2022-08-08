import useForceUpdate from "../../../hooks/component-lifecycle/useForceUpdate";
import { fireEvent, render } from "@testing-library/react";
describe("useForceUpdate", () => {
  test("rerenders the component when called", () => {
    const renderSpy = jest.fn();
    function Component() {
      const forceUpdate = useForceUpdate();
      renderSpy();
      return (
        <button data-testid="btn" onClick={forceUpdate}>
          Click me
        </button>
      );
    }
    const { getByTestId } = render(<Component />);
    for (let i = 1; i < 10; i++) {
      expect(renderSpy).toHaveBeenCalledTimes(i);
      fireEvent.click(getByTestId("btn"));
    }
  });
});
