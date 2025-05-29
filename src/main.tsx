import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CityProvider } from './context/CityContext';
import App from './App';
import { getTheme } from './theme';

const queryClient = new QueryClient();

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = getTheme(prefersDark ? 'dark' : 'light');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CityProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Aplica estilos base globales de MUI */}
          <App />
        </ThemeProvider>
      </CityProvider>
    </QueryClientProvider>
  </StrictMode>
);