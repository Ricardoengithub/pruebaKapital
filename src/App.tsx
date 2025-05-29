import { useState } from 'react';
import WeatherCard from './components/WeatherInfo/WeatherCard';
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import WeatherChart from './components/WeatherChart/WeatherChart';

import { useCity } from './context/CityContext';
import { useCurrentWeather } from './hooks/useCurrentWeather';
import { useHistoricalWeather } from './hooks/useHistoricalWeather';
import FloatingFavoriteButton from './components/FloatingFavoriteButton/FloatingfavoriteButton';
import FavoritesList from './components/FavoritesList.tsx/FavoritesList';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import WeatherMap from './components/Weathermap/Weathermap';

function App() {
  const { selectedCity } = useCity();
  const [inputValue, setInputValue] = useState('');

  const { data: weather, isLoading, isError } = useCurrentWeather(
    selectedCity?.lat,
    selectedCity?.lon
  );

  const { data: forecastData, isLoading: loadingHistory } = useHistoricalWeather(
    selectedCity?.lat,
    selectedCity?.lon
  );

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <WeatherSearch inputValue={inputValue} setInputValue={setInputValue} />
      {!selectedCity && <FavoritesList setInputValue={setInputValue} />}

      {isLoading && <p>Cargando clima...</p>}
      {isError && <p>❌ Error al obtener el clima</p>}
      {weather && <WeatherCard weather={weather} />}

      {loadingHistory && <p>Cargando datos históricos...</p>}
      {forecastData && <WeatherChart data={forecastData} />}
      <WeatherMap />
      <FloatingFavoriteButton />
      <ThemeToggle />
    </div>
  );
}

export default App;
