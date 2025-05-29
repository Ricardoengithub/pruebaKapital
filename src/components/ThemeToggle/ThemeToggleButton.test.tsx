import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggleButton from './ThemeToggle';

vi.mock('../../hooks/useThemeMode');
import { useThemeMode } from '../../hooks/useThemeMode';

describe('ThemeToggleButton', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el ícono de modo oscuro cuando el tema actual es claro', () => {
    (useThemeMode as jest.Mock).mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggleButton />);
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Cambiar a modo oscuro')).toBeInTheDocument();
  });

  it('renderiza el ícono de modo claro cuando el tema actual es oscuro', () => {
    (useThemeMode as jest.Mock).mockReturnValue({
      mode: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggleButton />);
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
    expect(screen.getByLabelText('Cambiar a modo claro')).toBeInTheDocument();
  });

  it('llama a toggleTheme al hacer clic en el botón', () => {
    (useThemeMode as jest.Mock).mockReturnValue({
      mode: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggleButton />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
