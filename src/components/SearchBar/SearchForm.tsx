import { useState } from "react";
import styles from "./styles.module.css";
import type { mode } from "../../types";
import { Link } from "react-router";

const SearchForm = () => {
  const [number, setNumber] = useState<string>("");
  const [mode, setMode] = useState<mode>("trivia");

  return (
    <form
      className={styles.controllers}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        className={styles.query}
        onChange={(e) => {
          setNumber(e.currentTarget.value);
        }}
        value={number}
        type="text"
        autoComplete="off"
        name="query"
      />
      <Link to={`/${number}?mode=${mode}`}>Отправить</Link>
      <Link to={`/random?mode=${mode}`}>Рандом</Link>
      <select name="mode" value={mode} onChange={(e) => setMode(e.currentTarget.value as mode)}>
        <option value="trivia">Trivia</option>
        <option value="year">Year</option>
        <option value="date">Date</option>
        <option value="math">Math</option>
      </select>
    </form>
  );
};
export default SearchForm;
