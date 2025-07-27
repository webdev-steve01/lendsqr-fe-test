"use client";
import React, { useState } from "react";
import SearchBar from "../ui/seacrhbar/SearchBar";
import hamburgerMenu from "@/public/SVGs/assets/hamburger-menu-svgrepo-com.svg";
import Image from "next/image";
import profile from "@/public/SVGs/profile/profile-image.png";
import styles from "./nav-bar.module.scss";
import Sidebar from "../ui/sidebar/Sidebar";

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
      />
      <SearchBar />
      <Image
        src={profile}
        width={50}
        height={50}
        className={styles.profile}
        alt="Profile"
      />
      <Sidebar show={setIsOpen} isShown={isOpen} />
    </nav>
  );
}

export default NavBar;
