import React from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import { useCity } from '../../context/CityContext';
import { API_KEY } from '../../config/api';

const WeatherMap = () => {
  const { setSelectedCity } = useCity();
  const [position, setPosition] = React.useState<[number, number] | null>(null);

  // Manejar clics en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setPosition([lat, lon]);

        try {
          // Reverse geocoding con OpenWeather
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
          );
          const data = await res.json();

          if (data.length > 0) {
            const city = data[0];
            setSelectedCity({
              name: city.name,
              country: city.country,
              lat: city.lat,
              lon: city.lon,
              state: city.state || '',
            });
          } else {
            alert('No se encontró ciudad en este punto.');
          }
        } catch (err) {
          console.error('Error al obtener ciudad desde coordenadas:', err);
        }
      },
    });

    return null;
  };

  return (
    <div style={{ height: '400px', marginTop: 20 }}>
      <MapContainer center={[19.4326, -99.1332]} zoom={5} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {position && <Marker position={position} />}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
