import "./signInPage.scss";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";

const SignInPage = ({ setIsAuth }) => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

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
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </section>
  );
};
export default SignInPage;
