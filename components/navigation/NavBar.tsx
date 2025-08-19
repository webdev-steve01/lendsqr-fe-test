"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../ui/searchbar/SearchBar";
import hamburgerMenu from "@/public/SVGs/assets/hamburger-menu-svgrepo-com.svg";
import bell from "@/public/SVGs/assets/notification.svg";
import caret from "@/public/SVGs/assets/profile-caret.svg";
import logo from "@/public/SVGs/logo/main_logo.svg";
import Image from "next/image";
import profile from "@/public/SVGs/profile/profile-image.png";
import styles from "./nav-bar.module.scss";
import Sidebar from "./sidebar/Sidebar";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click for mobile view
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownVisible(false);
      }
    }

    if (isProfileDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownVisible]);

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
            width={40}
            height={40}
            className={styles.profile}
            alt="Profile"
            onClick={() => {
              setIsProfileDropdownVisible(!isProfileDropdownVisible);
            }}
          />
          <p className={styles.tablet}>
            <span>Adedeji</span>
            <Image src={caret} alt="Profile" width={10} height={10} />
          </p>

          <AnimatePresence>
            {isProfileDropdownVisible && (
              <motion.div
                ref={dropdownRef}
                className={styles.dropdown}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <p className={styles.docs}>Docs</p>
                <p>Notifications</p>
                <p>
                  <span>Adedeji</span>
                  <Image src={caret} alt="Profile" width={10} height={10} />
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Sidebar show={setIsOpen} isShown={isOpen} />
      {/* <DesktopSideBar /> */}
    </nav>
  );
}

export default NavBar;
