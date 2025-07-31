import React from "react";
import search from "@/public/SVGs/assets/search.svg";
import Image from "next/image";
import styles from "./search-bar.module.scss";

function SearchBar() {
  return (
    <form className={styles.searchBar} role="search">
      <input
        type="search"
        className={styles.searchBarInputField}
        placeholder="Search for anything"
        aria-label="Search"
      />
      <button type="submit" className={styles.searchBarButton}>
        <Image src={search} alt="Search icon" width={20} height={20} />
        {""}
      </button>
    </form>
  );
}

export default SearchBar;
