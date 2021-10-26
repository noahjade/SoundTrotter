import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import TopCountries from ".";

test("Correctly renders default top countries component", () => {
    let countries = new Map();
    countries.set("A", { name: "A", code: "A", count: 5, artists: [] });
    countries.set("B", { name: "B", code: "B", count: 3, artists: [] });
    countries.set("C", { name: "C", code: "C", count: 6, artists: [] });

    const defaultTopCountriesComponent = shallow(<TopCountries countries={countries} />);
    expect(defaultTopCountriesComponent).toMatchSnapshot();
});