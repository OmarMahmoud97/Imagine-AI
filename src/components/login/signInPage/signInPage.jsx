import "./signInPage.scss";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SignInPage = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
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
      <GoogleButton onClick={handleGoogleSignIn} />
    </section>
  );
};
export default SignInPage;
