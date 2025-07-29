import React from "react";
import styles from "./filter-modal.module.scss";

type props = {
  organizations: string[];
  status: number[];
};

function FilterModal({ organizations, status }: props) {
  return (
    <form className={styles.filterModal}>
      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Organization</h2>
        <select title="organization" name="organization" id="">
          {organizations.map((org, idx) => (
            <option key={idx} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Username</h2>
        <input type="text" placeholder="User" name="" id="" />
      </div>
      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Email</h2>
        <input type="Email" placeholder="Email" name="" id="" />
      </div>
      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Date</h2>
        <input type="Date" placeholder="Email" name="" id="" />
      </div>
      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Phone Number</h2>
        <input type="text" placeholder="Email" name="" id="" />
      </div>
      <div className={styles.filterCriteria}>
        <h2 className={styles.criteriaHeader}>Status</h2>
        <select name="status" title="status" id="">
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
      </div>
    </form>
  );
}

export default FilterModal;
