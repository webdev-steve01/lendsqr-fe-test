"use client";
import React from "react";
import style from "./input-field.module.scss";

type PasswordInputFieldProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  showPassword: boolean;
  type: "text" | "password" | "email";
  emailError?: boolean;
  passwordError?: boolean;
  toggleShowPassword: () => void;
};

function InputField({
  onChange,
  value,
  showPassword,
  type,
  toggleShowPassword,
  emailError = false,
  passwordError = false,
}: PasswordInputFieldProps) {
  return (
    <div className={style.inputField}>
      <input
        type={
          type === "password" && !showPassword
            ? "password"
            : type === "email"
            ? "email"
            : "text"
        }
        placeholder={
          type === "password"
            ? "Password"
            : type === "email"
            ? "Email"
            : "Full Name"
        }
        name={type}
        className={`${style.input} ${
          type === "email" && emailError ? style.error : ""
        } ${type === "password" && passwordError ? style.error : ""}`}
        id=""
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <button
          className={`${style.togglePasswordButton} `}
          type="button"
          onClick={toggleShowPassword}
        >
          <p>{showPassword ? "hide" : "show"}</p>
        </button>
      )}
    </div>
  );
}

export default InputField;
