import "./signInPage.scss";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";

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
      navigate("/user");
    }
  }, []);

  return (
    <section className="signInPage">
      <div className="signInPage__container">
        <h1>Choose sign in option.</h1>
        <GoogleButton onClick={handleFacebookSignIn} />
        <GoogleButton onClick={handleGoogleSignIn} />
        <GoogleButton onClick={handleGithubSignIn} />
      </div>
    </section>
  );
};
export default SignInPage;
