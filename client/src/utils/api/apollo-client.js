import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://cnu-jokes-server.vercel.app/",
  cache: new InMemoryCache(),
});

export default client;
