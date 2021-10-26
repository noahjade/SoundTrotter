import React, { useEffect } from "react";
import style from "./style.module.scss";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause.svg";
import { ReactComponent as PrevIcon } from "../../assets/prev.svg";
import { ReactComponent as NextIcon } from "../../assets/next.svg";

function IconButton({ type = "play", clickHandler, isDisabled }) {
  useEffect(() => {}, [isDisabled]);

  return (
    <button
      className={style.btn}
      onClick={clickHandler}
      id={`${type}-btn`}
      disabled={isDisabled}
    >
      {type === "play" && <PlayIcon />}
      {type === "pause" && <PauseIcon />}
      {type === "previous" && <PrevIcon />}
      {type === "next" && <NextIcon />}
    </button>
  );
}

export default IconButton;
