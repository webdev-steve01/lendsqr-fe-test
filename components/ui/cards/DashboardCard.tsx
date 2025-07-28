import React from "react";
import Image from "next/image";
import style from "./dashboard-card.module.scss";

type dashboardCardProps = {
  text: string;
  number: string;
  image: string;
};

function DashboardCard({ text, number, image }: dashboardCardProps) {
  return (
    <div className={style.cardContainer}>
      <Image
        src={image}
        className={`${style.cardImage}`}
        alt={text}
        width={40}
        height={40}
      />
      <p className={style.cardText}>{text}</p>
      <p className={style.cardAmount}>{number}</p>
    </div>
  );
}

export default DashboardCard;
