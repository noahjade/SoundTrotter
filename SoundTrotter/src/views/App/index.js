import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import {
  getCodeFromUrl,
  fetchAuthToken,
  fetchRefreshedToken,
  findExpiryTime,
} from "../../utils/spotifyService";

import SpotifyWebApi from "spotify-web-api-js";
// https://github.com/JMPerez/spotify-web-api-js

import Login from "../Login";
import Home from "../Home";

const STORAGE_ACCESS_TOKEN = "spotify_access_token";
const STORAGE_REFRESH_TOKEN = "spotify_refresh_token";
const STORAGE_TOKEN_EXPIRATION = "spotify_token_expiration";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState("");

  const handleNewToken = (code) => {
    fetchAuthToken(code).then((tokenData) => {
      // Store the tokens and expiry time in local storage
      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token;
      const expiryTime = findExpiryTime(tokenData.expires_in);

      localStorage.setItem(STORAGE_ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_TOKEN_EXPIRATION, expiryTime);

      spotify.setAccessToken(accessToken);
      setToken(accessToken);

      window.location = "/";
    });
  };

  const handleRefreshToken = (refreshToken) => {
    fetchRefreshedToken(refreshToken).then((refreshData) => {
      if (refreshData) {
        // set the new access token
        const newToken = refreshData.access_token;
        const expiryTime = findExpiryTime(refreshData.expires_in);

        localStorage.setItem(STORAGE_ACCESS_TOKEN, newToken);
        localStorage.setItem(STORAGE_TOKEN_EXPIRATION, expiryTime);

        spotify.setAccessToken(newToken);
        setToken(newToken);
      } else {
        // If the token could not be refreshed, the user needs to log in again
        setToken("");
      }
    });
  };

  useEffect(() => {
    // See if there is an existing token in storage
    const existingToken = localStorage.getItem(STORAGE_ACCESS_TOKEN);
    if (existingToken) {
      // Check whether current token has expired
      const expiryTime = localStorage.getItem(STORAGE_TOKEN_EXPIRATION);
      if (!expiryTime || expiryTime <= Date.now()) {
        // Current token is expired
        // Try to get new one through refresh token
        const refreshToken = localStorage.getItem(STORAGE_REFRESH_TOKEN);
        handleRefreshToken(refreshToken);
      } else {
        // Localstorage token is not expired, so we can use it
        spotify.setAccessToken(existingToken);
        setToken(existingToken);
      }
    } else {
      // No localStorage token, try to get from url
      const urlData = getCodeFromUrl();

      if (urlData.code) {
        // New token from url
        handleNewToken(urlData.code);
      }
    }
  }, []);

  return (
    <div className={style.App}>
      {token ? (
        <Home spotify={spotify} />
      ) : (
        <div className={style.Wrapper}>
          {" "}
          <Login />{" "}
        </div>
      )}
    </div>
  );
}

export default App;
