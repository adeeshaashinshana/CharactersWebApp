import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";

const App = () => {
  /* ================== Connect with the backend ================== */
  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (networkError || graphQLErrors) {
      console.log(`[Network error]: ${networkError}`);
      console.log(`[graphQ error]: ${graphQLErrors}`);
    }
  });

  const BASE_URL = "http://localhost:4000/graphql";
  const link = from([errorLink, new HttpLink({ uri: BASE_URL })]);
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          {sessionStorage.getItem("userName") === null ? (
            <LoginPage />
          ) : (
            <HomePage />
          )}
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
