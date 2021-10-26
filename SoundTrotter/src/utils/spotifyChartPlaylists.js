import * as JSONcountries from "../initialisation/countries.json"; //from https://datahub.io/core/country-list#data-cli

export async function getTopSongsPlaylistForCountry(
  spotify,
  countryCode,
  setTopSongs,
  setSelectedCountry
) {
  let songs = [];
  let countries = new Map();
  JSONcountries.default.forEach((country) => {
    countries.set(country.Code, country.Name);
  });
  countries.set("AE", "UAE");

  await spotify.searchPlaylists("Top 50 - " + countries.get(countryCode)).then(
    async function (data) {
      if (data.playlists.items.length == 0) {
        console.log("cant find playlist for " + countries.get(countryCode));
      } else {
        let playlist = {};
        for (var i = 0; i < data.playlists.items.length; i++) {
          if (data.playlists.items[i].owner.display_name == "spotifycharts") {
            playlist = data.playlists.items[i];
            break;
          }
        }
        if (Object.keys(playlist).length > 0) {
          await spotify.getPlaylistTracks(playlist.id).then(
            function (tracks) {
              var i = 0;
              while (i < 10 && i < tracks.items.length) {
                songs.push(tracks.items[i]);
                i++;
              }
            },
            function (err) {
              console.log(err);
            }
          );
        }
      }
    },
    function (err) {
      console.log(err);
    }
  );
  setTopSongs(songs);
}
