// desktop sidebar.tsx
"use client";
import React from "react";
import Image from "next/image";
import styles from "./desktop-sidebar.module.scss";
import organization from "@/public/SVGs/assets/briefcase.svg";
import dashboard from "@/public/SVGs/navigation_svgs/dashboard.svg";
import caret from "@/public/SVGs/assets/caret.svg";
import logout from "@/public/SVGs/assets/sign-out.svg";
import { usePathname } from "next/navigation";
import { customers, businessSidebarItems, settingsMenu } from "@/libs/utils";
import { useState } from "react";

function DesktopSideBar() {
  const [path, setPath] = useState("Users");

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
      onClick={() => setPath(item.name)}
      key={item.name}
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
      onClick={() => setPath(item.name)}
      key={item.name}
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

  const pathname = usePathname();
  console.log(pathname);
  return (
    <aside className={styles.sideBarContainer}>
      <nav className={styles.sidebar}>
        <section className={styles.sidebarContent}>
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
              <Image src={dashboard} alt="Dashboard" width={20} height={20} />
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
        </section>
      </nav>
    </aside>
  );
}

export default DesktopSideBar;
