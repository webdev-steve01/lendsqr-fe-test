import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import view from "@/public/SVGs/assets/view.svg";
import blacklist from "@/public/SVGs/assets/blacklist.svg";
import activate from "@/public/SVGs/assets/activate.svg";
import style from "./user-cards.module.scss";

type props = {
  user: User;
  openModalId: string | null;
  setOpenModalId: (id: string | null) => void;
  modalRef: React.RefObject<HTMLDivElement>;
};
function OptionsModal({ user, openModalId, setOpenModalId, modalRef }: props) {
  return (
    <div>
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
  );
}

export default OptionsModal;
