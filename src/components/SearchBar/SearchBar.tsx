import { useState, type FormEvent } from "react";
import styles from "./styles.module.css";
type mode = "trivia" | "year" | "date" | "math";
const SearchBar = () => {
  const [mode, setMode] = useState<mode>("trivia");
  const [text, setText] = useState<string>("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const number = formData.get("query");

    const api = `http://numbersapi.com/${number}/${mode}`;
    try {
      const res = await fetch(api);
      if (!res.ok) {
        throw new Error("error");
      }
      const text = await res.text();
      setText(text);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input className={styles.query} type="text" name="query" required />
    </form>
  );
};
export default SearchBar;
