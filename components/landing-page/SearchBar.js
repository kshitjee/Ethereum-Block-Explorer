import classes from "./SearchBar.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchBar() {
  const [userInput, setUserInput] = useState(0);
  const router = useRouter();

  function searchHandler() {
    router.push("/" + String(userInput));
  }

  return (
    <div className={classes.search}>
      <input
        type="text"
        className={classes.searchTerm}
        placeholder="Search by Address / Txn Hash / Block / Token"
        onChange={(event) => {
          setUserInput(event.target.value);
        }}
      />
      <button
        type="submit"
        className={classes.searchButton}
        onClick={searchHandler}
      >
        SEARCH
      </button>
    </div>
  );
}
