import type { City } from '../types/weather';

export const getFavorites = (): City[] => {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
};

export const isFavorite = (city: City): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.name === city.name && fav.country === city.country);
};

export const toggleFavorite = (city: City) => {
  const favorites = getFavorites();
  const exists = favorites.some((fav) => fav.name === city.name && fav.country === city.country);

  const updated = exists
    ? favorites.filter((fav) => fav.name !== city.name || fav.country !== city.country)
    : [...favorites, city];

  localStorage.setItem('favorites', JSON.stringify(updated));
};
