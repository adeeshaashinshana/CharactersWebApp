/* =============================================
This Context helps to maintain the user's login status
============================================= */

import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [appAuthContext, setAppAuthContext] = useState(false);
  const [userNameContext, setUserNameContext] = useState("");

  const value = useMemo(
    () => ({
      appAuthContext,
      setAppAuthContext,
      userNameContext,
      setUserNameContext,
    }),
    [userNameContext, appAuthContext]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
