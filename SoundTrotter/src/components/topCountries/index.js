import React, { useState } from "react";
import style from "./style.module.scss";
import { createPlaylistAndPlay } from "../../utils/playlistService";

function TopCountries({ spotify, countries, finalCount }) {
  const [updateText, setUpdateText] = useState(undefined);

  const formatCountries = () => {
    let topTen = [];
    if (typeof countries != "undefined") {
      for (const [, country] of countries) {
        if (country.count > 0) {
          topTen.push({
            code: country.code,
            name: country.name,
            count: country.count,
          });
        }
      }
      topTen.sort((a, b) => (a.count < b.count ? 1 : -1));
    }

    return topTen.length == 0 ? (
      <span>"Data not available yet..."</span>
    ) : (
      topTen.map((country, index) => (
        <div className={style.country} key={index}>
          {index + 1}. {country.name} ({country.count} artist
          {country.count !== 1 && "s"})
        </div>
      ))
    );
  };

  //TODO: Replace with the generate playlist
  const generatePlaylist = async () => {
    setUpdateText("Making playlist...");
    createPlaylistAndPlay(spotify, countries, setUpdateText);
  };

  return (
    <div className={style.container}>
      {countries ? (
        <>
          <div className={[style.title, style.section].join(" ")}>
            You have recently listened to songs from {finalCount} countries.
          </div>
          <div className={style.bottomSection}>
            {updateText ? (
              <span>{updateText}</span>
            ) : (
              <>
                <div className={[style.title, style.section].join(" ")}>
                  There are still {195 - finalCount} countries to explore!
                </div>
                <div className={[style.buttonArea, style.section].join(" ")}>
                  <button onClick={generatePlaylist}>Fill The Gaps</button>
                </div>
              </>
            )}
          </div>
          <div className={[style.title].join(" ")}>
            Your Most Listened To Countries:
          </div>
          <div className={[style.list, style.section].join(" ")}>
            {formatCountries()}
          </div>
        </>
      ) : (
        <span>Data not available</span>
      )}
    </div>
  );
}

export default TopCountries;
