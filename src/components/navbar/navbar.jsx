import "./navbar.scss";
import logo from "../../assets/images/IMAGINE.gif";
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

          <Link to="/image">
            {user?.displayName ? <li className="nav__item">Gallery</li> : ""}
          </Link>

          <Link to="/create">
            {user?.displayName ? <li className="nav__item">Create</li> : ""}
          </Link>

          <Link to="/blog">
            <li className="nav__item">Blog</li>
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
              <button className="nav__create">Create post</button>
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
