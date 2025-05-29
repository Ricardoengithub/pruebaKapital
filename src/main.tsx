import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CityProvider } from './context/CityContext';
import { ThemeProviderCustom, useThemeMode } from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme';
import App from './App';

const queryClient = new QueryClient();

const Root = () => {
  const { mode } = useThemeMode();

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <CityProvider>
          <App />
        </CityProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderCustom>
      <Root />
    </ThemeProviderCustom>
  </StrictMode>
);
