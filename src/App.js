import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/landing/landing";
import NavPage from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import SignInPage from "./components/signInPage/signInPage";
import Translate from "./components/translation/translate";
import User from "./components/user/user";
import { AuthContextProvider } from "./context/AuthContext";
import "./styles/partials/_resets.scss";
import Protection from "./userProtection";
import { useState } from "react";
import CreateBlog from "./components/blog/createBlog/createBlog";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
          <NavPage />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/translate" element={<Translate />} />
            <Route
              path="/SignIn"
              element={<SignInPage setIsAuth={setIsAuth} />}
            />
            <Route
              path="/user"
              element={
                // <Protection>
                <User />
                // </Protection>
              }
            />
            <Route path="/create-post" element={<CreateBlog />} />

            {/* <Route path="/flight" element={<Flight />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/restaurant" element={<Restaurant />} /> */}
          </Routes>
          <Footer />
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
