import React from "react";
import search from "@/public/SVGs/assets/search.svg";
import Image from "next/image";
import styles from "./search-bar.module.scss";

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        className={styles.searchBarInputField}
        placeholder="Search for anything"
      />
      <button type="button" className={styles.searchBarButton}>
        <Image src={search} alt="search" width={20} height={20} />
        {/* this was added to bypass the error of no text within the button  */}
      </button>
    </div>
  );
}

export default SearchBar;
