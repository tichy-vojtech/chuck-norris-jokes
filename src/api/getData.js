import axios from "axios";

export async function getData(ending) {
  try {
    const endpoint = `https://api.chucknorris.io/jokes/${ending}`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
