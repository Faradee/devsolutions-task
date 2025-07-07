import { useState, type SetStateAction, useEffect, useCallback, useRef } from "react";
import styles from "./styles.module.css";
import type { mode } from "../../App";
import { useSearchParams } from "react-router";
//TODO: ADD SEARCHSTRING HANDLING NEED TO ADD MODE CONTROLLERS
type searchProps = { mode: mode; setText: React.Dispatch<SetStateAction<string>> };
type numbersJSON = { text: string; number: number; found: boolean; type: mode };
const SearchForm = (props: searchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [number, setNumber] = useState<string>("");
  const { mode, setText } = props;

  const timerRef = useRef<number>(0);
  const getTextJSON = useCallback(
    async (number: string) => {
      const query: string = mode === "date" ? number.replaceAll(".", "/") : number;
      const api = `http://numbersapi.com/${query.trim()}/${mode}?json`;
      try {
        const res = await fetch(api);
        if (!res.ok) {
          if (res.status === 404) setText("Неправильный формат числа");
          else {
            setText(`Ошибка ${res.status}`);
            throw new Error(res.statusText);
          }
        }
        const json: numbersJSON = await res.json();
        return json;
      } catch (error) {
        console.log(error);
      }
      return false;
    },
    [mode, setText]
  );
  const handleSubmit = useCallback(
    async (number: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      const timer = setTimeout(async () => {
        const res = await getTextJSON(number);
        if (res) {
          const text = res.text;
          setText(text);
        }
      }, 300);
      timerRef.current = timer;
    },
    [setText, getTextJSON]
  );
  useEffect(() => {
    handleSubmit(number);
    setSearchParams(`?query=${number}`);
  }, [number, mode, handleSubmit, setSearchParams]);
  useEffect(() => {
    const query = searchParams.get("query");
    if (query) setNumber(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form
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

      <button
        onClick={() => {
          setNumber("Random");
          if (number === "Random") handleSubmit(number);
        }}
      >
        Рандом
      </button>
    </form>
  );
};
export default SearchForm;
