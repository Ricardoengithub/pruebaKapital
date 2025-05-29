import { useEffect, useState } from 'react';
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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const {
    data: weather,
    isLoading: loadingWeather,
    isError: errorWeather,
  } = useCurrentWeather(selectedCity?.lat, selectedCity?.lon);

  const {
    data: forecastData,
    isLoading: loadingHistory,
    isError: errorHistory,
  } = useHistoricalWeather(selectedCity?.lat, selectedCity?.lon);

  // Detectar conexión offline/online
  useEffect(() => {
    const updateStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '20px auto' }}>
      {/* 🔌 Conexión perdida */}
      {isOffline && (
        <div style={{ background: '#fff3cd', padding: 10, borderRadius: 4, marginBottom: 16 }}>
          <p style={{ margin: 0, color: '#856404' }}>
            🔌 Estás sin conexión a internet. La información no se puede actualizar.
          </p>
        </div>
      )}
      <WeatherSearch inputValue={inputValue} setInputValue={setInputValue} />
      {!selectedCity && <FavoritesList setInputValue={setInputValue} />}
      {loadingWeather && <p>⏳ Cargando clima actual...</p>}
      {errorWeather && (
        <p style={{ color: 'crimson' }}>❌ No se pudo obtener el clima actual.</p>
      )}
      {weather && <WeatherCard weather={weather} />}
      {loadingHistory && <p>⏳ Cargando datos históricos...</p>}
      {errorHistory && (
        <p style={{ color: 'crimson' }}>❌ No se pudo obtener el pronóstico extendido.</p>
      )}
      {Array.isArray(forecastData) && forecastData.length > 0 && <WeatherChart data={forecastData} />}
      <WeatherMap setInputValue={setInputValue} />
      <FloatingFavoriteButton />
      <ThemeToggle />
    </div>
  );
}

export default App;
