import { ApolloProvider } from '@apollo/client';
import React from 'react';
import client from "./apolloClient";
import HomePage from './components/HomePage';
import './index.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <HomePage/>
      </div>
    </ApolloProvider>
  );
}

export default App;
