import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import styles from "./styles.module.css";
import type { mode } from "../../types";
type numbersJSON = { text: string; number: number; found: boolean; type: mode };

const InfoTab = () => {
  const { query } = useParams();
  const [searchParams] = useSearchParams();
  const [number, setNumber] = useState<string>("");
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const mode = searchParams.get("mode") ? searchParams.get("mode") : "trivia";
    const handleFetch = async (number: string) => {
      const query: string = number;
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
        const { number, text } = (await res.json()) as numbersJSON;
        setNumber(number.toString());
        setText(text);
      } catch (error) {
        console.log(error);
      }
      return false;
    };
    handleFetch(query!);
  }, [query, searchParams]);
  return (
    <div className={styles.card}>
      <h1>{number}</h1>
      <p>{text}</p>
      <Link className="controller" to="/">
        Вернуться на главную страницу
      </Link>
    </div>
  );
};
export default InfoTab;
