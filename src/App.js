import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/landing/landing";
import SignInPage from "./components/login/signInPage/signInPage";
import NavPage from "./components/navbar/navbar";
import Translate from "./components/translation/translate";
import User from "./components/user/user";
import { AuthContextProvider } from "./context/AuthContext";
import "./styles/partials/_resets.scss";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
          <NavPage />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/translate" element={<Translate />} />
            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/user" element={<User />} />

            {/* <Route path="/flight" element={<Flight />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/restaurant" element={<Restaurant />} /> */}
          </Routes>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
