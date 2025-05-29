import WeatherCard from './components/Weather/WeatherCard';
import WeatherSearch from './components/WeatherSearch';
import { useCity } from './context/CityContext';
import { useCurrentWeather } from './hooks/useCurrentWeather';

function App() {
  const { selectedCity } = useCity();
  const { data: weather, isLoading, isError } = useCurrentWeather(
    selectedCity?.lat,
    selectedCity?.lon
  );

  return (
    <div style={{ padding: 20 }}>
      <WeatherSearch />
      {isLoading && <p>Cargando clima...</p>}
      {isError && <p>❌ Error al obtener el clima</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;