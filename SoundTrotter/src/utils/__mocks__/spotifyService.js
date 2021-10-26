/**
 * Parses window url to find access token
 * @returns The access token contained in the url
 */
export const getCodeFromUrl = () => {
  return {
    code: "url-code",
  };
};

/**
 * Gets access token set from the spotify API
 * @returns object containing the access_code, expires_in, and refresh_token
 */
export const fetchAuthToken = (code) => {
  return Promise.resolve({
    access_token: "token",
    expires_in: Date.now(),
    refresh_token: "refresh-token",
  });
};

/**
 * Refreshes the access token using the refresh token
 * @returns object containing access_token and expires_in
 */
export const fetchRefreshedToken = (refreshToken) => {
  const oneHour = 60 * 60 * 1000;
  return Promise.resolve({
    access_token: "new-token",
    expires_in: Date.now() + oneHour,
  });
};

/**
 * sets the expiry time of the accessToken in local storage to ten minutes before the token actually expires
 * @param {*} expiresIn how many seconds the token lasts before expiring
 * @returns time that the token expires, in milliseconds from epoch
 */
export const findExpiryTime = (expiresIn) => {
  const tenMinutes = 10 * 60 * 1000;
  const expiryTime = expiresIn * 1000 + Date.now() - tenMinutes;
  return expiryTime;
};

export const loginUrl = `mockLoginUrl`;
