import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WeatherCard from './WeatherCard';
import type { CurrentWeather } from '../../types/weather';

// mocks en WeatherCard.test.tsx
vi.mock('./WeatherHeader', () => ({
  default: () => <div data-testid="WeatherHeader">Ciudad de Prueba</div>,
}));

vi.mock('./TemperatureInfo', () => ({
  default: () => <div data-testid="TemperatureInfo">clear sky</div>,
}));

vi.mock('./AtmosphericInfo', () => ({
  default: () => <div data-testid="AtmosphericInfo" />,
}));
vi.mock('./WindInfo', () => ({
  default: () => <div data-testid="WindInfo" />,
}));
vi.mock('./SunInfo', () => ({
  default: () => <div data-testid="SunInfo" />,
}));

describe('WeatherCard', () => {
  let baseWeather: CurrentWeather;

  beforeEach(() => {
    baseWeather = {
      dt: 1650000000,
      name: 'Ciudad de Prueba',
      main: {
        temp: 25,
        feels_like: 26,
        temp_min: 22,
        temp_max: 28,
        humidity: 60,
        pressure: 1012,
      },
      weather: [
        {
          icon: '01d',
          description: 'clear sky',
          main: 'Clear',
          id: 800,
        },
      ],
      wind: {
        speed: 3.5,
        deg: 180,
        gust: 5.2,
      },
      clouds: {
        all: 10,
      },
      sys: {
        sunrise: 1649990000,
        sunset: 1650030000,
        country: 'MX',
      },
    };
  });

  it('debería renderizar WeatherHeader', () => {
    render(<WeatherCard weather={baseWeather} />);
    expect(screen.getByTestId('WeatherHeader')).toBeInTheDocument();
  });

  it('debería renderizar TemperatureInfo', () => {
    render(<WeatherCard weather={baseWeather} />);
    expect(screen.getByTestId('TemperatureInfo')).toBeInTheDocument();
  });

  it('debería renderizar AtmosphericInfo', () => {
    render(<WeatherCard weather={baseWeather} />);
    expect(screen.getByTestId('AtmosphericInfo')).toBeInTheDocument();
  });

  it('debería renderizar WindInfo', () => {
    render(<WeatherCard weather={baseWeather} />);
    expect(screen.getByTestId('WindInfo')).toBeInTheDocument();
  });

  it('debería renderizar SunInfo', () => {
    render(<WeatherCard weather={baseWeather} />);
    expect(screen.getByTestId('SunInfo')).toBeInTheDocument();
  });

  it('muestra mensaje de error si no hay datos en main', () => {
    const weatherWithoutMain = {
      ...baseWeather,
      main: undefined,
    } as unknown as CurrentWeather;
    render(<WeatherCard weather={weatherWithoutMain} />);
    expect(screen.getByText(/no hay datos disponibles en este momento/i)).toBeInTheDocument();
  });

  it('muestra el nombre de la ciudad', () => {
    render(<WeatherCard weather={baseWeather} />);
    expect(screen.getByText('Ciudad de Prueba')).toBeInTheDocument();
  });

  it('renderiza sin errores con valores mínimos', () => {
    const minimalWeather = {
      ...baseWeather,
      wind: { speed: 0, deg: 0 },
      clouds: { all: 0 },
    };
    render(<WeatherCard weather={minimalWeather} />);
    expect(screen.getByTestId('WeatherHeader')).toBeInTheDocument();
  });

  it('soporta render con ráfaga de viento nula', () => {
    const weatherWithoutGust = {
      ...baseWeather,
      wind: { speed: 3, deg: 90 },
    };
    render(<WeatherCard weather={weatherWithoutGust} />);
    expect(screen.getByTestId('WindInfo')).toBeInTheDocument();
  });

  it('muestra correctamente la descripción del clima', () => {
    render(<WeatherCard weather={baseWeather} />);
    expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
  });
});
