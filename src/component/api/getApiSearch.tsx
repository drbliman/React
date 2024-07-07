async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, error };
  }
}

async function fetchAllData(urls: Array<string>) {
  const fetchPromises = urls.map((url) => fetchData(url));
  const results = await Promise.all(fetchPromises);

  const successfulResults = results
    .filter((result) => result.success)
    .map((result) => result.data);

  return successfulResults;
}

export default async function getApiSearch() {
  const input = document.getElementById("inputSearch") as HTMLInputElement;
  const search = input.value.trim();

  const urls = [
    `https://swapi.dev/api/people/?search=${search}`,
    `https://swapi.dev/api/planets/?search=${search}`,
    `https://swapi.dev/api/films/?search=${search}`,
    `https://swapi.dev/api/species/?search=${search}`,
    `https://swapi.dev/api/vehicles/?search=${search}`,
    `https://swapi.dev/api/starships/?search=${search}`,
  ];

  const allResults = await fetchAllData(urls);
  return allResults;
}
