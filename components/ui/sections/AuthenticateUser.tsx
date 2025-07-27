"use client";
import LogInForm from "@/components/auth/LogInForm";
import React, { useState } from "react";
import logo from "@/public/SVGs/logo/main_logo.svg";
import authIllustration from "@/public/SVGs/signup_svgs/pablo-sign-in.svg";
import Image from "next/image";
function AuthenticateUser() {
  return (
    <section className="auth">
      <section className="auth-image-section">
        <div className="auth-image-children">
          <div className="logo">
            <Image
              src={logo}
              width={173}
              height={30}
              alt="Logo"
              loading="lazy"
              className="logo-image"
            />
          </div>
          <div className="image">
            <Image
              src={authIllustration}
              alt="Illustration"
              loading="lazy"
              className="auth-image"
              width={650}
              height={500}
            />
          </div>
        </div>
      </section>
      <div className="auth-container">
        <article className="auth-header-container">
          <div className="form-logo">
            <Image
              src={logo}
              width={153}
              height={30}
              alt="Logo"
              loading="lazy"
              className="logo-image"
            />
          </div>
          <h1 className="auth-header">Welcome</h1>
          <p className="auth-subtext">Enter details to login.</p>
        </article>
        <LogInForm />
      </div>
    </section>
  );
}

export default AuthenticateUser;
