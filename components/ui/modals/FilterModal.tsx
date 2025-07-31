import React from "react";
import styles from "./filter-modal.module.scss";
import Image from "next/image";
import picker from "@/public/SVGs/assets/date-picker.svg";
import caret from "@/public/SVGs/assets/caret-down-svgrepo-com.svg";

type props = {
  organizations: string[];
  status: number[];
  organizationValue: string;
  usernameValue: string;
  emailValue: string;
  phoneValue: string;
  dateValue: string;
  statusValue: number | undefined;
  SetOrganizationValue: (val: string) => void;
  SetUsernameValue: (val: string) => void;
  SetEmailValue: (val: string) => void;
  SetPhoneValue: (val: string) => void;
  SetDateValue: (val: string) => void;
  SetStatusValue: (val: number) => void;
  OnSubmit: (bool: boolean) => void;
};

function FilterModal({ organizations, status, ...props }: props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.OnSubmit(false);
      }}
      className={styles.filterModal}
    >
      <div className={styles.filterCriteria}>
        <label htmlFor="organization" className={styles.criteriaHeader}>
          Organization
        </label>
        <div className={`${styles.filterInput} ${styles.selectInput}`}>
          <select
            title="organization"
            className={styles.select}
            value={props.organizationValue}
            name="organization"
            id="organization"
            onChange={(e) => props.SetOrganizationValue(e.target.value)}
          >
            <option className={styles.default} value="" disabled hidden>
              Select
            </option>
            {organizations.map((org, idx) => (
              <option key={idx} value={org}>
                {org}
              </option>
            ))}
          </select>
          <Image src={caret} alt="caret" width={30} />
        </div>
      </div>

      <div className={styles.filterCriteria}>
        <label htmlFor="username" className={styles.criteriaHeader}>
          Username
        </label>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="User"
          name="username"
          id="username"
          value={props.usernameValue}
          onChange={(e) => props.SetUsernameValue(e.target.value)}
        />
      </div>

      <div className={styles.filterCriteria}>
        <label htmlFor="email" className={styles.criteriaHeader}>
          Email
        </label>
        <input
          className={styles.filterInput}
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={props.emailValue}
          onChange={(e) => props.SetEmailValue(e.target.value)}
        />
      </div>

      <div className={styles.filterCriteria}>
        <label htmlFor="date" className={styles.criteriaHeader}>
          Date
        </label>
        <div className={`${styles.filterInput} ${styles.dateField}`}>
          <input
            className={styles.date}
            type="text"
            placeholder="Date"
            name="date"
            id="date"
            value={props.dateValue}
            onChange={(e) => props.SetDateValue(e.target.value)}
          />
          <label htmlFor="date">
            <Image src={picker} alt="date picker" width={20} />
          </label>
        </div>
      </div>

      <div className={styles.filterCriteria}>
        <label htmlFor="phone" className={styles.criteriaHeader}>
          Phone Number
        </label>
        <input
          className={styles.filterInput}
          type="tel"
          placeholder="Phone"
          name="phone"
          id="phone"
          value={props.phoneValue}
          onChange={(e) => {
            let value = e.target.value;

            if (value === "") {
              props.SetPhoneValue("");
              return;
            }

            if (!value.startsWith("+234")) {
              value = "+234" + value.replace(/^0+/, "").replace(/^\+234/, "");
            }

            const phoneRegex = /^\+234\d{0,10}$/;
            if (phoneRegex.test(value)) {
              props.SetPhoneValue(value);
            }
          }}
        />
      </div>

      <div className={styles.filterCriteria}>
        <label htmlFor="status" className={styles.criteriaHeader}>
          Status
        </label>
        <div className={`${styles.filterInput} ${styles.selectInput}`}>
          <select
            className={styles.select}
            name="status"
            title="status"
            id="status"
            value={props.statusValue}
            onChange={(e) => props.SetStatusValue(Number(e.target.value))}
          >
            <option className={styles.default} value="" disabled hidden>
              Select
            </option>
            {status.map((s, idx) => (
              <option key={idx} value={s}>
                {s === 0
                  ? "Pending"
                  : s === 1
                  ? "Active"
                  : s === 2
                  ? "Blacklisted"
                  : "Inactive"}
              </option>
            ))}
          </select>
          <Image src={caret} alt="caret" width={30} height={30} />
        </div>
      </div>

      <div className={styles.filterButtons}>
        <button type="button" className={styles.resetButton}>
          Reset
        </button>
        <button type="submit" className={styles.filterButton}>
          Filter
        </button>
      </div>
    </form>
  );
}

export default FilterModal;
