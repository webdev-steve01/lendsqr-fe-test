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
    <section className={style.cardContainer}>
      <Image
        src={image}
        className={`${style.cardImage}`}
        alt={text}
        width={40}
        height={40}
      />
      <p className={style.cardText}>{text}</p>
      <strong className={style.cardAmount}>{number}</strong>
    </section>
  );
}

export default DashboardCard;
