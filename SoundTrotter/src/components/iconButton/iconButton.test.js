import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";

import IconButton from ".";

test("Correctly renders next button", () => {
  const view = renderer.create(<IconButton type="next" />);
  expect(view).toMatchSnapshot();
});

test("Correctly renders prev button", () => {
  const view = renderer.create(<IconButton type="previous" />);
  expect(view).toMatchSnapshot();
});

test("Correctly renders play button", () => {
  const view = renderer.create(<IconButton type="play" />);
  expect(view).toMatchSnapshot();
});

test("Correctly renders pause button", () => {
  const view = renderer.create(<IconButton type="pause" />);
  expect(view).toMatchSnapshot();
});

test("Correctly renders disabled button", () => {
  const view = renderer.create(<IconButton isDisabled={true} />);
  expect(view).toMatchSnapshot();
});

test("Click handler is called when button is clicked", () => {
  const mockClickHandler = jest.fn();
  const { getByText } = render(
    <IconButton type="next" clickHandler={mockClickHandler} />
  );
  const svg = getByText("next.svg");
  fireEvent.click(svg);
  expect(mockClickHandler).toHaveBeenCalledTimes(1);
});
