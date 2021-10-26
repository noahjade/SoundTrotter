import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Home from ".";

const { act } = renderer;
// Mock methods for spotify wrapper
const mockSpotify = {
  getMe: () => {
    return Promise.resolve({
      display_name: "user",
    });
  },
  getMyRecentlyPlayedTracks: ({}) => {
    return Promise.resolve({ items: [] });
  },
};

test("Correctly renders home view", async () => {
  let view;

  // act() is used so getMe() can run
  await act(async () => {
    view = renderer.create(<Home spotify={mockSpotify} />);
  });
  expect(view).toMatchSnapshot();
});
