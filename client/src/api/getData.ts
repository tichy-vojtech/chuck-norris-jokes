import { gql } from "@apollo/client";
import client from "./apollo-client";

export async function getData() {
  const { data } = await client.query({
    query: gql`
      query AllJokes {
        allJokes {
          result {
            id
            value
            categories
          }
        }
      }
    `,
  });
  return data.allJokes.result;
}
