import "./App.css";
import SearchForm from "./components/SearchBar/SearchForm";
import { useState } from "react";

export type mode = "trivia" | "year" | "date" | "math";

function App() {
  const [mode, setMode] = useState<mode>("trivia");
  const [text, setText] = useState<string>("");
  return (
    <>
      <div className="main">
        <div className="controllers">
          <SearchForm setText={setText} mode={mode} />
          <select name="mode" onChange={(e) => setMode(e.currentTarget.value as mode)}>
            <option value="trivia">Trivia</option>
            <option value="year">Year</option>
            <option value="date">Date</option>
            <option value="math">Math</option>
          </select>
        </div>

        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
