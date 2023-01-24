import axios from "axios";
export async function getCategories() {
  try {
    const endpoint = "https://api.chucknorris.io/jokes/categories";
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
