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
        <h2 className={styles.criteriaHeader}>Organization</h2>
        <div className={`${styles.filterInput} ${styles.selectInput}`}>
          <select
            title="organization"
            className={styles.select}
            value={props.organizationValue}
            name="organization"
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
        <h2 className={styles.criteriaHeader}>Username</h2>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="User"
          name=""
          id=""
          value={props.usernameValue}
          onChange={(e) => props.SetUsernameValue(e.target.value)}
        />
      </div>
      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Email</h2>
        <input
          className={styles.filterInput}
          type="Email"
          placeholder="Email"
          name=""
          id=""
          value={props.emailValue}
          onChange={(e) => props.SetEmailValue(e.target.value)}
        />
      </div>
      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Date</h2>
        <div className={`${styles.filterInput} ${styles.dateField}`}>
          <input
            className={` ${styles.date}`}
            type="Text"
            placeholder="Date"
            name=""
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
        <h2 className={styles.criteriaHeader}>Phone Number</h2>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="Phone"
          name=""
          id=""
          value={props.phoneValue}
          onChange={(e) => {
            let value = e.target.value;

            // Allow clearing the field
            if (value === "") {
              props.SetPhoneValue("");
              return;
            }

            // Ensure it starts with +234
            if (!value.startsWith("+234")) {
              value = "+234" + value.replace(/^0+/, "").replace(/^\+234/, "");
            }

            // Match digits after +234, max 10
            const phoneRegex = /^\+234\d{0,10}$/;

            if (phoneRegex.test(value)) {
              props.SetPhoneValue(value);
            }
          }}
        />
      </div>
      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Status</h2>
        <div className={`${styles.filterInput} ${styles.selectInput}`}>
          <select
            className={styles.select}
            name="status"
            title="status"
            id=""
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
