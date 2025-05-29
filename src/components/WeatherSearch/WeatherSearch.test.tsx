import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WeatherSearch from './WeatherSearch';
import type { City } from '../../types/weather';

vi.mock('../../hooks/useCity');
vi.mock('../../hooks/useCitySearch');

import { useCity } from '../../hooks/useCity';
import { useCitySearch } from '../../hooks/useCitySearch';

const mockSetSelectedCity = vi.fn();
const mockSetInputValue = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  (useCity as unknown as jest.Mock).mockReturnValue({
    selectedCity: null,
    setSelectedCity: mockSetSelectedCity,
  });
});

describe('WeatherSearch', () => {
  it('renderiza correctamente el campo de texto', () => {
    (useCitySearch as jest.Mock).mockReturnValue({ data: [], isLoading: false });

    render(<WeatherSearch inputValue="" setInputValue={mockSetInputValue} />);
    expect(screen.getByLabelText('Buscar ciudad')).toBeInTheDocument();
  });

  it('muestra ciudades sugeridas cuando hay coincidencias', async () => {
		const mockCities: City[] = [
			{ name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 }
		];
    (useCitySearch as jest.Mock).mockReturnValue({ data: mockCities, isLoading: false });

    render(<WeatherSearch inputValue="Lon" setInputValue={mockSetInputValue} />);
    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

    await waitFor(() => {
      expect(screen.getByText('London, GB')).toBeInTheDocument();
    });
  });

  it('muestra el mensaje "no se encontraron ciudades" si no hay resultados', async () => {
    (useCitySearch as jest.Mock).mockReturnValue({ data: [], isLoading: false });

    render(<WeatherSearch inputValue="Xyz" setInputValue={mockSetInputValue} />);
    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

    await waitFor(() => {
      expect(screen.getByText('No se encontraron ciudades')).toBeInTheDocument();
    });
  });

  it('muestra el loader cuando isLoading es true', () => {
    (useCitySearch as jest.Mock).mockReturnValue({ data: [], isLoading: true });

    render(<WeatherSearch inputValue="" setInputValue={mockSetInputValue} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('actualiza el input al escribir', () => {
    (useCitySearch as jest.Mock).mockReturnValue({ data: [], isLoading: false });

    render(<WeatherSearch inputValue="" setInputValue={mockSetInputValue} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'New York' } });
    expect(mockSetInputValue).toHaveBeenCalledWith('New York');
  });

  it('actualiza el inputValue al seleccionar una ciudad', () => {
		const mockCities: City[] = [
			{ name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 }
		];
    (useCitySearch as jest.Mock).mockReturnValue({ data: mockCities, isLoading: false });

    render(<WeatherSearch inputValue="" setInputValue={mockSetInputValue} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Paris, FR' } });
    expect(mockSetInputValue).toHaveBeenCalledWith('Paris, FR');
  });

  it('limpia el inputValue si se borra la selección', () => {
    (useCitySearch as jest.Mock).mockReturnValue({ data: [], isLoading: false });

    render(<WeatherSearch inputValue="Some City" setInputValue={mockSetInputValue} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });
    expect(mockSetInputValue).toHaveBeenCalledWith('');
  });
});
