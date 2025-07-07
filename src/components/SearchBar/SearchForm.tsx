import { useState, type FormEvent, type SetStateAction } from "react";
import styles from "./styles.module.css";
import type { mode } from "../../App";

type searchProps = { mode: mode; setText: React.Dispatch<SetStateAction<string>> };
type numbersJSON = { text: string; number: number; found: boolean; type: mode };
const SearchForm = (props: searchProps) => {
  const { mode, setText } = props;
  const [number, setNumber] = useState<string>("");
  const getTextJSON = async (number: string) => {
    if (/^\d+$/.test(number) || number === "random") {
      const query: string = mode === "date" ? number.replaceAll(".", "/") : number;
      const api = `http://numbersapi.com/${query.trim()}/${mode}?json`;
      try {
        const res = await fetch(api);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json: numbersJSON = await res.json();
        return json;
      } catch (error) {
        console.log(error);
      }
    }
    setText("Число должно быть в виде цифры");
    return false;
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await getTextJSON(number);
    if (res) {
      const text = res.text;
      setText(text);
    }
  };
  const handleRandom = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await getTextJSON("random");
    if (res) {
      const { text, number } = res;

      setText(text);
      setNumber(number.toString());
    }
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input
        className={styles.query}
        onChange={(e) => setNumber(e.currentTarget.value)}
        value={number}
        type="text"
        name="query"
      />
      <button type="submit">Отправить</button>
      <button onClick={(e) => handleRandom(e)}>Рандом</button>
    </form>
  );
};
export default SearchForm;
