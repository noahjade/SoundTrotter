import React from "react";
import style from "./style.module.scss";

function TrackInfo({ trackItem }) {
  return (
    <>
      <div className={style.image}>
        <img
          src={trackItem?.album?.images[0]?.url}
          alt={trackItem?.album?.name}
        />
      </div>
      <div className={style.info}>
        <span className={style.info__title}>{trackItem?.name}</span>
        <span className={style.info__artists}>
          {trackItem?.artists?.map((a) => a.name).join(", ")}
        </span>
      </div>
    </>
  );
}

export default TrackInfo;
