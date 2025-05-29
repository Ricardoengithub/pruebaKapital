import { createContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export const ThemeContext = createContext<{
  mode: ThemeMode;
  toggleTheme: () => void;
}>({
  mode: 'light',
  toggleTheme: () => {},
});
