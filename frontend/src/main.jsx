

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const API_URL = 'https://YOUR-RAILWAY-BACKEND-DOMAIN.up.railway.app/graphql'; 

const client = new ApolloClient({
  uri: API_URL, 
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
