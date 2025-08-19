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
    .min(6, "password should be at least 6 characters")
    .required("Password is required"),
});

function LogInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailErrorVisible, setEmailErrorVisible] = useState(false);
  const [passwordErrorVisible, setPasswordErrorVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const onSubmit = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (errors.email) {
      setEmailErrorVisible(true);
      const timeout = setTimeout(() => setEmailErrorVisible(false), 4000);
      return () => clearTimeout(timeout);
    }
  }, [errors.email]);

  useEffect(() => {
    if (errors.password) {
      setPasswordErrorVisible(true);
      const timeout = setTimeout(() => setPasswordErrorVisible(false), 4000);
      return () => clearTimeout(timeout);
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
          showPassword={false}
          toggleShowPassword={() => {}}
        />
        <InputField
          type="password"
          {...register("password")}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
        />
      </div>
      <div className="auth-footer-text">
        <p>Forgot password?</p>
      </div>
      <AuthButton text={loading ? "Logging in..." : "Log In"} />
    </form>
  );
}

export default LogInForm;
