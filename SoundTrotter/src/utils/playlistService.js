import { getSpotifySongsAndArtistsByCountryCodes } from "./searchWithAPI";

const processCountryData = (countries) => {
  const emptyCountries = [];
  countries.forEach((value, key) => {
    if (value.count === 0) {
      emptyCountries.push(key);
    }
  });

  // Randomise country codes to vary
  const randomisedCountryCodes = emptyCountries.sort(() => Math.random() - 0.5);

  return randomisedCountryCodes;
};

const makePlaylistIfDoesntExist = async (spotify) => {
  // Check if playlist exists
  const playlistName = "Maroon Monkeys World Listening";
  const playListDescription =
    "A playlist designed to let you listen to the world";

  const userId = await spotify.getMe().then((data) => data.id);
  const playlists = await spotify.getUserPlaylists(userId);

  let playlist;
  playlists.items.forEach((p) => {
    if (p.name === playlistName) {
      playlist = p;
    }
  });

  // Make playlist if it doesn't exist
  if (!playlist) {
    await spotify
      .createPlaylist(userId, {
        name: playlistName,
        description: playListDescription,
        public: false,
      })
      .then((newPlaylist) => {
        playlist = newPlaylist;
      });
  }

  return playlist;
};

export async function createPlaylistAndPlay(spotify, countries, updateCountry) {
  const emptyCountries = processCountryData(countries);
  const maxArtistsPerCountry = 1;
  const maxSongsToGet = 50;
  const songsFromCountries = await getSpotifySongsAndArtistsByCountryCodes(
    spotify,
    emptyCountries,
    [],
    updateCountry,
    maxArtistsPerCountry,
    maxSongsToGet
  );

  if (songsFromCountries && songsFromCountries.length > 0) {
    const playlist = await makePlaylistIfDoesntExist(spotify);

    // Replace playlist songs with new recommendations
    spotify.replaceTracksInPlaylist(playlist.id, songsFromCountries);

    // Play the new playlist
    spotify.play({ context_uri: playlist.uri });
  }
}
