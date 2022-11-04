import React from "react";
import logo from "../../assets/images/IMAGINE (2).gif";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

import "./mobileNav.scss";

function MobileNav() {
  const { user, Logout } = UserAuth();

  const handleSignOut = async () => {
    try {
      await Logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="mobileNav">
      <ul className="mobileNav__container">
        <Link to="/">
          <img src={logo} alt="logo" className="mobileNav__logo" />
        </Link>

        <div className="mobileNav__links">
          <Link to="/">
            <li className="mobileNav__item">Home</li>
          </Link>

          <Link to="/image">
            {user?.displayName ? (
              <li className="mobileNav__item">Gallery</li>
            ) : (
              ""
            )}
          </Link>

          <Link to="/blog">
            <li className="mobileNav__item">Blog</li>
          </Link>

          <Link to="/create-post">
            {user?.displayName ? (
              <li className="mobileNav__item">Create Blog</li>
            ) : (
              ""
            )}
          </Link>
          <Link className="mobileNav__account-btn" to="/SignIn">
            {user?.displayName ? (
              <button className="mobileNav__login" onClick={handleSignOut}>
                Logout
              </button>
            ) : (
              <button className="mobileNav__login">Login</button>
            )}
          </Link>
          <Link className="mobileNav__account-btn" to="/create">
            {user?.displayName ? (
              <button className="mobileNav__create">Create Image</button>
            ) : (
              ""
            )}
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default MobileNav;
