"use client";
import React, { useEffect, useState } from "react";
import InputField from "../form/InputField";
import AuthButton from "../ui/buttons/AuthButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

function LogInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailErrorVisible, setEmailErrorVisible] = useState(false);
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: { email: string; password: string }) => {
    console.log("Submitted data:", data);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (errors.email) {
      setEmailErrorVisible(true);
      const timeout = setTimeout(() => setEmailErrorVisible(false), 4000);
      return () => clearTimeout(timeout);
    } else {
      setEmailErrorVisible(false); // 👈 Add this
    }
  }, [errors.email]);

  useEffect(() => {
    if (errors.password) {
      setPasswordErrorVisible(true);
      const timeout = setTimeout(() => setPasswordErrorVisible(false), 4000);
      return () => clearTimeout(timeout);
    } else {
      setPasswordErrorVisible(false); // 👈 Add this
    }
  }, [errors.password]);

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      {emailErrorVisible && (
        <div className="error-toast">
          <span>{errors.email?.message}</span>
          <button onClick={() => setEmailErrorVisible(false)}>✖</button>
        </div>
      )}

      {passwordErrorVisible && (
        <div className="error-toast">
          <span>{errors.password?.message}</span>
          <button onClick={() => setPasswordErrorVisible(false)}>✖</button>
        </div>
      )}

      <div className="form-inputs">
        <InputField
          type="email"
          {...register("email")}
          emailError={!!errors.email}
          showPassword={false}
          toggleShowPassword={() => {}}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          {...register("password")}
          passwordError={!!errors.password}
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
