"use client";
import LogInForm from "@/components/auth/LogInForm";
import logo from "@/public/SVGs/logo/main_logo.svg";
import authIllustration from "@/public/SVGs/signup_svgs/pablo-sign-in.svg";
import Image from "next/image";

function AuthenticateUser() {
  return (
    <main className="auth">
      <section className="auth-image-section" aria-hidden="true">
        <div className="auth-image-children">
          <div className="logo">
            <Image
              src={logo}
              width={173}
              height={30}
              alt="Lendsqr company logo"
              loading="lazy"
              className="logo-image"
            />
          </div>
          <div className="image">
            <Image
              src={authIllustration}
              alt="Login illustration showing a user interacting with technology"
              loading="lazy"
              className="auth-image"
              width={650}
              height={500}
            />
          </div>
        </div>
      </section>

      <section
        className="auth-container"
        role="region"
        aria-labelledby="auth-title"
      >
        <article className="auth-header-container">
          <div className="form-logo">
            <Image
              src={logo}
              width={153}
              height={30}
              alt="Lendsqr company logo"
              loading="lazy"
              className="logo-image"
            />
          </div>
          <header>
            <h1 id="auth-title" className="auth-header">
              Welcome
            </h1>
            <p className="auth-subtext">Enter your details to log in</p>
          </header>
        </article>
        <LogInForm />
      </section>
    </main>
  );
}

export default AuthenticateUser;
