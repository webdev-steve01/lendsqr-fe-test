import React from "react";
import styles from "./pagination-dropdown.module.scss";

type Props = {
  rowsPerPage: number;
  totalCount: number;
  onChange: (value: number) => void;
};

const options = [5, 9, 15, 20];

function PaginationDropdown({ rowsPerPage, totalCount, onChange }: Props) {
  return (
    <nav className={styles.container} aria-label="Pagination Controls">
      <label htmlFor="rows-per-page-select">Showing</label>
      <select
        id="rows-per-page-select"
        className={styles.select}
        value={rowsPerPage}
        name="rows-per-page"
        title="Rows per page"
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span>out of {totalCount}</span>
    </nav>
  );
}

export default PaginationDropdown;
