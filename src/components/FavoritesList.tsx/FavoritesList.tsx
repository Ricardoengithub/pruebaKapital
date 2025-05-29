import React, { useState } from 'react';
import { Box, Typography, Button, Stack, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useCity } from '../../context/CityContext';
import { getFavorites, toggleFavorite } from '../../util/favorites';

interface Props {
  setInputValue: (value: string) => void;
}

const FavoritesList: React.FC<Props> = ({ setInputValue }) => {
  const { selectedCity } = useCity();
  const [favorites, setFavorites] = useState(getFavorites());

  if (selectedCity) return null;

  const handleToggleFavorite = (cityName: string, country: string) => {
    toggleFavorite({ name: cityName, country } as any); // Asumimos tipo mínimo para eliminación
    setFavorites(getFavorites());
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
              sx={{ border: '1px solid #ccc', borderRadius: 2, p: 1 }}
            >
              <Button
                variant="text"
                onClick={() =>
                  setInputValue(`${fav.name}${fav.state ? ', ' + fav.state : ''}, ${fav.country}`)
                }
              >
                {fav.name}{fav.state ? ', ' + fav.state : ''}, {fav.country}
              </Button>
              <IconButton onClick={() => handleToggleFavorite(fav.name, fav.country)} color="warning">
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
