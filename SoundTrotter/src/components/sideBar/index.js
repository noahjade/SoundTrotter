import React, { useEffect } from "react";
import style from "./style.module.scss";

import SideBarContent from "../sideBarContent";

// TAB ICON IMAGES
import flagIcon from "../../assets/tabicons/flag.png";
import heartIcon from "../../assets/tabicons/heart.png";
import userIcon from "../../assets/tabicons/user.png";
import headphonesIcon from "../../assets/tabicons/headphones.png";

function SideBar({
  spotify,
  selectedCountry,
  countries,
  topSongs,
  finalCount,
}) {
  const [tabNumber, setTabNumber] = React.useState(0);
  const [title, setTitle] = React.useState("");

  function exitMain() {
    setHideMain(1);
    setTabNumber(0);
  }

  function switchTab(newTab) {
    switch (newTab) {
      case 1:
        setTitle("User Stats");
        break;
      case 2:
        setTitle("Country Artists");
        break;
      case 3:
        setTitle("Country Charts");
        break;
      case 4:
        setTitle("Credits");
        break;
      default:
        setTitle("");
    }

    setTabNumber(newTab);
    setHideMain(0);
  }

  const [hideMain, setHideMain] = React.useState(1);

  useEffect(() => {}, [spotify, countries]);

  return (
    <div className={style.MainWrapper}>
      {hideMain !== 1 && (
        <div className={style.MainContent} hidemain={hideMain}>
          <div className={style.rightAlignRow}>
            <div className={style.title}>{title}</div>
            <div
              className={style.ExitButton}
              onClick={exitMain}
              hidemain={hideMain}
            ></div>
          </div>
          <div className={style.ContentArea}>
            <SideBarContent
              spotify={spotify}
              selectedCountry={selectedCountry}
              tabNumber={tabNumber}
              topSongs={topSongs}
              countries={countries}
              finalCount={finalCount}
            />
          </div>
        </div>
      )}

      <div className={style.TabWrapper} hidemain={hideMain}>
        <div
          className={[style.Tab, style.tabOne].join(" ")}
          onClick={() => switchTab(1)}
          tabNumber={tabNumber}
        >
          <img src={userIcon} alt="User Stats" />
        </div>
        <div
          className={[style.Tab, style.tabTwo].join(" ")}
          onClick={() => switchTab(2)}
          tabNumber={tabNumber}
        >
          <img src={flagIcon} alt="Country Artists" />
        </div>
        <div
          className={[style.Tab, style.tabThree].join(" ")}
          onClick={() => switchTab(3)}
          tabNumber={tabNumber}
        >
          <img src={headphonesIcon} alt="Country Charts" />
        </div>
        <div
          className={[style.Tab, style.tabFour].join(" ")}
          onClick={() => switchTab(4)}
          tabNumber={tabNumber}
        >
          <img src={heartIcon} alt="Credits" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
