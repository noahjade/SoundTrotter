import style from "./style.module.scss";
import * as JSONcountries from "../../initialisation/countries.json"; //from https://datahub.io/core/country-list#data-cli


function SpotifyCharts({ topSongs, selectedCountry, spotify }) {

    function songOnClick(song) {
        var Options = []
        Options.uris = [song.track.uri]

        console.log("playing: " + song.track.uri)
        spotify.play(Options)
    }

    const getName = () => {
        var name = "";
        if (selectedCountry.name === "NOT READY") {
            JSONcountries.default.forEach((country) => {
                if (country.Code === selectedCountry.code) {
                    name = country.Name;
                    return;
                }
            });
        } else if (selectedCountry.name === "NONE") {
            return "...";
        } else {
            return selectedCountry.name;
        }
        return name;
    };

    return (
        <div className={style.container}>
            <div className={style.title}>Top 10 songs in {getName()}</div>
            {selectedCountry.name == "NONE" ? (
                <div className={style.message}>Select a country</div>
            ) : topSongs.length > 0 ? (
                <div className={style.chart}>
                    {topSongs.map((song, index) => (
                        <div className={style.track} key={index} onClick={() => { songOnClick(song) }}>
                            <img
                                className={style.image}
                                src={
                                    song.track.album.images[0] !== undefined &&
                                    song.track.album.images[0].url
                                }
                            />
                            <div className={style.name}>{song.track.name}</div>
                        </div>
                    ))}
                </div>
            ) : (
                "Unavailable"
            )}
        </div>
    );
}

export default SpotifyCharts;
