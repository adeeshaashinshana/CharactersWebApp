import React, { useContext } from "react";
import AuthContextProvider from "./Contexts/authContext";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";

const App = () => {
  const { appAuthContext } = useContext(AuthContextProvider);

  return (
    <div className="App">
      <header className="App-header">
        {!appAuthContext && <LoginPage />}
        {appAuthContext && <HomePage />}
      </header>
    </div>
  );
};

export default App;
