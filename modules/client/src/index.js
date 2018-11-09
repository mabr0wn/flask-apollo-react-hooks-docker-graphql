//React
import React from 'react';
import * as ReactDOM from 'react-dom';
//Apollo
import { ApolloProvider } from 'react-apollo';
import  { ApolloClient }  from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
//Local  
import App from './components/App.jsx';


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()

});



console.log(React.version);
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
 document.getElementById('root')
)
