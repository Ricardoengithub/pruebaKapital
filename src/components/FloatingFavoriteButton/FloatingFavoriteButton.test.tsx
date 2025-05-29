import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FloatingFavoriteButton from './FloatingfavoriteButton';

vi.mock('../../hooks/useCity');
vi.mock('../../util/favorites');

import { useCity } from '../../hooks/useCity';
import { isFavorite, toggleFavorite } from '../../util/favorites';

const mockCity = {
  name: 'Madrid',
  country: 'ES',
  lat: 40.4168,
  lon: -3.7038,
};

describe('FloatingFavoriteButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('no renderiza si no hay ciudad seleccionada', () => {
    (useCity as jest.Mock).mockReturnValue({ selectedCity: null });
    const { container } = render(<FloatingFavoriteButton />);
    expect(container).toBeEmptyDOMElement();
  });

  it('muestra el ícono vacío si la ciudad no es favorita', () => {
    (useCity as jest.Mock).mockReturnValue({ selectedCity: mockCity });
    (isFavorite as jest.Mock).mockReturnValue(false);

    render(<FloatingFavoriteButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('StarBorderIcon')).toBeInTheDocument();
  });

  it('muestra el ícono lleno si la ciudad es favorita', () => {
    (useCity as jest.Mock).mockReturnValue({ selectedCity: mockCity });
    (isFavorite as jest.Mock).mockReturnValue(true);

    render(<FloatingFavoriteButton />);
    expect(screen.getByTestId('StarIcon')).toBeInTheDocument();
  });

  it('llama a toggleFavorite al hacer click y cambia el ícono', () => {
    (useCity as jest.Mock).mockReturnValue({ selectedCity: mockCity });
    (isFavorite as jest.Mock).mockReturnValueOnce(false).mockReturnValueOnce(true);
    (toggleFavorite as jest.Mock).mockImplementation(() => {});

    render(<FloatingFavoriteButton />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledWith(mockCity);
  });
});
