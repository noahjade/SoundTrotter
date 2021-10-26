const redirectUri = "http://localhost:3000/";
const clientId = "376c736575c0456f8215eebec0eee1d2";
const clientSecret = "be0580a088334a0980940142351fac3b";
const encodedCredentials = window.btoa(clientId + ":" + clientSecret);
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "playlist-read-collaborative",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
];

/**
 * Parses window url to find access token
 * @returns The access token contained in the url
 */
export const getCodeFromUrl = () => {
  return window.location.search
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

/**
 * Gets access token set from the spotify API
 * @returns object containing the access_code, expires_in, and refresh_token
 */
export const fetchAuthToken = (code) => {
  var body = new URLSearchParams();
  body.append("grant_type", "authorization_code");
  body.append("code", code);
  body.append("redirect_uri", redirectUri);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: body,
  };
  return fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then((response) => {
      if (!response.ok) {
        return false;
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

/**
 * Refreshes the access token using the refresh token
 * @returns object containing access_token and expires_in
 */
export const fetchRefreshedToken = (refreshToken) => {
  var body = new URLSearchParams();
  body.append("grant_type", "refresh_token");
  body.append("refresh_token", refreshToken);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: body,
  };
  return fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then((response) => {
      if (!response.ok) {
        return false;
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

/**
 * sets the expiry time of the accessToken in local storage to five minutes before the token actually expires
 * @param {*} expiresIn how many seconds the token lasts before expiring
 * @returns time that the token expires, in milliseconds from epoch
 */
export const findExpiryTime = (expiresIn) => {
  const tenMinutes = 10 * 60 * 1000;
  const expiryTime = expiresIn * 1000 + Date.now() - tenMinutes;
  return expiryTime;
};

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=code&show_dialog=true`;
