import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import App from ".";

const { act } = renderer;
jest.mock("../../utils/spotifyService");

const storeNewTokenData = () => {
  localStorage.setItem("spotify_access_token", "token");
  localStorage.setItem("spotify_token_expiration", Date.now());
  localStorage.setItem("spotify_refresh_token", "refresh-token");
};
const storeRefreshedTokenData = () => {
  localStorage.setItem("spotify_access_token", "new-token");
  localStorage.setItem("spotify_token_expiration", Date.now() + 60 * 60 * 1000);
  localStorage.setItem("spotify_refresh_token", "refresh-token");
};

afterEach(() => {
  // Reset storage to remove token data
  localStorage.clear();

  // Reset jest function mocks
  jest.clearAllMocks();
});

test("Correctly renders default login screen", () => {
  // Shallow render used so the useEffect block won't run
  // If this runs, the component will get a token from mockSpotifyService
  // This authenticates the user, so the login screen won't show
  const defaultAppScreen = shallow(<App />);
  expect(defaultAppScreen).toMatchSnapshot();
});

test("It tries to get the spotify code from the url on each render", async () => {
  const spotifyService = require("../../utils/spotifyService");
  const urlCodeSpy = jest.spyOn(spotifyService, "getCodeFromUrl");

  await act(async () => {
    renderer.create(<App />);
  });
  expect(urlCodeSpy).toBeCalledTimes(1);
});

test("It tries to get access token data using the url code", async () => {
  const spotifyService = require("../../utils/spotifyService");
  const fetchAuthTokenSpy = jest.spyOn(spotifyService, "fetchAuthToken");

  await act(async () => {
    renderer.create(<App />);
  });
  expect(fetchAuthTokenSpy).toBeCalledTimes(1);
});

test("It uses the findExpiryTime utility for a new token", async () => {
  const spotifyService = require("../../utils/spotifyService");
  const findExpiryTimeSpy = jest.spyOn(spotifyService, "findExpiryTime");

  await act(async () => {
    renderer.create(<App />);
  });
  expect(findExpiryTimeSpy).toBeCalledTimes(1);
});

test("It stores new token items in localStorage", async () => {
  await act(async () => {
    renderer.create(<App />);
  });

  expect(Object.keys(localStorage.__STORE__).length).toBe(3);
  expect(localStorage.__STORE__["spotify_access_token"]).toBeDefined();
  expect(localStorage.__STORE__["spotify_refresh_token"]).toBeDefined();
  expect(localStorage.__STORE__["spotify_token_expiration"]).toBeDefined();
});

test("It tries to get a refreshed token when the current token has expired", async () => {
  const spotifyService = require("../../utils/spotifyService");
  const fetchRefreshedTokenSpy = jest.spyOn(
    spotifyService,
    "fetchRefreshedToken"
  );

  storeNewTokenData();

  await act(async () => {
    renderer.create(<App />);
  });

  expect(fetchRefreshedTokenSpy).toBeCalledTimes(1);
});

test("It stores the refreshed token information", async () => {
  storeNewTokenData();

  await act(async () => {
    renderer.create(<App />);
  });

  // new-token is only given by the mock freshToken function
  expect(localStorage.__STORE__["spotify_access_token"]).toBe("new-token");
});

test("It doesnt call any token methods when there is a good token in storage", async () => {
  const spotifyService = require("../../utils/spotifyService");
  const findExpiryTimeSpy = jest.spyOn(spotifyService, "findExpiryTime");
  const fetchRefreshedTokenSpy = jest.spyOn(
    spotifyService,
    "fetchRefreshedToken"
  );
  const fetchAuthTokenSpy = jest.spyOn(spotifyService, "fetchAuthToken");

  storeRefreshedTokenData();

  await act(async () => {
    renderer.create(<App />);
  });
  expect(findExpiryTimeSpy).toBeCalledTimes(0);
  expect(fetchRefreshedTokenSpy).toBeCalledTimes(0);
  expect(fetchAuthTokenSpy).toBeCalledTimes(0);
});

test("It renders the home page for an authorised user", async () => {
  storeRefreshedTokenData();

  // DOM render used so the mockSpotifyService can be used
  let appHomePage;
  await act(async () => {
    appHomePage = renderer.create(<App />);
  });
  expect(appHomePage).toMatchSnapshot();
});
