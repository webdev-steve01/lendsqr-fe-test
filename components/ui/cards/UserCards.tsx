"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import style from "./user-cards.module.scss";
import options from "@/public/SVGs/assets/more-info.svg";
import view from "@/public/SVGs/assets/view.svg";
import blacklist from "@/public/SVGs/assets/blacklist.svg";
import activate from "@/public/SVGs/assets/activate.svg";

import next from "@/public/SVGs/assets/next-active.svg";
import nextDisabled from "@/public/SVGs/assets/next-disabled.svg";
import prev from "@/public/SVGs/assets/previous-active.svg";
import prevDisabled from "@/public/SVGs/assets/previous-disabled.svg";
import PaginationDropdown from "../dropdowns/PaginationDropdown";

type User = {
  user_id: string;
  fullname: string;
  organization: string;
  email: string;
  status: 0 | 1 | 2 | 3;
  date_joined: string;
  phone: number;
};

type Props = {
  users: User[];
};

function UserCards({ users }: Props) {
  const [page, setPage] = useState(0);
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const ROWS_PER_PAGE = rowsPerPage;

  const totalPages = Math.ceil(users.length / ROWS_PER_PAGE);
  const paginatedUsers = users.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  );

  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (page < 3) {
        pages.push(
          0,
          1,
          2,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1
        );
      } else if (page > totalPages - 4) {
        pages.push(
          0,
          1,
          2,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1
        );
      } else {
        pages.push(0, "...", page - 1, page, page + 1, "...", totalPages - 1);
      }
    }

    return pages;
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModalId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="user-cards">
        {paginatedUsers.map((user) => (
          <div key={user.user_id} className={style.userCard}>
            <Image
              src={options}
              alt="more options"
              width={20}
              height={20}
              className={style.moreOptions}
              onClick={() => setOpenModalId(user.user_id)}
            />

            <p className={style.userCardItem}>
              <span className={style.cardTitle}>ORGANIZATION:</span>{" "}
              <span>{user.organization}</span>
            </p>
            <p className={style.userCardItem}>
              <span className={style.cardTitle}>USERNAME:</span>{" "}
              <span>{user.fullname}</span>
            </p>
            <p className={style.userCardItem}>
              <span className={style.cardTitle}>EMAIL:</span>{" "}
              <span>{user.email.toLowerCase()}</span>
            </p>
            <p className={style.userCardItem}>
              <span className={style.cardTitle}>PHONE NUMBER:</span>{" "}
              <span>+{user.phone}</span>
            </p>
            <p className={style.userCardItem}>
              <span className={style.cardTitle}>DATE JOINED:</span>{" "}
              <span>{user.date_joined}</span>
            </p>
            <p className={style.userCardItem}>
              <span className={style.cardTitle}>STATUS:</span>{" "}
              <span className={style[`status-${user.status}`]}>
                {user.status === 0
                  ? "Inactive"
                  : user.status === 1
                  ? "Active"
                  : user.status === 2
                  ? "Blacklisted"
                  : "Pending"}
              </span>
            </p>

            <AnimatePresence>
              {openModalId === user.user_id && (
                <motion.div
                  className={style.userCardModal}
                  ref={modalRef}
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <div className={style.modalItem}>
                    <Image src={view} alt="view" width={20} height={20} />
                    <p>View Details</p>
                  </div>
                  <div className={style.modalItem}>
                    <Image src={blacklist} alt="view" width={20} height={20} />
                    <p>Blacklist User</p>
                  </div>
                  <div className={style.modalItem}>
                    <Image src={activate} alt="view" width={20} height={20} />
                    <p>Activate User</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="pagination mobile-pagination">
        <PaginationDropdown
          rowsPerPage={rowsPerPage}
          totalCount={users.length}
          onChange={(val) => {
            setPage(0); // optional: reset to first page
            setRowsPerPage(val);
          }}
        />
        <div className="paginationButtons">
          <button
            disabled={page === 0}
            className="pagination-button"
            onClick={() => setPage(page - 1)}
          >
            <Image
              src={page === 0 ? prevDisabled : prev}
              alt="Previous"
              width={14}
              height={14}
            />
            {}
          </button>
          {generatePageNumbers().map((p, i) => (
            <button
              key={i}
              disabled={p === "..."}
              className={p === page ? "active" : ""}
              onClick={() => typeof p === "number" && setPage(p)}
            >
              {p === "..." ? "..." : p + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages - 1}
            className="pagination-button"
            onClick={() => setPage(page + 1)}
          >
            <Image
              src={page === totalPages - 1 ? nextDisabled : next}
              alt="Next"
              width={14}
              height={14}
            />
            {}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserCards;
