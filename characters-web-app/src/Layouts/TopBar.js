import React from "react";

const TopBar = () => {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="top-bar">
      <h2 className="user-name"> {sessionStorage.getItem("userName")} </h2>
      <form onSubmit={handleLogout} className="logout-button">
        <input type="submit" value="Logout" />
      </form>
    </div>
  );
};

export default TopBar;
