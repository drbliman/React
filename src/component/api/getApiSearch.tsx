import { StarWarsEntity } from "./dataInterface";

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
  return null;
}

async function getApiSearch(
  root: string,
  idPage: string,
  status: 'search' | 'details',
): Promise<StarWarsEntity> {
  const input = document.getElementById("inputSearch") as HTMLInputElement;
  const search = input.value.trim();

  let url: string;

  if (status === 'search') {
    url = `https://swapi.dev/api/${root}/?search=${search}&page=${idPage}`;
  } else {
    url = `https://swapi.dev/api/${root}/${idPage}/`;
  }

  const allResults = await fetchData(url);

  return allResults;
}

export { getApiSearch }