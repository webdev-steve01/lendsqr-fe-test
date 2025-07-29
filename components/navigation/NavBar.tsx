"use client";
import React, { useState } from "react";
import SearchBar from "../ui/seacrhbar/SearchBar";
import hamburgerMenu from "@/public/SVGs/assets/hamburger-menu-svgrepo-com.svg";
import bell from "@/public/SVGs/assets/notification.svg";
import caret from "@/public/SVGs/assets/profile-caret.svg";
import logo from "@/public/SVGs/logo/main_logo.svg";
import Image from "next/image";
import profile from "@/public/SVGs/profile/profile-image.png";
import styles from "./nav-bar.module.scss";
import Sidebar from "../ui/sidebar/Sidebar";
import DesktopSideBar from "../ui/sidebar/DesktopSideBar";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <Image
        src={hamburgerMenu}
        onClick={() => setIsOpen(true)}
        width={30}
        height={30}
        alt="Menu"
        className={styles.hamburger}
      />
      <div className={styles.searchBarContainer}>
        <Image
          src={logo}
          width={170}
          alt="logo"
          height={30}
          className={styles.desktop}
        />
        <SearchBar />
      </div>
      <div className={`${styles.navbarRight} `}>
        <p className={`${styles.tablet} ${styles.docs}`}>Docs</p>
        <Image
          className={styles.desktop}
          src={bell}
          alt="notifications"
          width={30}
          height={30}
        />
        <div className={styles.profileContainer}>
          <Image
            src={profile}
            width={50}
            height={50}
            className={styles.profile}
            alt="Profile"
          />
          <p className={styles.tablet}>
            <span>Adedeji</span>
            <Image src={caret} alt="Profile" width={10} height={10} />
          </p>
        </div>
      </div>
      <Sidebar show={setIsOpen} isShown={isOpen} />
      {/* <DesktopSideBar /> */}
    </nav>
  );
}

export default NavBar;
