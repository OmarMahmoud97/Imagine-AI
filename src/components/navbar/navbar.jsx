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
            <ul class="dropdown">
              <li className="nav__dropdown">Flights</li>
              <li className="nav__dropdown">Hotels</li>
              <li className="nav__dropdown">Restaurants</li>
            </ul>
          </li>
          <Link to="/translate" className="results__btn-right">
            <li className="nav__item">Translation</li>
          </Link>
          <li className="nav__item">Blog</li>
          <Link className="nav__account-btn" to="/SignIn">
            {user?.displayName ? (
              <button className="nav__login" onClick={handleSignOut}>
                Logout
              </button>
            ) : (
              <button className="nav__login">Login</button>
            )}
          </Link>
        </div>
      </ul>
    </nav>
  );
};
export default NavPage;
