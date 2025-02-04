import { queryOptions } from "@tanstack/react-query";

export default function createDataQueryOptions() {
  return queryOptions({
    queryKey: ["data"],
    queryFn: fetchData,
  });
}

async function fetchData(): Promise<Photo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  return await res.json();
}

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
