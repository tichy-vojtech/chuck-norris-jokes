import axios from "axios";

export async function getCategoryJoke() {
  try {
    const pathArray = window.location.pathname.split("/");
    const category = pathArray[2];
    const endpoint = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const response = await axios.get(endpoint);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
