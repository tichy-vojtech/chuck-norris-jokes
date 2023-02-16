import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GRAPH_QL || "http://localhost:5000",
  cache: new InMemoryCache(),
});

export default client;
