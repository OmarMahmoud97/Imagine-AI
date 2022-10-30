import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { useState } from "react";

import Landing from "./components/landing/landing";
import NavPage from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import SignInPage from "./components/signInPage/signInPage";
import Translate from "./components/translation/translate";
import CreateBlog from "./components/blog/createBlog/createBlog";
import User from "./components/user/user";
import Protection from "./userProtection";
import Blog from "./components/blog/blogPage/blogPage";

import "./styles/partials/_resets.scss";

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
            <Route path="/blog" element={<Blog />} />

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
