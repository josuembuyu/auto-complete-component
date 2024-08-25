export const data: string[] = Array.from(
  { length: 1000000 },
  (_, index) => `Item ${index + 1}`
);

export const dataFromAPI = async (): Promise<string[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    const jsonData = await response.json();

    const titles: string[] = jsonData.map(
      (item: { name: string }) => item.name
    );

    return titles;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
