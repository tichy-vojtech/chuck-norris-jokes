import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { RESTDataSource } from "@apollo/datasource-rest";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

class ChuckNorrisAPI extends RESTDataSource {
  baseURL = "https://api.chucknorris.io/";

  async getJokes() {
    return await this.get("jokes/search?query=chu");
  }

  async getCategories() {
    return await this.get("jokes/categories");
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//adding data sources to my server's context function
const { url } = await startStandaloneServer(server, {
  listen: { port: 5000 },
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        chuckNorrisAPI: new ChuckNorrisAPI({ cache }),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
