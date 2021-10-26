import style from "./style.module.scss";

function ArtistsListenedTo({ selectedCountry }) {
  const formatArtists = () => {
    let artists = [];
    selectedCountry.artists.forEach((artist) => {
      artists.push(artist);
    });

    return artists.length == 0 ? (
      selectedCountry.name == "NOT READY" ? (
        <div className={style.message}>Data not available yet...</div>
      ) : selectedCountry.name == "NONE" ? (
        <div className={style.message}>Select a country</div>
      ) : (
        <div className={style.message}>
          You've listened to no artists from {selectedCountry.name}
        </div>
      )
    ) : (
      artists.map((artist, index) => (
        <div className={style.artist} key={index}>
          <img
            className={style.image}
            src={artist.images[0] !== undefined && artist.images[0].url}
          />
          <div className={style.name}>{artist.name}</div>
        </div>
      ))
    );
  };

  return (
    <div className={style.container}>
      <div>
        {selectedCountry.name == "NOT READY" || selectedCountry.name == "NONE" ? (
          <div className={[style.title, style.section].join(" ")}>
            Artists you've listened to from...
          </div>
        ) : (
          <div className={[style.title, style.section].join(" ")}>
            Artists you've listened to from {selectedCountry.name}
          </div>
        )}
      </div>
      <div className={style.artists}>{formatArtists()}</div>
    </div>
  );
}

export default ArtistsListenedTo;
