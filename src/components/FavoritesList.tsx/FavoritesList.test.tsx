import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FavoritesList from './FavoritesList';
import type { City } from '../../types/weather';

vi.mock('../../hooks/useCity');
vi.mock('../../util/favorites');

import { useCity } from '../../hooks/useCity';
import { getFavorites, toggleFavorite } from '../../util/favorites';

const mockSetSelectedCity = vi.fn();
const mockSetInputValue = vi.fn();

const mockCity: City = {
  name: 'Tokyo',
  country: 'JP',
  lat: 35.6762,
  lon: 139.6503,
};

const mockCityWithState: City = {
  name: 'New York',
  state: 'NY',
  country: 'US',
  lat: 40.7128,
  lon: -74.006,
};

describe('FavoritesList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useCity as jest.Mock).mockReturnValue({
      selectedCity: null,
      setSelectedCity: mockSetSelectedCity,
    });
  });

  it('renderiza mensaje si no hay favoritos', () => {
    (getFavorites as jest.Mock).mockReturnValue([]);

    render(<FavoritesList setInputValue={mockSetInputValue} />);
    expect(screen.getByText(/no tienes ciudades favoritas/i)).toBeInTheDocument();
  });

  it('muestra ciudades favoritas', () => {
    (getFavorites as jest.Mock).mockReturnValue([mockCity]);

    render(<FavoritesList setInputValue={mockSetInputValue} />);
    expect(screen.getByText('Tokyo, JP')).toBeInTheDocument();
  });

  it('selecciona ciudad al hacer click', () => {
    (getFavorites as jest.Mock).mockReturnValue([mockCityWithState]);

    render(<FavoritesList setInputValue={mockSetInputValue} />);
    fireEvent.click(screen.getByText('New York, NY, US'));

    expect(mockSetSelectedCity).toHaveBeenCalledWith(mockCityWithState);
    expect(mockSetInputValue).toHaveBeenCalledWith('New York, NY, US');
  });

	it('elimina ciudad de favoritos al hacer click en estrella', () => {
		(getFavorites as jest.Mock).mockReturnValue([mockCity]);
		(toggleFavorite as jest.Mock).mockImplementation(() => {});
		
		render(<FavoritesList setInputValue={mockSetInputValue} />);
		fireEvent.click(screen.getByRole('button'));
	
		expect(toggleFavorite).toHaveBeenCalledWith(expect.objectContaining({
			name: 'Tokyo',
			country: 'JP',
		}));
	
		expect(getFavorites).toHaveBeenCalledTimes(2);
	});

  it('no muestra nada si hay ciudad seleccionada', () => {
    (useCity as jest.Mock).mockReturnValue({
      selectedCity: mockCity,
      setSelectedCity: mockSetSelectedCity,
    });

    (getFavorites as jest.Mock).mockReturnValue([mockCity]);

    const { container } = render(<FavoritesList setInputValue={mockSetInputValue} />);
    expect(container).toBeEmptyDOMElement();
  });
});
