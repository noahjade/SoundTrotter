import renderer from "react-test-renderer";
import Login from ".";

test("Correctly renders login view", () => {
  const view = renderer.create(<Login />);
  expect(view).toMatchSnapshot();
});
