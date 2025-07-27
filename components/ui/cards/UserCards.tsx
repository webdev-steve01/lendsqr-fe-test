import React from "react";
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
  status: number;
  date_joined: string;
  phone: number;
};

function UserCards({
  fullname,
  organization,
  email,
  status,
  date_joined,
  phone,
}: userCardProps) {
  return (
    <div className={style.userCard}>
      <Image
        src={options}
        alt="more options"
        width={20}
        height={20}
        className={style.moreOptions}
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
        <span className={style[status]}>{status}</span>
      </p>

      <div className={style.userCardModal}>
        <div className={style.modalItem}>
          <Image src={view} alt="view" width={20} height={20} />
          <p>View Details</p>
        </div>
        <div className={style.modalItem}>
          <Image src={view} alt="view" width={20} height={20} />
          <p>View Details</p>
        </div>
        <div className={style.modalItem}>
          <Image src={view} alt="view" width={20} height={20} />
          <p>View Details</p>
        </div>
      </div>
    </div>
  );
}

export default UserCards;
