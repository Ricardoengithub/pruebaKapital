import { useQuery } from '@tanstack/react-query';

export const useCitySearch = (query: string) => {
  return useQuery({
    queryKey: ['citySearch', query],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=API_KEY`
      );
      if (!response.ok) throw new Error('Network error');
      return response.json();
    },
    enabled: !!query, // ⬅️ esto evita que se ejecute si query es ""
  });
};