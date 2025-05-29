import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../../hooks/useThemeMode';

const ThemeToggleButton: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  return (
    <Tooltip title={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 999,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[2],
        }}
      >
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;