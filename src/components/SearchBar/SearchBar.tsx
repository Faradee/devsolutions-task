import { type FormEvent, type SetStateAction } from "react";
import styles from "./styles.module.css";
import type { mode } from "../../App";

type searchProps = { mode: mode; setText: React.Dispatch<SetStateAction<string>> };

const SearchBar = (props: searchProps) => {
  const { mode, setText } = props;
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawQuery = formData.get("query") as string;
    if (rawQuery) {
      const query: string = mode === "date" ? rawQuery.replaceAll(".", "/") : rawQuery;
      const api = `http://numbersapi.com/${query}/${mode}`;
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
    }
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input className={styles.query} type="text" name="query" required />
    </form>
  );
};
export default SearchBar;
