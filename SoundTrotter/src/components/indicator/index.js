import React from "react";
import style from "./style.module.scss";

function Indicator({ text }) {
  return (
    <div className={style.MainWrapper}>
      {text !== undefined && <div className={style.TextArea}>{text}</div>}
      <div className={style.Indicator}></div>
    </div>
  );
}

export default Indicator;
