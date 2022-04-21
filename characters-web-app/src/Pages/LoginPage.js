import React, { useState, useContext } from "react";
import AuthContextProvider from "../Contexts/authContext";

const LoginPage = () => {
  // Maintain the login statues of user
  const { setAppAuthContext, setUserNameContext } =
    useContext(AuthContextProvider);

  const userNameData = "xxx";

  const [errorMessage, setErrorMessage] = useState("");

  const errors = {
    emptyName: "Username is required!",
    invalidName: "invalid username!",
  };

  const renderErrorMessage = <div className="error">{errorMessage}</div>;

  const handleLogin = (event) => {
    //Prevent page reload
    event.preventDefault();

    const { username } = document.forms[0];

    // Compare user info
    if (username.value === "" || username.value === null) {
      setErrorMessage(errors.emptyName);
    } else if (username.value !== userNameData) {
      setErrorMessage(errors.invalidName);
    } else {
      setAppAuthContext(true);
      setUserNameContext(username.value);
    }
  };

  return (
    <div className="card login-card">
      <div className="card-title">
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="username" required />
            {renderErrorMessage}
          </div>
          <div className="button-container">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
