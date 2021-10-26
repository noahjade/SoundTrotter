import { shallow } from "enzyme";
import SpotifyCharts from ".";

test("Correctly renders default spotify charts component", () => {
    let selectedCountry = {
        code: "NONE",
        name: "NONE",
        artists: []
    }
    let topSongs = [];
    const defaultSpotifyChartsComponent = shallow(<SpotifyCharts topSongs={topSongs} selectedCountry={selectedCountry} />);
    expect(defaultSpotifyChartsComponent).toMatchSnapshot();
});