import "./signInPage.scss";

import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
const SignInPage = ({ setIsAuth }) => {
  const { facebookSignIn, githubSignIn, googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn();
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, []);

  return (
    <section className="signInPage">
      <div className="signInPage__container">
        <h1 className="signInPage__header"> sign in with...</h1>
        <FacebookLoginButton onClick={handleFacebookSignIn} />
        <GoogleLoginButton onClick={handleGoogleSignIn} />
        <GithubLoginButton onClick={handleGithubSignIn} />
      </div>
    </section>
  );
};
export default SignInPage;
