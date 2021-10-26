import * as JSONcountries from "../initialisation/countries.json"; //from https://datahub.io/core/country-list#data-cli

//URLs for API calls

const _artistByNameSearchURL =
  "http://musicbrainz.org/ws/2/artist/?query=artist:";
const _artistByNameSearchURL_AudioDB =
  "https://www.theaudiodb.com/api/v1/json/1/search.php?s=";

/*  getListOfCountries()
 *   Returns a map of countries with a name, ISO 3166-1 code, and a count initialised to 0.
 */
export default async function getListOfCountries() {
  var countries = new Map();
  await JSONcountries.default.forEach((country) => {
    countries.set(country.Code, {
      name: country.Name,
      code: country.Code,
      count: 0,
      artists: [],
    });
  });
  return countries;
}

export function getBasicListOfCountries() {
  var countries = {};
  JSONcountries.default.forEach((country) => {
    countries[country.Code] = "no";
  });

  //hacky solution temp, mb switch from poly view to yes no.

  return countries;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*  fetchJsonFromURL()
 *   Helper function to fetch json data from a given URL. Returns the data.
 */
async function fetchJsonFromURL(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent":
        "Maroon Monkey Softeng 750 project; https://github.com/csdoris/Group-31-Maroon-Monkey; evarae.mclean@gmail.com",
    },
  });

  const json = await response.json();
  return json;
}

/*  fetchJsonFromURLNoHeader()
 *   Helper function to fetch json data from a given URL. Returns the data.
 */
async function fetchJsonFromURLNoHeader(url) {
  const response = await fetch(url, {});

  const json = await response.json();
  return json;
}

/*  getCountryForArtistMB()
 *   Input: name of the artist to search
 *   Searches musicBrainz for artist of given name to find the country.
 *   Returns the ISO 3166-1 code.
 */
export async function getCountryForArtistMB(name) {
  //music brainz
  var MBData = [];
  const url = _artistByNameSearchURL + name;

  try {
    MBData = await fetchJsonFromURL(url);
  } catch (e) {
    console.log(e);
  }

  if (MBData.artists && MBData.artists.length > 0) {
    return MBData.artists[0].country;
  } else {
    return null;
  }
}

/*  getCountryForArtistADB()
 *   Input: name of the artist to search
 *   Searches audioDB for artist of given name to find the country.
 *   Returns the ISO 3166-1 code.
 */
export async function getCountryForArtistADB(name) {
  //audioDB
  var ADBData = [];
  const url = _artistByNameSearchURL_AudioDB + name;

  ADBData = await fetchJsonFromURLNoHeader(url);

  if (ADBData.artists) {
    return ADBData.artists[0].strCountryCode;
  } else {
    return null;
  }
}

/*  getCountryCountForListOfArtists()
 *   Input: Array of names of the artists to search
 *   Searches musicBrainz for artist of given name to find the country.
 *   Returns list of countries with count.
 */
export async function getCountryCountForListOfArtists(
  artists,
  setCountries,
  setMapData,
  setIsLoading
) {
  const sleepms = 1000;
  setIsLoading(true);

  var countries = await getListOfCountries();
  var basicCountries = getBasicListOfCountries();

  //get country code for each artist
  for (const [, artist] of artists) {
    //var countryCode = await getCountryForArtistMB(artist)

    var countryCode = "";
    var success = false;

    // change occurences of reserved characters in name e.g. "&" to "%26" so it's suitable for queries
    var encodedName = encodeURIComponent(artist.name);

    //Try ADB database first because it doesn't have limits
    try {
      countryCode = await getCountryForArtistADB(encodedName);

      if (countryCode) {
        success = true;
      }
    } catch (e) {
      console.log(e);
    }

    //If that search was unsuccessful, try musicBrainz
    if (!success) {
      try {
        countryCode = await getCountryForArtistMB(encodedName);
        await sleep(sleepms); //stop mb throttling

        if (countryCode) {
          success = true;
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (countryCode == "UK") {
      countryCode = "GB";
    }

    if (success) {
      //increment count for the country
      try {
        countries.get(countryCode).count = countries.get(countryCode).count + 1;
        countries.get(countryCode).artists.push(artist);

        basicCountries[countryCode] = "yes";

        //Live update the shared variable
        setCountries(countries);

        //issue: this format is so useless to me.

        setMapData(basicCountries);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("unable to find " + artist.name);
    }
  }

  setIsLoading(false);

  return countries;
}

/*  getListOfArtists()
 *   Input: spotify API wrapper
 */
export async function getListOfArtistsByCountry(limit, offset, code, genres) {
  const start = "http://musicbrainz.org/ws/2/artist/?query=country:";
  const limitString = "&limit=";
  const offsetString = "&offset=";
  var genreString = "";

  //Specify search by genre, using lucene query syntax
  if (genres != null && genres.size > 0) {
    genreString = "AND (";

    for (var i = 0; i < genres.length; i++) {
      genreString = genreString + "tag:" + genres[i];
      if (i < genres.length - 1) {
        genreString = genreString + " OR ";
      }
    }
    genreString = genreString + ")";
  }

  var url =
    start + code + genreString + limitString + limit + offsetString + offset;

  //wait for response from musicbrainz

  var MBData = await fetchJsonFromURL(url);

  return MBData;
}

export async function getSpotifySongsAndArtistsByCountryCodes(
  spotify,
  codes,
  genres,
  setCurrentCountry,
  maxArtistsFromEachCountry,
  maxSongs
) {
  if (!maxArtistsFromEachCountry) {
    //default max artists is 3
    maxArtistsFromEachCountry = 1;
  }

  if (!maxSongs) {
    maxSongs = 30;
  }

  var progressCount = 0;
  const limit = 50;
  var sleepms = 1000;
  var songURIs = [];
  var artistURIs = [];

  for (const code of codes) {
    //for each country
    setCurrentCountry("Getting songs for " + code);
    var countryCount = 0;

    //get MB Data
    var country = await getListOfArtistsByCountry(limit, 0, code, genres);

    for (const artist of country.artists) {
      //for each artist from that country
      //console.log("checking " + artist.name)

      var data = await spotify.searchTracks("artist:" + artist.name).then(
        function (data) {
          console.log(code + ": " + artist.name);
          return data;
        },
        function (err) {
          console.error(err);
          return null;
        }
      );

      //go through data and add to list
      if (typeof data.tracks.items[0] != "undefined") {
        //check not a null result
        songURIs.push(data.tracks.items[0].uri); //add song to output
        artistURIs.push(data.tracks.items[0].artists[0].uri); //add artist to output list
        countryCount++;
      } else {
        console.log("couldn't find " + artist.name);
      }

      //stop checking after we have enough artists
      if (countryCount >= maxArtistsFromEachCountry) {
        break;
      }
    }

    await sleep(sleepms); //stops throttling from musicBrainz
    //console.log("got results for " + code)

    progressCount = progressCount + 1;

    if (songURIs.length >= maxSongs) {
      break;
    }
  }

  setCurrentCountry("Playlist made! Play it from spotify");
  return songURIs;
}
