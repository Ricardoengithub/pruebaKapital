import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles'; // ✅ tipo-only

export const getTheme = (mode: 'light' | 'dark') => {
  const palette: ThemeOptions['palette'] = {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: '#f5f5f5',
          },
        }
      : {
          background: {
            default: '#121212',
          },
        }),
  };

  return createTheme({ palette });
};