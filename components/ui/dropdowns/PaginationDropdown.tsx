import React from "react";
import styles from "./pagination-dropdown.module.scss"; // optional styling module

type Props = {
  rowsPerPage: number;
  totalCount: number;
  onChange: (value: number) => void;
};

const options = [5, 9, 15, 20];

function PaginationDropdown({ rowsPerPage, totalCount, onChange }: Props) {
  return (
    <div className={styles.container}>
      <span>Showing</span>
      <select
        className={styles.select}
        value={rowsPerPage}
        name="rows per page"
        title="rows per page"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span>out of {totalCount}</span>
    </div>
  );
}

export default PaginationDropdown;
