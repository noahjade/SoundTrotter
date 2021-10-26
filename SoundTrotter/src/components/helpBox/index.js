import React from "react";
import style from "./style.module.scss";
//import spotifylogo from "../../assets/spotify-icon-green.png"
//import helpIcon from "../../assets/helpButton.png"

function HelpBox({ hideBox }) {
  return (
    <div className={style.helpBox}>
      <div className={style.rightAlignRow}>
        <div className={style.ExitButton} onClick={hideBox}></div>
      </div>
      <div className={style.titleArea}>Welcome to Sound Trotter!</div>
      <div className={style.contentArea}>
        <p>
          This application allows you to analyse your recent spotify listening
          to find out which countries the songs you have been listening to are
          from. Simply wait for the data to load in, and the interactive map
          will light up green for every country you have covered.
        </p>

        <p>
          The tabs on the right side of the screen allow you to analyse further.
          Click on them to explore! Select on the map to view specific
          information about specific countries.
        </p>
      </div>
    </div>
  );
}

export default HelpBox;
