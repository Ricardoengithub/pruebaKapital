import { useContext } from 'react';
import CityContext from '../context/CityContext';

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) throw new Error('useCity must be used inside CityProvider');
  return context;
};
