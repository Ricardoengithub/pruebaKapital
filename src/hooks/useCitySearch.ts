import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "../config/api";
import type { City } from "../types/weather";

const fetchCities = async (query: string): Promise<City[]> => {
  if (query.trim() === "") return [];
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Error al obtener ciudades");
  return await res.json();
};

export const useCitySearch = (query: string) =>
  useQuery<City[]>({
    queryKey: ["cities", query],
    queryFn: () => fetchCities(query),
    enabled: query.trim().length > 0,
    staleTime: 1000 * 60 * 5,
  });
