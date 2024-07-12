import { StarWarsEntity } from "./dataInterface";

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
  return null;
}

export default async function getApiSearch(root: string): Promise<StarWarsEntity> {
  const input = document.getElementById("inputSearch") as HTMLInputElement;
  const search = input.value.trim();

  const urls = `https://swapi.dev/api/${root}/?search=${search}`;

  const allResults = await fetchData(urls);
  
  return allResults;
}
