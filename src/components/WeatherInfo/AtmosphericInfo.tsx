import { Box, Typography } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CompressIcon from '@mui/icons-material/Compress';
import CloudIcon from '@mui/icons-material/Cloud';
import type { CurrentWeather } from '../../types/weather';

type Props = { weather: CurrentWeather };

export default function AtmosphericInfo({ weather }: Props) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      <Box display="flex" gap={1} alignItems="center" flex={1} minWidth={220}>
        <WaterDropIcon />
        <Typography>Humedad: {weather.main.humidity}%</Typography>
      </Box>
      <Box display="flex" gap={1} alignItems="center" flex={1}>
        <CompressIcon />
        <Typography>Presión: {weather.main.pressure} hPa</Typography>
      </Box>
      <Box display="flex" gap={1} alignItems="center" flex={1}>
        <CloudIcon />
        <Typography>Nubosidad: {weather.clouds.all}%</Typography>
      </Box>
    </Box>
  );
}
