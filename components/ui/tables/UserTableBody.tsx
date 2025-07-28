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
    <tbody>
      {users.map((user) => (
        <tr key={user.user_id}>
          <td className="table-cell">{user.organization}</td>
          <td className="table-cell">{user.fullname}</td>
          <td className="table-cell">{user.email}</td>
          <td className="table-cell">{user.phone}</td>
          <td className="table-cell">{user.date_joined}</td>
          <td className="table-cell">
            <span className={`status-badge ${user.status}`}>{user.status}</span>
          </td>

          <td
            className="table-cell more-options"
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
