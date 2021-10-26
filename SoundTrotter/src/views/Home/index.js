import React, { useState, useEffect } from "react";
import { getArtists } from "../../utils/spotifyUserData";
import style from "./style.module.scss";
import spotifylogo from "../../assets/spotify-icon-green.png";
import {
  getCountryCountForListOfArtists,
  getSpotifySongsAndArtistsByCountryCodes,
  getBasicListOfCountries,
} from "../../utils/searchWithAPI";
import getListOfCountries from "../../utils/searchWithAPI";
import { getTopSongsPlaylistForCountry } from "../../utils/spotifyChartPlaylists";

// COMPONENTS
import TopBar from "../../components/topBar";
import HelpBox from "../../components/helpBox";
import Map from "../../components/worldMap";
import SideBar from "../../components/sideBar";
import PlayBar from "../../components/playBar";
import Indicator from "../../components/indicator";

const PLAYER_NAME = "Maroon Monkeys Spotify Player";

function Home({ spotify }) {
  const emptyCountryList = getListOfCountries(); //for initialising map
  const emptyBasicCountryList = getBasicListOfCountries();

  const [countriesWithCounts, setCountriesWithCounts] = useState(
    emptyCountryList
  ); //updated as we get list of countries from user's recent listening
  const [numCountriesFetched, setCountriesFetched] = useState(0); //updated as songs from countries come in
  const [isLoading, setIsLoading] = useState(false);

  const [numCountries, setNumCountries] = useState("???");
  const [mapData, setMapData] = useState(emptyBasicCountryList);
  const [currentCountry, setCurrentCountry] = useState("");
  const [showHelp, setShowHelp] = useState(0);
  const [user, setUser] = useState("");
  const [countries, setCountries] = useState(undefined);
  const [topSongs, setTopSongs] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState({
    code: "NONE",
    name: "NONE",
    artists: [],
  });

  function toggleHelpBox() {
    if (showHelp === 0) {
      setShowHelp(1);
    } else {
      setShowHelp(0);
    }
  }

  // Handles the selection of a country on the map, allowing us to change info/display etc
  const AfterCountrySelected = (e, countryCode) => {
    if (typeof countries !== "undefined") {
      setSelectedCountry({
        code: countryCode,
        name: countries.get(countryCode).name,
        artists: countries.get(countryCode).artists,
      });
    } else {
      // Information isn't ready yet
      setSelectedCountry({ code: countryCode, name: "NOT READY", artists: [] });
    }
    // Updates the location of the marker that indicates that that country is currently selected.
    setCurrentCountry(countryCode);
    getTopSongsPlaylistForCountry(spotify, countryCode, setTopSongs);
  };

  const getCountries = async () => {
    console.log("geting countries...");
    setIsLoading(true);
    const artists = await getArtists(spotify);
    const countries = await getCountryCountForListOfArtists(
      artists,
      setCountriesWithCounts,
      setMapData,
      setIsLoading
    );
    setCountries(countries);

    let count = 0;
    countries.forEach((c) => {
      if (c.count > 0) {
        count++;
      }
    });
    setNumCountries(count);
  };

  useEffect(() => {
    spotify.getMe().then((user) => {
      setUser(user.display_name);
    });

    let playerInterval;
    const initialiseSpotifyPlayer = async () => {
      const token = spotify.getAccessToken();

      if (token) {
        clearInterval(playerInterval);

        const player = new window.Spotify.Player({
          name: PLAYER_NAME,
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        player.connect();

        player.on("ready", (data) => {
          let { device_id } = data;
          spotify.transferMyPlayback([device_id]);
        });
      }
    };
    playerInterval = setInterval(() => initialiseSpotifyPlayer(), 1000);

    getCountries();
  }, [spotify]);

  return (
    <div className={style.home}>
      <TopBar user={user} showhelpFunction={toggleHelpBox} />
      <div className={style.helpContainer} showhelp={showHelp}>
        <HelpBox hideBox={toggleHelpBox} />
      </div>

      {process.env.NODE_ENV !== "test" && isLoading && (
        <Indicator text="Filling In Map" />
      )}

      <div className={style.centerContent}>
        <div className={style.mapArea}>
          {process.env.NODE_ENV !== "test" && (
            <Map
              mapData={mapData}
              onClickEventHandler={AfterCountrySelected}
              countryToMark={currentCountry}
            />
          )}
        </div>
        <div className={style.sideBar}>
          <SideBar
            spotify={spotify}
            selectedCountry={selectedCountry}
            countries={countries}
            topSongs={topSongs}
            finalCount={numCountries}
            spotify={spotify}
          />
        </div>
      </div>

      <div className={style.bottomBar}>
        <PlayBar spotify={spotify} countries={countries} />
      </div>
    </div>
  );
}

export default Home;
