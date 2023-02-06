import axios from "axios";

const BASE_URL = 'https://api.chucknorris.io/jokes/';

export async function getData(ending) {
  const endpoint = `${BASE_URL}${ending}`;
  const { data } = await axios.get(endpoint);
  
  return data;
}
