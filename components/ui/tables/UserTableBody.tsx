"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./table-action-menu.module.scss";
import view from "@/public/SVGs/assets/view.svg";
import blacklist from "@/public/SVGs/assets/blacklist.svg";
import activate from "@/public/SVGs/assets/activate.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface User {
  user_id: string;
  fullname: string;
  organization: string;
  email: string;
  status: 0 | 1 | 2 | 3;
  date_joined: string;
  phone: number;
}

interface Props {
  users: User[];
}

function UserTableBody({ users }: Props) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tbody role="rowGroup">
      {users.map((user) => (
        <tr role="row" key={user.user_id}>
          <td
            className="table-cell more-options more-options-mobile"
            style={{ position: "relative" }}
            role="cell"
          >
            <div
              className={styles.menuWrapper}
              style={{ position: "relative" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setOpenMenuId(
                    openMenuId === user.user_id ? null : user.user_id
                  )
                }
              >
                ⋮
              </span>

              <AnimatePresence>
                {openMenuId === user.user_id && (
                  <motion.div
                    // className={style.userCardModal}
                    // ref={modalRef}
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={styles.menu}
                    ref={menuRef}
                    style={{
                      position: "absolute",
                      zIndex: 10,
                      background: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      padding: "8px",
                      borderRadius: "6px",
                    }}
                  >
                    <div
                      className={styles.menuItem}
                      onClick={() =>
                        router.push(`.${pathname}/users/${user.user_id}`)
                      }
                    >
                      <Image src={view} alt="view" width={20} height={20} />{" "}
                      <span>View Details</span>
                    </div>
                    <div className={styles.menuItem}>
                      <Image
                        src={blacklist}
                        alt="view"
                        width={20}
                        height={20}
                      />{" "}
                      <span>Blacklist User</span>
                    </div>
                    <div className={styles.menuItem}>
                      <Image src={activate} alt="view" width={20} height={20} />{" "}
                      <span>Activate User</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </td>
          <td role="cell" className="table-cell" data-cell="organization">
            {user.organization}
          </td>
          <td role="cell" className="table-cell" data-cell="username">
            {user.fullname}
          </td>
          <td role="cell" className="table-cell" data-cell="email">
            {user.email}
          </td>
          <td role="cell" className="table-cell" data-cell="phone">
            0{user.phone}
          </td>
          <td role="cell" className="table-cell" data-cell="date-joined">
            {user.date_joined}
          </td>
          <td role="cell" className="table-cell" data-cell="status">
            <span
              className={`status-badge ${
                user.status === 0
                  ? "pending"
                  : user.status === 1
                  ? "active"
                  : user.status === 2
                  ? "blacklisted"
                  : "inactive"
              }`}
            >
              {user.status === 0
                ? "Pending"
                : user.status === 1
                ? "Active"
                : user.status === 2
                ? "Blacklisted"
                : "inactive"}
            </span>
          </td>

          <td
            role="cell"
            className="table-cell more-options more-options-desktop"
            style={{ position: "relative" }}
          >
            <div
              className={styles.menuWrapper}
              style={{ position: "relative" }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setOpenMenuId(
                    openMenuId === user.user_id ? null : user.user_id
                  )
                }
              >
                ⋮
              </span>

              <AnimatePresence>
                {openMenuId === user.user_id && (
                  <motion.div
                    // className={style.userCardModal}
                    // ref={modalRef}
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={styles.menu}
                    ref={menuRef}
                    style={{
                      position: "absolute",
                      zIndex: 10,
                      background: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      padding: "8px",
                      borderRadius: "6px",
                    }}
                  >
                    <div
                      className={styles.menuItem}
                      onClick={() =>
                        router.push(`.${pathname}/users/${user.user_id}`)
                      }
                    >
                      <Image src={view} alt="view" width={20} height={20} />{" "}
                      <span>View Details</span>
                    </div>
                    <div className={styles.menuItem}>
                      <Image
                        src={blacklist}
                        alt="view"
                        width={20}
                        height={20}
                      />{" "}
                      <span>Blacklist User</span>
                    </div>
                    <div className={styles.menuItem}>
                      <Image src={activate} alt="view" width={20} height={20} />{" "}
                      <span>Activate User</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default UserTableBody;
