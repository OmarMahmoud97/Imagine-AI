import React from "react";
import "./user.scss";
import { UserAuth } from "../../context/AuthContext";

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
    <div className="user">
      <h1>welcome! {user?.displayName}</h1>
      <h2></h2>
      <button onClick={handleSignOut()}>Sign out</button>
    </div>
  );
};

export default User;
