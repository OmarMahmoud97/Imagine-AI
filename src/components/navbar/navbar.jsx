import "./navbar.scss";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { async } from "@firebase/util";

const NavPage = () => {
  const { user, Logout } = UserAuth();

  const handleSignOut = async () => {
    try {
      await Logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="nav">
      <ul className="nav__container">
        <Link to="/">
          <img src={logo} alt="logo" className="nav__logo" />
        </Link>

        <div className="nav__links">
          <Link to="/">
            <li className="nav__item">Home</li>
          </Link>
          <li className="nav__dropdown nav__dropdown-first">
            Book
            <ul className="nav__dropdown-container">
              <Link to="/flights" className="nav__dropdown">
                Flights
              </Link>
              <Link to="/hotels" className="nav__dropdown">
                Hotels
              </Link>
              <Link to="/restaurants" className="nav__dropdown">
                Restaurants
              </Link>
            </ul>
          </li>
          <Link to="/translate" className="results__btn-right">
            <li className="nav__item">Translation</li>
          </Link>
          <Link to="/blog" className="nav__item">
            Blog
          </Link>
          <Link className="nav__account-btn" to="/SignIn">
            {user?.displayName ? (
              <button className="nav__login" onClick={handleSignOut}>
                Logout
              </button>
            ) : (
              <button className="nav__login">Login</button>
            )}
          </Link>

          <Link className="nav__account-btn" to="/create-post">
            {user?.displayName ? (
              <button className="nav__login">Create post</button>
            ) : (
              ""
            )}
          </Link>
        </div>
      </ul>
    </nav>
  );
};
export default NavPage;
