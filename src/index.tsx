import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>

    <App />
    </ApolloProvider>
  </React.StrictMode>
);
