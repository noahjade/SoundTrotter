import renderer from "react-test-renderer";
import { mount } from "enzyme";
import PlayBar from ".";

const { act } = renderer;

const mockPlaybackState = {
  item: {},
  is_playing: true,
};

const mockSpotify = {
  getMyCurrentPlaybackState: () => {
    return Promise.resolve(mockPlaybackState);
  },
};

test("Correctly renders playbar with pause button when a playing track is provided", async () => {
  let view;
  await act(async () => {
    view = renderer.create(<PlayBar spotify={mockSpotify} />);
  });
  expect(view).toMatchSnapshot();
});

test("Correctly renders playbar with play button when a paused track is provided", async () => {
  mockPlaybackState.is_playing = false;
  let view;
  await act(async () => {
    view = renderer.create(<PlayBar spotify={mockSpotify} />);
  });
  expect(view).toMatchSnapshot();
});

test("Correctly hides playbar when a track is not provided", async () => {
  const view = renderer.create(<PlayBar spotify={{}} />);
  expect(view).toMatchSnapshot();
});
