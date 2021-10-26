import React from "react";
import TopCountries from "../topCountries";
import SpotifyCharts from "../spotifyCharts";
import style from "./style.module.scss";
import ArtistsListenedTo from "../artistsListenedTo";

function SideBarContent({
  spotify,
  selectedCountry,
  tabNumber,
  countries,
  topSongs,
  finalCount,
}) {
  function CreditsTab() {
    return (
      <div className={style.container}>
        <h3>Developers:</h3>
        <h5>Group 31: Maroon Monkeys</h5>
        <li>Eva-Rae Mclean</li>
        <li>Sarah Trenberth</li>
        <li>Max Gurr</li>
        <li>Hazel Williams</li>
      </div>
    );
  }

  return (
    <div>
      {tabNumber === 1 ? (
        <TopCountries
          spotify={spotify}
          countries={countries}
          finalCount={finalCount}
        />
      ) : null}
      {tabNumber === 2 ? (
        <ArtistsListenedTo
          countries={countries}
          selectedCountry={selectedCountry}
        />
      ) : null}
      {tabNumber === 3 ? (
        <SpotifyCharts topSongs={topSongs} selectedCountry={selectedCountry} spotify={spotify} />
      ) : null}
      {tabNumber === 4 ? CreditsTab() : null}
    </div>
  );
}

export default SideBarContent;
