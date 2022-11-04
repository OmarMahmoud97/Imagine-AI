import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { useState } from "react";

import "./styles/partials/_resets.scss";

import CreateBlog from "./components/blog/createBlog/createBlog";
import SignInPage from "./components/signInPage/signInPage";
import Translate from "./components/create/translate";
import Blog from "./components/blog/blogPage/blogPage";
import Landing from "./components/landing/landing";
import NavPage from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

import User from "./components/user/user";
import Image from "./components/gallery/Gallery.jsx";
function App() {
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [result, setResult] = useState("");

  recognition.onresult = function (e) {
    let transcript = e.results[0][0].transcript;

    setResult(transcript);
  };

  const onClickHandler = () => {
    recognition.start();
    setIsSpeaking(!isSpeaking);
  };
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
            <Route path="/user" element={<User />} />
            <Route path="/create-post" element={<CreateBlog />} />
          </Routes>
          <Footer />
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
