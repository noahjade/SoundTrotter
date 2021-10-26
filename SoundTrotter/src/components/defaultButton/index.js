import React from "react";
import style from "./style.module.scss";

function DefaultButton({ text }) {
  return <button className={style.btn}>{text}</button>;
}

export default DefaultButton;
