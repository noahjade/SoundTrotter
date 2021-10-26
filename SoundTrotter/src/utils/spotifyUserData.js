let artists = new Map();

export async function getArtists(spotify) {
  await getRecentlyPlayedArtists(spotify);
  return artists;
}

// gets the artist objects from the ids (can get 50 at a time)
async function getArtistObjects(spotify, artistsIds) {
  const max = 50;
  let splitArray = [];
  for (let i = 0; i < artistsIds.length; i += max) {
    splitArray.push(artistsIds.slice(i, i + max));
  }
  for (let i = 0; i < splitArray.length; i++) {
    await spotify.getArtists(splitArray[i]).then(
      function (data) {
        data.artists.forEach((artist) => {
          if (!artists.has(artist.id)) {
            artists.set(artist.id, artist);
          }
        });
      },
      function (err) {
        console.error(err);
      }
    );
  }
}

// Gets the artists of the last 50 tracks listened to by the user
async function getRecentlyPlayedArtists(spotify) {
  let artistsIds = [];
  await spotify.getMyRecentlyPlayedTracks({ limit: 50 }).then(
    function (data) {
      data.items.forEach((track) => {
        track.track.artists.forEach((artist) => {
          if (!artists.has(artist.id)) {
            artistsIds.push(artist.id);
          }
        });
      });
    },
    function (err) {
      console.error(err);
    }
  );
  await getArtistObjects(spotify, artistsIds);
}
