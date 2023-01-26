import axios from "axios";

export async function getJoke() {
  try {
    const endpoint = "https://api.chucknorris.io/jokes/search?q";
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
