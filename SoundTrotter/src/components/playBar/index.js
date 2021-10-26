import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import IconButton from "../iconButton";
import TrackInfo from "../trackInfo";

function PlayBar({ spotify, countries }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);

  const playPause = () => {
    setDisableBtn(true);

    if (isPlaying) {
      spotify.pause().then(() => setDisableBtn(false));
    } else {
      spotify.play().then(() => setDisableBtn(false));
    }
  };

  const skipNext = () => {
    setDisableBtn(true);

    spotify.skipToNext().then(() => setDisableBtn(false));
  };

  const skipPrevious = () => {
    setDisableBtn(true);

    spotify.skipToPrevious().then(() => setDisableBtn(false));
  };

  const update = () => {
    try {
      spotify.getMyCurrentPlaybackState().then((track) => {
        if (track) {
          setIsPlaying(track.is_playing);
          setTrack(track.item);
        } else {
          setIsPlaying(false);
          setTrack(null);
        }
      });
    } catch (err) {
      setIsPlaying(false);
      setTrack(null);
    }
  };

  useEffect(() => {
    update();
    const interval = setInterval(update, 500);

    return () => clearInterval(interval);
  }, [countries, spotify]);

  return (
    <section className={track ? style.container : style.hidden}>
      <div className={style.track}>
        <TrackInfo trackItem={track} />
        <div className={style.track__controls}>
          <IconButton
            aria-label="rewind"
            clickHandler={skipPrevious}
            type="previous"
          />
          <IconButton
            aria-label={isPlaying ? "pause" : "play"}
            clickHandler={playPause}
            type={isPlaying ? "pause" : "play"}
            isDisabled={disableBtn}
          />
          <IconButton aria-label="next" clickHandler={skipNext} type="next" />
        </div>
      </div>
    </section>
  );
}

export default PlayBar;
