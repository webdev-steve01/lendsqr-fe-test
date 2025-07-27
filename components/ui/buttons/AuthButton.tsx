import React from "react";
import style from "./auth-button.module.scss";

type AuthButtonProps = {
  text: string;
};

function AuthButton({ text }: AuthButtonProps) {
  return (
    <button type="submit" className={style.authButton}>
      {text}
    </button>
  );
}

export default AuthButton;
