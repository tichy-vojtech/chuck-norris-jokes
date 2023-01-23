import { useEffect, useState } from "react";
import axios from "axios";

export async function getJokes() {
  try {
    const endpoint = "https://api.chucknorris.io/jokes/random";
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
