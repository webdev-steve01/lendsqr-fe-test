"use client";
import React, { useState, useMemo } from "react";
import UserTableBody from "./UserTableBody";
import Image from "next/image";
import filter from "@/public/SVGs/assets/filter-results-button.svg";
import prev from "@/public/SVGs/assets/previous-active.svg";
import prevDisabled from "@/public/SVGs/assets/previous-disabled.svg";
import next from "@/public/SVGs/assets/next-active.svg";
import nextDisabled from "@/public/SVGs/assets/next-disabled.svg";
import PaginationDropdown from "../dropdowns/PaginationDropdown";
import FilterModal from "../modals/FilterModal";

type Props = {
  data: User[];
};

function UserTable({ data }: Props) {
  const [page, setPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const ROWS_PER_PAGE = rowsPerPage;
  // ✅ Get unique organizations
  const organizations = useMemo(() => {
    const orgSet = new Set<string>();
    data.forEach((user) => orgSet.add(user.organization));
    return Array.from(orgSet);
  }, [data]);
  // ✅ Get unique status values (assuming numbers like 0 | 1 | 2 | 3)
  const statuses = useMemo(() => {
    const statusSet = new Set<number>();
    data.forEach((user) => statusSet.add(user.status));
    return Array.from(statusSet).sort();
  }, [data]);

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
  const paginatedUsers = data.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  );

  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (page < 3) {
        pages.push(
          0,
          1,
          2,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1
        );
      } else if (page > totalPages - 4) {
        pages.push(
          0,
          1,
          2,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1
        );
      } else {
        pages.push(0, "...", page - 1, page, page + 1, "...", totalPages - 1);
      }
    }

    return pages;
  };

  return (
    <>
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              {[
                "Organization",
                "Username",
                "Email",
                "Phone",
                "Date Joined",
                "Status",
                "",
              ].map((title, idx) => (
                <th key={idx}>
                  <p>
                    <span>{title}</span>
                    {title && (
                      <Image src={filter} alt="Filter" width={15} height={20} />
                    )}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <UserTableBody users={paginatedUsers} />
        </table>

        <div className="filter-container">
          <FilterModal organizations={organizations} status={statuses} />
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <PaginationDropdown
          rowsPerPage={rowsPerPage}
          totalCount={data.length}
          onChange={(val) => {
            setPage(0); // optional: reset to first page
            setRowsPerPage(val);
          }}
        />
        <div className="paginationButton">
          <button
            disabled={page === 0}
            className="pagination-button"
            onClick={() => setPage(page - 1)}
          >
            <Image
              src={page === 0 ? prevDisabled : prev}
              alt="Previous"
              width={14}
              height={14}
            />
            {}
          </button>
          {generatePageNumbers().map((p, i) => (
            <button
              key={i}
              disabled={p === "..."}
              className={p === page ? "active" : ""}
              onClick={() => typeof p === "number" && setPage(p)}
            >
              {p === "..." ? "..." : p + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="pagination-button"
          >
            <Image
              src={page === totalPages - 1 ? nextDisabled : next}
              alt="Next"
              width={14}
              height={14}
            />
            {}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserTable;
