import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { useState } from "react";

import Restaurant from "./components/book/restaurant/restaurant";
import "./styles/partials/_resets.scss";

import CreateBlog from "./components/blog/createBlog/createBlog";
import SignInPage from "./components/signInPage/signInPage";
import Translate from "./components/translation/translate";
import Flight from "./components/book/flight-search/flight";
import Blog from "./components/blog/blogPage/blogPage";
import Landing from "./components/landing/landing";
import NavPage from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Hotel from "./components/book/hotel/hotel";
import Protection from "./userProtection";
import User from "./components/user/user";
import Activities from "./components/book/activities/activities";
import Image from "./components/gallery/Gallery.jsx";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <AuthContextProvider>
          <NavPage />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/create" element={<Translate />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/image" element={<Image />} />
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

            <Route path="/flights" element={<Flight />} />
            <Route path="/hotels" element={<Hotel />} />
            <Route path="/restaurants" element={<Restaurant />} />
            <Route path="/activities" element={<Activities />} />
          </Routes>
          <Footer />
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
