import "./App.css";
import SearchForm from "./components/SearchBar/SearchForm";
import { useState } from "react";

function App() {
  const [text, setText] = useState<string>("");
  return (
    <>
      <div className="main">
        <div className="controllers">
          <SearchForm setText={setText} />
        </div>

        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
