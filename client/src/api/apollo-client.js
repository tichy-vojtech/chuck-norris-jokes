import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GRAPH_QL,
  cache: new InMemoryCache(),
});

export default client;
