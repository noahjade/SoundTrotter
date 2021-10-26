import React from "react";
import style from "./style.module.scss";
import DefaultButton from "../../components/defaultButton";
import { loginUrl } from "../../utils/spotifyService";

function Login() {
  return (
    <div className={style.login}>
      <a href={loginUrl}>
        <DefaultButton text="Login with spotify" />
      </a>
    </div>
  );
}

export default Login;
