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
    // 🔎 Decide the input type in a clear way
    const getInputType = () => {
      if (type === "password") {
        return showPassword ? "text" : "password";
      }
      return type; // "email" or "text"
    };

    // 🔎 Decide placeholder text
    const getPlaceholder = () => {
      switch (type) {
        case "password":
          return "Password";
        case "email":
          return "Email";
        default:
          return "Full Name";
      }
    };

    return (
      <div className={style.inputField}>
        <input
          type={getInputType()}
          placeholder={getPlaceholder()}
          name={type}
          ref={ref}
          className={`${style.input} 
            ${type === "email" && emailError ? style.error : ""} 
            ${type === "password" && passwordError ? style.error : ""}`}
          {...rest}
        />

        {type === "password" && (
          <button
            className={style.togglePasswordButton}
            type="button"
            onClick={toggleShowPassword}
          >
            <p>{showPassword ? "Hide" : "Show"}</p>
          </button>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;
