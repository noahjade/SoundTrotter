import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import ArtistsListenedTo from ".";
 
test("Correctly renders default artists listened to component", () => {
    let selectedCountry = {
        code: "NONE",
        name: "NONE",
        artists: []
    }
    const defaultArtistsListenedToComponent = shallow(<ArtistsListenedTo selectedCountry={selectedCountry} />);
    expect(defaultArtistsListenedToComponent).toMatchSnapshot();
});