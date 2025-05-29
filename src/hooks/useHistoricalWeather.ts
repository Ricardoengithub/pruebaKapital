import { useQuery } from '@tanstack/react-query';
import { API_KEY } from '../config/api';

const fetchForecast = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error('Error al obtener datos históricos');
  const data = await res.json();

  const grouped: Record<string, any[]> = {};
  data.list.forEach((entry: any) => {
    const date = entry.dt_txt.split(' ')[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(entry);
  });

  const result = Object.keys(grouped).slice(0, 5).map(date => {
    const entries = grouped[date];

    const temps = entries.map(e => e.main?.temp ?? 0);
    const tempMins = entries.map(e => e.main?.temp_min ?? 0);
    const tempMaxs = entries.map(e => e.main?.temp_max ?? 0);
    const humidities = entries.map(e => e.main?.humidity ?? 0);
    const winds = entries.map(e => e.wind?.speed ?? 0);
    const pressures = entries.map(e => e.main?.pressure ?? 0);
    const clouds = entries.map(e => e.clouds?.all ?? 0);
    const rains = entries.map(e => e.rain?.['3h'] ?? 0);

    return {
      date,
      temp_avg: temps.length ? +(temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1) : 0,
      temp_min: Math.min(...tempMins),
      temp_max: Math.max(...tempMaxs),
      humidity_avg: humidities.length ? +(humidities.reduce((a, b) => a + b, 0) / humidities.length).toFixed(1) : 0,
      wind_avg: winds.length ? +(winds.reduce((a, b) => a + b, 0) / winds.length).toFixed(1) : 0,
      pressure_avg: pressures.length ? +(pressures.reduce((a, b) => a + b, 0) / pressures.length).toFixed(1) : 0,
      clouds_avg: clouds.length ? +(clouds.reduce((a, b) => a + b, 0) / clouds.length).toFixed(1) : 0,
      rain_total: +(rains.reduce((a, b) => a + b, 0)).toFixed(1),
    };
  });

  return result;
};

export const useHistoricalWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['historical-weather', lat, lon],
    queryFn: () => fetchForecast(lat, lon),
    enabled: !!lat && !!lon,
  });
};
