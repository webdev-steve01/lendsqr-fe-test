import React, { forwardRef } from "react";
import style from "./input-field.module.scss";

type PasswordInputFieldProps = {
  showPassword: boolean;
  type: "text" | "password" | "email";
  errorMessage?: string;
  emailError?: boolean;
  passwordError?: boolean;
  toggleShowPassword: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, PasswordInputFieldProps>(
  (
    {
      showPassword,
      type,
      toggleShowPassword,
      emailError = false,
      passwordError = false,
      ...rest
    },
    ref
  ) => {
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
          ref={ref}
          className={`${style.input} ${
            type === "email" && emailError ? style.error : ""
          } ${type === "password" && passwordError ? style.error : ""}`}
          {...rest}
        />
        {type === "password" && (
          <button
            className={`${style.togglePasswordButton}`}
            type="button"
            onClick={toggleShowPassword}
          >
            <p>{showPassword ? "hide" : "show"}</p>
          </button>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
