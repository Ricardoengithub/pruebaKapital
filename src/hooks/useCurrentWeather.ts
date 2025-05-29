import { useQuery } from '@tanstack/react-query';
import type { CurrentWeather } from '../types/weather';
import { API_KEY } from '../config/api';

export const useCurrentWeather = (lat?: number, lon?: number) =>
  useQuery<CurrentWeather>({
    queryKey: ['currentWeather', lat, lon],
    queryFn: async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error('No se pudo obtener el clima');
      return res.json();
    },
    enabled: !!lat && !!lon, // Solo ejecuta si hay lat y lon
  });