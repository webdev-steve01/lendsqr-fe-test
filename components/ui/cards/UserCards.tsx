"use client";
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import style from "./user-cards.module.scss";
import options from "@/public/SVGs/assets/more-info.svg";
import view from "@/public/SVGs/assets/view.svg";
import blacklist from "@/public/SVGs/assets/blacklist.svg";
import activate from "@/public/SVGs/assets/activate.svg";
import Image from "next/image";

type userCardProps = {
  fullname: string;
  organization: string;
  email: string;
  status: 0 | 1 | 2 | 3; // Assuming status can be 0 (inactive), 1 (active), or 2 (blacklisted) or 3 (pending)
  date_joined: string;
  phone: number;
  modalIsOpen?: boolean;
  setModalIsOpen?: (value: boolean) => void;
};

function UserCards({
  fullname,
  organization,
  email,
  status,
  date_joined,
  phone,
  modalIsOpen,
  setModalIsOpen = () => {},
}: userCardProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalIsOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalIsOpen]);
  return (
    <div className={style.userCard}>
      <Image
        src={options}
        alt="more options"
        width={20}
        height={20}
        className={style.moreOptions}
        onClick={() => setModalIsOpen(true)}
      />

      <p className={style.userCardItem}>
        <span className={style.cardTitle}>ORGANIZATION:</span>{" "}
        <span>{organization}</span>
      </p>
      <p className={style.userCardItem}>
        <span className={style.cardTitle}>USERNAME:</span>{" "}
        <span>{fullname}</span>
      </p>
      <p className={style.userCardItem}>
        <span className={style.cardTitle}>EMAIL:</span> <span>{email}</span>
      </p>
      <p className={style.userCardItem}>
        <span className={style.cardTitle}>PHONE NUMBER:</span>{" "}
        <span>+{phone}</span>
      </p>
      <p className={style.userCardItem}>
        <span className={style.cardTitle}>DATE JOINED:</span>{" "}
        <span>{date_joined}</span>
      </p>
      <p className={style.userCardItem}>
        <span className={style.cardTitle}>STATUS:</span>{" "}
        <span className={style[`status-${status}`]}>
          {status === 0
            ? "Inactive"
            : status === 1
            ? "Active"
            : status === 2
            ? "Blacklisted"
            : "Pending"}
        </span>
      </p>

      <AnimatePresence>
        {modalIsOpen && (
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
  );
}

export default UserCards;
