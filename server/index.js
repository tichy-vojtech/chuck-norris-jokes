import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { RESTDataSource } from "@apollo/datasource-rest";
<<<<<<< HEAD
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
=======
import gql from "graphql-tag";

// const API_URL = "https://https://api.chucknorris.io/";
>>>>>>> a01be3b (created server folder)

class ChuckNorrisAPI extends RESTDataSource {
  baseURL = "https://api.chucknorris.io/";

  async getJokes() {
    return await this.get("jokes/search?query=chu");
  }

  async getCategories() {
    return await this.get("jokes/categories");
  }
}

<<<<<<< HEAD
=======
// const dataSources = () => ({
//   ChuckNorrisAPI: new ChuckNorrisAPI(),
// });

//This is my SCHEMA
const typeDefs = gql`
  type Joke {
    id: String!
    value: String!
    categories: [String!]
  }

  type AllJokes {
    result: [Joke!]
  }

  type Query {
    allJokes: AllJokes!
    categories: [String!]
  }
`;

//Here are my Resolvers
const resolvers = {
  Query: {
    allJokes(_, __, { dataSources }) {
      console.log(dataSources);
      return dataSources.chuckNorrisAPI.getJokes();
    },
    categories(_, __, { dataSources }) {
      return dataSources.chuckNorrisAPI.getCategories();
    },
  },
};

>>>>>>> a01be3b (created server folder)
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
<<<<<<< HEAD
=======
  // dataSources,
  // dataSources: () => {
  //   return {
  //     chuckNorrisAPI: new ChuckNorrisAPI(),
  //   };
  // },
>>>>>>> a01be3b (created server folder)
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
