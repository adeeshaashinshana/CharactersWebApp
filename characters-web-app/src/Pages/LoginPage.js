import React, { useState, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_NAME } from "../APIs/Queries";
import AuthContextProvider from "../Contexts/authContext";

const LoginPage = () => {
  // Maintain the login statues of user
  const { setAppAuthContext, setUserNameContext } =
    useContext(AuthContextProvider);

  // --------------- get user data ---------------
  const [userNameData, setUserNameData] = useState("");

  const [getUserName, { loading: loadingUser }] = useLazyQuery(
    GET_USER_BY_NAME,
    {
      variables: {
        userName: userNameData,
      },
      onCompleted: ({ getUserByName }) => {
        console.log("user >>>", getUserByName);

        setAppAuthContext(true);
        setUserNameContext(userNameData);
      },
      onError() {
        console.log("There is a error");
      },
    }
  );

  const [errorMessage, setErrorMessage] = useState("");

  const errors = {
    emptyName: "Username is required!",
    invalidName: "invalid username!",
  };

  const renderErrorMessage = <div className="error">{errorMessage}</div>;

  const handleLogin = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const { username } = document.forms[0];

    // Compare user info
    if (username.value === "" || username.value === null) {
      setErrorMessage(errors.emptyName);
    } else {
      setUserNameData(username.value);

      await getUserName();
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
