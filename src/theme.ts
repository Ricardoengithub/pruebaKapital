import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#e9edf1',      // gris muy suave azulado
      paper: '#ffffff',        // blanco puro para tarjetas
    },
    primary: {
      main: '#4f91d8',         // azul suave
    },
    secondary: {
      main: '#fbc02d',         // amarillo cálido
    },
    text: {
      primary: '#2c3e50',      // gris oscuro-azulado
      secondary: '#607d8b',    // gris medio
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e2f',      // gris azulado oscuro
      paper: '#2a2a3c',        // un tono más claro para tarjetas
    },
    primary: {
      main: '#90caf9',         // azul cielo suave
    },
    secondary: {
      main: '#ffd54f',         // amarillo pastel
    },
    text: {
      primary: '#f5f5f5',      // blanco apagado
      secondary: '#b0bec5',    // gris claro
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});
