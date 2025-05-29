import React, { useState } from 'react';
import { Box, Typography, Stack, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useCity } from '../../hooks/useCity';
import { getFavorites, toggleFavorite } from '../../util/favorites';
import type { City } from '../../types/weather';
interface Props {
  setInputValue: (value: string) => void;
}

const FavoritesList: React.FC<Props> = ({ setInputValue }) => {
  const { selectedCity, setSelectedCity } = useCity();
  const [favorites, setFavorites] = useState<City[]>(getFavorites());

  if (selectedCity) return null;

  const handleToggleFavorite = (cityName: string, country: string) => {
    toggleFavorite({ name: cityName, country } as City); // Forzamos sólo si sabemos que cumple
    setFavorites(getFavorites());
  };

  const handleSelectCity = (fav: City) => {
    setSelectedCity(fav);
    setInputValue(`${fav.name}${fav.state ? ', ' + fav.state : ''}, ${fav.country}`);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        🌟 Ciudades favoritas
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body2">No tienes ciudades favoritas aún.</Typography>
      ) : (
        <Stack spacing={2}>
          {favorites.map((fav) => (
            <Box
              key={`${fav.name}-${fav.country}`}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ border: '1px solid #ccc', borderRadius: 2, p: 1, cursor: 'pointer' }}
              onClick={() => handleSelectCity(fav)}
            >
              <Typography>
                {fav.name}{fav.state ? ', ' + fav.state : ''}, {fav.country}
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite(fav.name, fav.country);
                }}
                color="warning"
              >
                <StarIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default FavoritesList;
