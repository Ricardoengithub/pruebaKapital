import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import WeatherChart from './WeatherChart';

// Mock necesario para recharts / ResponsiveContainer
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockData = [
  {
    date: '2025-05-25',
    temp_min: 12,
    temp_max: 24,
    temp_avg: 18,
    humidity_avg: 60,
    wind_avg: 5,
    pressure_avg: 1012,
    clouds_avg: 30,
    rain_total: 2,
  },
  {
    date: '2025-05-26',
    temp_min: 10,
    temp_max: 22,
    temp_avg: 16,
    humidity_avg: 70,
    wind_avg: 4,
    pressure_avg: 1015,
    clouds_avg: 50,
    rain_total: 0,
  },
];

describe('WeatherChart', () => {
  it('renderiza correctamente el título y los botones', () => {
    render(<WeatherChart data={mockData} />);
    expect(screen.getByText(/datos históricos \(temperature\)/i)).toBeInTheDocument();
    expect(screen.getByText('🌡️ Temperatura')).toBeInTheDocument();
    expect(screen.getByText('💧 Humedad')).toBeInTheDocument();
  });

  it('cambia a Humedad al hacer click en el botón', () => {
    render(<WeatherChart data={mockData} />);
    fireEvent.click(screen.getByText('💧 Humedad'));
    expect(screen.getByText(/datos históricos \(humidity\)/i)).toBeInTheDocument();
  });

  it('cambia a Viento al hacer click en el botón', () => {
    render(<WeatherChart data={mockData} />);
    fireEvent.click(screen.getByText('💨 Viento'));
    expect(screen.getByText(/datos históricos \(wind\)/i)).toBeInTheDocument();
  });

  it('cambia a Lluvia al hacer click en el botón', () => {
    render(<WeatherChart data={mockData} />);
    fireEvent.click(screen.getByText('🌧️ Lluvia'));
    expect(screen.getByText(/datos históricos \(rain\)/i)).toBeInTheDocument();
  });
});
