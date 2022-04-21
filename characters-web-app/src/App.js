import React, { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import AuthContextProvider from "./Contexts/authContext";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";

const App = () => {
  const { appAuthContext } = useContext(AuthContextProvider);

  /* ================== Connect with the backend ================== */
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (networkError || graphQLErrors) {
      console.log(`[Network error]: ${networkError}`);
      console.log(`[graphQ error]: ${graphQLErrors}`);
    }
  });

  const BASE_URL = "https://rickandmortyapi.com/graphql";
  const link = from([errorLink, new HttpLink({ uri: BASE_URL })]);
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          {!appAuthContext && <LoginPage />}
          {appAuthContext && <HomePage />}
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
