import React, { useContext } from "react";
import AuthContextProvider from "../Contexts/authContext";

const TopBar = () => {
  // Maintain the login statues of user
  const { setAppAuthContext, userNameContext, setUserNameContext } =
    useContext(AuthContextProvider);

  const handleLogout = (event) => {
    //Prevent page reload
    event.preventDefault();

    setAppAuthContext(false);
    setUserNameContext("");
  };

  return (
    <div className="top-bar">
      <h2 className="user-name"> {userNameContext} </h2>
      <form onSubmit={handleLogout} className="logout-button">
        <input type="submit" value="Logout" />
      </form>
    </div>
  );
};

export default TopBar;
