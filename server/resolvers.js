export const resolvers = {
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
