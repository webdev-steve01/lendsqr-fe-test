// sidebar.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/SVGs/logo/main_logo.svg";
import cancel from "@/public/SVGs/assets/close.svg";
import Image from "next/image";
import styles from "./sidebar.module.scss";
import organization from "@/public/SVGs/assets/briefcase.svg";
import dashboard from "@/public/SVGs/assets/dashboard.svg";
import caret from "@/public/SVGs/assets/caret.svg";

type SidebarProps = {
  isShown: boolean;
  show: (bool: boolean) => void;
};

const customers = [
  { name: "Users", img: "users-icon.svg" },
  { name: "Guarantors", img: "guarantors-icon.svg" },
  { name: "Loans", img: "loans-icon.svg" },
  { name: "Decision Models", img: "decision-models-icon.svg" },
  { name: "Savings", img: "savings-icon.svg" },
  { name: "Loan Requests", img: "loan-requests-icon.svg" },
  { name: "Whitelist", img: "whitelist-icon.svg" },
  { name: "Karma", img: "karma-icon.svg" },
];

const businessSidebarItems = [
  { name: "Organization", img: "organization-icon.svg" },
  { name: "Loan Products", img: "loan-products-icon.svg" },
  { name: "Savings Products", img: "savings-products-icon.svg" },
  { name: "Fees and Charges", img: "fees-charges-icon.svg" },
  { name: "Transactions", img: "transactions-icon.svg" },
  { name: "Services", img: "services-icon.svg" },
  { name: "Service Account", img: "service-account-icon.svg" },
  { name: "Settlements", img: "settlements-icon.svg" },
  { name: "Reports", img: "reports-icon.svg" },
];

const settingsMenu = [
  { name: "Preferences", img: "preferences.svg" },
  { name: "Fees and Pricing", img: "fees-and-pricing.svg" },
  { name: "Audit Logs", img: "audit-logs.svg" },
];

const customersList = customers.map((customer) => (
  <div className={styles.navItem} key={customer.name}>
    <Image
      src={`/SVGs/assets/${customer.img}`}
      alt={customer.name}
      width={20}
      height={20}
    />
    <p>{customer.name}</p>
  </div>
));
const businessList = businessSidebarItems.map((item) => (
  <div className={styles.navItem} key={item.name}>
    <Image
      src={`/SVGs/assets/${item.img}`}
      alt={item.name}
      width={20}
      height={20}
    />
    <p>{item.name}</p>
  </div>
));
const settingsList = settingsMenu.map((item) => (
  <div className={styles.navItem} key={item.name}>
    <Image
      src={`/SVGs/assets/${item.img}`}
      alt={item.name}
      width={20}
      height={20}
    />
    <p>{item.name}</p>
  </div>
));

function Sidebar({ isShown, show }: SidebarProps) {
  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          className={styles.sideBarContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
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
                <h1 className={styles.sidebarClassHeader}>BUSINESSES</h1>
                {settingsList}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
