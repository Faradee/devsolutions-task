import { useState } from "react";
import styles from "./styles.module.css";
import type { mode } from "../../types";
import { Link, useNavigate } from "react-router";

const SearchForm = () => {
  const [number, setNumber] = useState<string>("");
  const [mode, setMode] = useState<mode>("trivia");
  const [isFalseInput, setIsFalseInput] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (/^-?\d+$/.test(number)) {
      navigate(`/${number}?mode=${mode}`);
    } else setIsFalseInput(true);
  };
  return (
    <form
      className="controllers"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className={styles.container}>
        <input
          className={styles.field}
          onChange={(e) => {
            setIsFalseInput(false);
            setNumber(e.currentTarget.value);
          }}
          value={number}
          type="text"
          autoComplete="off"
          name="query"
        />

        <select
          className="controller"
          name="mode"
          value={mode}
          onChange={(e) => setMode(e.currentTarget.value as mode)}
        >
          <option value="trivia">Trivia</option>
          <option value="year">Year</option>
          <option value="date">Date</option>
          <option value="math">Math</option>
        </select>
      </div>
      {isFalseInput ? <div>Неправильный формат числа</div> : <></>}
      <div className={styles.container}>
        <button className="controller" type="submit">
          Отправить
        </button>
        <Link className="controller" to={`/random?mode=${mode}`}>
          Рандом
        </Link>
      </div>
    </form>
  );
};
export default SearchForm;
