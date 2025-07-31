// sidebar.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/SVGs/logo/main_logo.svg";
import cancel from "@/public/SVGs/assets/close.svg";
import Image from "next/image";
import styles from "./sidebar.module.scss";
import organization from "@/public/SVGs/assets/briefcase.svg";
import dashboard from "@/public/SVGs/navigation_svgs/dashboard.svg";
import caret from "@/public/SVGs/assets/caret.svg";
import logout from "@/public/SVGs/assets/sign-out.svg";
import { usePathname } from "next/navigation";
import { customers, businessSidebarItems, settingsMenu } from "@/libs/utils";

type SidebarProps = {
  isShown: boolean;
  show: (bool: boolean) => void;
};

function Sidebar({ isShown, show }: SidebarProps) {
  const [path, setPath] = useState("Users");
  const pathname = usePathname();

  const customersList = customers.map((customer) => (
    <div
      className={`${styles.navItem} ${
        path === customer.name ? styles.activeNav : styles.inactive
      }`}
      key={customer.name}
      onClick={() => setPath(customer.name)}
    >
      <Image
        src={
          path === customer.name
            ? `/SVGs/assets/${customer.img}`
            : `/SVGs/navigation_svgs/${customer.img}`
        }
        alt={customer.name}
        width={20}
        height={20}
      />
      <p>{customer.name}</p>
    </div>
  ));
  const businessList = businessSidebarItems.map((item) => (
    <div
      className={`${styles.navItem} ${
        path === item.name ? styles.activeNav : styles.inactive
      }`}
      key={item.name}
      onClick={() => setPath(item.name)}
    >
      <Image
        src={
          path === item.name
            ? `/SVGs/assets/${item.img}`
            : `/SVGs/navigation_svgs/${item.img}`
        }
        alt={item.name}
        width={20}
        height={20}
      />
      <p>{item.name}</p>
    </div>
  ));
  const settingsList = settingsMenu.map((item) => (
    <div
      className={`${styles.navItem} ${
        path === item.name ? styles.activeNav : styles.inactive
      }`}
      key={item.name}
      onClick={() => setPath(item.name)}
    >
      <Image
        src={
          path === item.name
            ? `/SVGs/assets/${item.img}`
            : `/SVGs/navigation_svgs/${item.img}`
        }
        alt={item.name}
        width={20}
        height={20}
      />
      <p>{item.name}</p>
    </div>
  ));
  return (
    <AnimatePresence>
      {isShown && (
        <motion.aside
          className={styles.sideBarContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.nav
            className={styles.sidebar}
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.logoContainer}>
              <Image src={logo} alt="Logo" width={120} height={40} />
              <Image
                src={cancel}
                width={30}
                height={30}
                onClick={() => show(false)}
                alt="close sidebar button"
              />
            </div>
            <div className={styles.sidebarContent}>
              <div className={styles.mainNav}>
                <div className={`${styles.navItem} ${styles.active}`}>
                  <Image
                    src={organization}
                    alt="Organization"
                    width={20}
                    height={20}
                  />
                  <p>Switch Organization</p>
                  <Image src={caret} alt="Expand" width={12} height={12} />
                </div>
                <div className={`${styles.navItem} ${styles.inactive}`}>
                  <Image
                    src={dashboard}
                    alt="Dashboard"
                    width={20}
                    height={20}
                  />
                  <p>Dashboard</p>
                </div>
              </div>
              <div className={styles.sidebarClass}>
                <h1 className={styles.sidebarClassHeader}>CUSTOMERS</h1>
                {customersList}
              </div>
              <div className={styles.sidebarClass}>
                <h1 className={styles.sidebarClassHeader}>BUSINESSES</h1>
                {businessList}
              </div>
              <div className={styles.sidebarClass}>
                <h1 className={styles.sidebarClassHeader}>SETTINGS</h1>
                {settingsList}
              </div>
              {pathname.includes("/users") && (
                <div className={styles.signoutFunctions}>
                  <div className={styles.signout}>
                    <Image src={logout} alt="Logout" width={20} height={20} />
                    <p>Logout</p>
                  </div>
                  <p className={styles.version}>v1.2.0</p>
                </div>
              )}
            </div>
          </motion.nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
