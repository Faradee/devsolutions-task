import "./App.css";
import InfoTab from "./components/InfoTab/InfoTab";
import SearchForm from "./components/SearchBar/SearchForm";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchForm />}></Route>
            <Route path="/:query" element={<InfoTab />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
