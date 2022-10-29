import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/landing/landing";
import NavPage from "./components/navbar/navbar";
import Translate from "./components/translation/translate";
import "./styles/partials/_resets.scss";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavPage />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/translate" element={<Translate />} />
          {/* <Route path="/flight" element={<Flight />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/restaurant" element={<Restaurant />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
