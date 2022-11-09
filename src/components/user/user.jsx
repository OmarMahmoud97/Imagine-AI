import React from "react";
import "./user.scss";
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import hamburger from "../../assets/icons/iconmonstr-menu-lined-240.png";
const User = () => {
  const { Logout, user } = UserAuth();
  const handleSignOut = async () => {
    try {
      await Logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="user">
      <Link to="/nav">
        <img className="landing__hamburger" src={hamburger} alt="" />
      </Link>
      <div className="user__container">
        <h1 className="user__header">welcome! {user?.displayName}</h1>
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
    </section>
  );
};

export default User;
