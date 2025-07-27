"use client";
import React, { useEffect, useState } from "react";
import InputField from "../form/InputField";
import AuthButton from "../ui/buttons/AuthButton";
import { useRouter } from "next/navigation";

function LogInForm() {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "") {
      setEmailError(true);
      alert("Please enter your email");
      return;
    }
    if (password === "") {
      setPasswordError(true);
      alert("Please enter your password");
      return;
    }

    router.push("/dashboard");
  };

  useEffect(() => {
    console.log(email);
  }, [email]);
  return (
    <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-inputs">
        <InputField
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          emailError={emailError}
          value={email}
          showPassword={false}
          toggleShowPassword={() => {}}
        />
        <InputField
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          passwordError={passwordError}
          value={password}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
        />
      </div>
      <div className="auth-footer-text">
        <p>Forgot password?</p>
      </div>
      <AuthButton text="Log in" />
    </form>
  );
}

export default LogInForm;
