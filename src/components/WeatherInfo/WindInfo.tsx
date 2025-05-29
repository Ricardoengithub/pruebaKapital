import { Box, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import type { CurrentWeather } from '../../types/weather';

type Props = { weather: CurrentWeather };

const getWindDirection = (deg: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

export default function WindInfo({ weather }: Props) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      <Box display="flex" gap={1} alignItems="center" flex={1} minWidth={220}>
        <AirIcon />
        <Typography>
          Viento: {weather.wind.speed} m/s ({getWindDirection(weather.wind.deg)})
        </Typography>
      </Box>
      {weather.wind.gust && (
        <Box display="flex" gap={1} alignItems="center" flex={1}>
          <AirIcon />
          <Typography>Ráfaga: {weather.wind.gust} m/s</Typography>
        </Box>
      )}
    </Box>
  );
}
