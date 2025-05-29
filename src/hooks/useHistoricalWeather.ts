import { useQuery } from '@tanstack/react-query';
import { API_KEY } from '../config/api';

type ForecastDataPoint = {
  date: string;
  temp_avg: number;
  temp_min: number;
  temp_max: number;
  humidity_avg: number;
  wind_avg: number;
  pressure_avg: number;
  clouds_avg: number;
  rain_total: number;
};

const fetchForecast = async (lat: number, lon: number): Promise<ForecastDataPoint[]> => {
  if (!lat || !lon) throw new Error('Coordenadas no válidas');
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error('❌ Error al obtener datos de pronóstico');

  const data = await res.json();

  const grouped: Record<string, any[]> = {};
  data.list.forEach((entry: any) => {
    const date = entry.dt_txt.split(' ')[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(entry);
  });

  return Object.keys(grouped).slice(0, 5).map(date => {
    const entries = grouped[date];

    const avg = (arr: number[]) => arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;

    return {
      date,
      temp_avg: avg(entries.map(e => e.main?.temp ?? 0)),
      temp_min: Math.min(...entries.map(e => e.main?.temp_min ?? 0)),
      temp_max: Math.max(...entries.map(e => e.main?.temp_max ?? 0)),
      humidity_avg: avg(entries.map(e => e.main?.humidity ?? 0)),
      wind_avg: avg(entries.map(e => e.wind?.speed ?? 0)),
      pressure_avg: avg(entries.map(e => e.main?.pressure ?? 0)),
      clouds_avg: avg(entries.map(e => e.clouds?.all ?? 0)),
      rain_total: +(entries.map(e => e.rain?.['3h'] ?? 0).reduce((a, b) => a + b, 0)).toFixed(1),
    };
  });
};

export const useHistoricalWeather = (lat?: number, lon?: number) =>
  useQuery<ForecastDataPoint[]>({
    queryKey: ['historicalWeather', lat, lon],
    queryFn: () => fetchForecast(lat!, lon!),
    enabled: !!lat && !!lon,
    retry: 1,
  });
