import React from 'react';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'unfetch'; // fuck IE
import GraphQL from './src/GraphQL';

const GraphqlProvider = ({ children, config = {} }) => {
  // console.log('GraphqlProvider render');
  const uri = config.graphql_path || '/graphql';
  GraphQL.config({
    schema: config.schema,
    update_by_field: config.update_by_field,
    update_by: config.update_by
  });
  const httpLink = createHttpLink({
    uri,
  });
  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: config.token ? `Bearer ${config.token}` : "",
      }
    }
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    fetch,
    cache: new InMemoryCache()
  });
  // uncomment to use without token
  // const client = new ApolloClient({
  //   uri,
  //   fetch,
  //   cache: new InMemoryCache()
  // });

  return React.createElement(ApolloProvider, { client, children })
};

export default GraphqlProvider;
