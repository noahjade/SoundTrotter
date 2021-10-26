import React from "react";
import style from "./style.module.scss";
import spotifylogo from "../../assets/spotify-icon-green.png";
import helpIcon from "../../assets/helpButton.png";

function TopBar({ user, showhelpFunction }) {
  return (
    <div className={style.topBar}>
      <div className={style.topBarLeft}>
        <img src={spotifylogo} alt="Logo" />
        <h3 className={style.spaceItem}>SOUND TROTTER</h3>
      </div>
      <div className={style.topBarRight}>
        <h3 className={style.spaceItem}>Welcome, {user}</h3>
        <img
          className={style.spaceItem}
          src={helpIcon}
          onClick={showhelpFunction}
          alt="help"
        />
      </div>
    </div>
  );
}

export default TopBar;
