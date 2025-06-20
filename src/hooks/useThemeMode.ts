import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useThemeMode = () => useContext(ThemeContext);
