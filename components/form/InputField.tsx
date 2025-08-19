import React, { forwardRef } from "react";
import style from "./input-field.module.scss";

type PasswordInputFieldProps = {
  showPassword: boolean;
  type: "text" | "password" | "email";
  toggleShowPassword: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = forwardRef<HTMLInputElement, PasswordInputFieldProps>(
  ({ showPassword, type, toggleShowPassword, ...rest }, ref) => {
    // Decide the input type
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
          className={`${style.input} `}
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
