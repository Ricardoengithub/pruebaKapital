import React, { useState, useEffect } from 'react';
import { Fab, Tooltip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useCity } from '../../context/CityContext';
import { isFavorite, toggleFavorite } from '../../util/favorites';

const FloatingFavoriteButton: React.FC = () => {
  const { selectedCity } = useCity();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      setIsFav(isFavorite(selectedCity));
    }
  }, [selectedCity]);

  if (!selectedCity) return null;

  const handleToggle = () => {
    if (selectedCity) {
      toggleFavorite(selectedCity);
      setIsFav(prev => !prev);
    }
  };

  return (
    <Tooltip title={isFav ? 'Eliminar de favoritos' : 'Agregar a favoritos'}>
      <Fab
        color="primary"
        onClick={handleToggle}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 999,
        }}
      >
        {isFav ? <StarIcon /> : <StarBorderIcon />}
      </Fab>
    </Tooltip>
  );
};

export default FloatingFavoriteButton;
