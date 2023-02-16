import gql from "graphql-tag";

export const typeDefs = gql`
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
