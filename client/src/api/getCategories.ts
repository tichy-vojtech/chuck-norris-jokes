import { gql } from "@apollo/client";
import client from "./apollo-client";

export async function getCategories() {
  const { data } = await client.query({
    query: gql`
      query Categories {
        categories
      }
    `,
  });
  return data.categories;
}
