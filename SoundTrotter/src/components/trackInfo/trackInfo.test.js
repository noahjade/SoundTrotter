import renderer from "react-test-renderer";
import TrackInfo from ".";

test("Correctly renders track info", () => {
  const mockTrackInfo = {
    album: {
      images: [
        {
          url: "image-url",
        },
      ],
      name: "album",
    },
    name: "track",
    artists: [
      {
        name: "artist1",
      },
      {
        name: "artist2",
      },
      {
        name: "artist3",
      },
    ],
  };

  const view = renderer.create(<TrackInfo trackItem={mockTrackInfo} />);
  expect(view).toMatchSnapshot();
});
