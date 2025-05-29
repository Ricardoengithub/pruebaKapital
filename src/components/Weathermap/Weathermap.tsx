import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap } from 'react-leaflet';
import { useCity } from '../../context/CityContext';
import { API_KEY } from '../../config/api';

type Props = {
  setInputValue: (value: string) => void;
};

const WeatherMap: React.FC<Props> = ({ setInputValue }) => {
  const { selectedCity, setSelectedCity } = useCity();
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [popupText, setPopupText] = useState<string>('');

  // Hook que escucha clics en el mapa
  const ClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        setPosition([lat, lon]);

        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
          );
          const data = await res.json();

          if (data.length > 0) {
            const city = data[0];
            const cityData = {
              name: city.name,
              country: city.country,
              lat: city.lat,
              lon: city.lon,
              state: city.state || '',
            };

            setSelectedCity(cityData);
            const fullName = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
            setInputValue(fullName);
            setPopupText(fullName);
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

  const MapController = () => {
    const map = useMap();

    useEffect(() => {
      if (selectedCity?.lat && selectedCity?.lon) {
        const newPosition: [number, number] = [selectedCity.lat, selectedCity.lon];
        map.setView(newPosition, 10);
        setPopupText(`${selectedCity.name}${selectedCity.state ? ', ' + selectedCity.state : ''}, ${selectedCity.country}`);
      }
    }, [selectedCity, map]);

    return null;
  };

  return (
    <div style={{ height: '400px', marginTop: 20 }}>
      <MapContainer center={[19.4326, -99.1332]} zoom={5} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ClickHandler />
        <MapController />
        {position && selectedCity && (
          <Marker position={position}>
            <Popup>{popupText || 'Ciudad seleccionada'}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
