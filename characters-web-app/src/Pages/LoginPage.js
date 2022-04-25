import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_NAME } from "../APIs/Queries";
import { FaSpinner } from "react-icons/fa";

const LoginPage = () => {
  // --------------- get user data ---------------
  const [userNameData, setUserNameData] = useState("");

  const [getUserName, { loading: loadingUser }] = useLazyQuery(
    GET_USER_BY_NAME,
    {
      variables: {
        userName: userNameData,
      },
      onCompleted: ({ getUserByName }) => {
        sessionStorage.setItem("userID", getUserByName.id);
        sessionStorage.setItem("userName", getUserByName.name);
        sessionStorage.setItem("userFavData", getUserByName.savedCharacters);
        window.location.reload();
        setErrorMessage("");
      },
      onError() {
        setErrorMessage("Unable to login now! Please try again later!");
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

    if (username.value === "" || username.value === null) {
      setErrorMessage(errors.emptyName);
    } else {
      setUserNameData(username.value);

      await getUserName();
    }
  };

  return (
    <div className="card login-card">
      {loadingUser ? (
        <div className="card-loader-container">
          <FaSpinner className="loader" />
          <h3> Loading...</h3>
          <h6> Please be patient...</h6>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default LoginPage;
