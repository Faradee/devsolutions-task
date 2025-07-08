import { useState, type SetStateAction, useEffect, useCallback, useRef } from "react";
import styles from "./styles.module.css";
import { useSearchParams } from "react-router";
//TODO: ADD SEARCHSTRING HANDLING NEED TO ADD MODE CONTROLLERS
type searchProps = { setText: React.Dispatch<SetStateAction<string>> };
type numbersJSON = { text: string; number: number; found: boolean; type: mode };
type mode = "trivia" | "year" | "date" | "math";

const SearchForm = ({ setText }: searchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [number, setNumber] = useState<string>("");
  const [mode, setMode] = useState<mode>("trivia");
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
      if (number) {
        const timer = setTimeout(async () => {
          const res = await getTextJSON(number);
          if (res) {
            const text = res.text;
            setText(text);
          }
        }, 300);
        timerRef.current = timer;
      }
    },
    [setText, getTextJSON]
  );
  useEffect(() => {
    handleSubmit(number);
    setSearchParams(number ? `?query=${number}&mode=${mode}` : "");
    if (!number) setText("");
  }, [number, mode, handleSubmit, setSearchParams, setText]);
  useEffect(() => {
    const query = searchParams.get("query");
    const mode = searchParams.get("mode") as mode;
    if (query) {
      setNumber(query);
      setMode(mode);
    }
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
