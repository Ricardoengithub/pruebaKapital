import { Box, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import type { CurrentWeather } from '../../types/weather';

type Props = { weather: CurrentWeather };

const formatTemp = (value?: number | null) =>
  value !== undefined && value !== null ? `${value}°C` : 'N/A';

export default function TemperatureInfo({ weather }: Props) {
  const { temp, feels_like, temp_min, temp_max } = weather.main;

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      <Box display="flex" gap={1} alignItems="center" flex={1} minWidth={220}>
        <ThermostatIcon />
        <Typography sx={{ whiteSpace: 'nowrap' }}>
          Temp actual: {formatTemp(temp)}
        </Typography>
      </Box>
      <Box display="flex" gap={1} alignItems="center" flex={1}>
        <ThermostatIcon />
        <Typography sx={{ whiteSpace: 'nowrap' }}>
          Sensación: {formatTemp(feels_like)}
        </Typography>
      </Box>
      <Box display="flex" gap={1} alignItems="center" flex={1}>
        <ThermostatIcon />
        <Typography sx={{ whiteSpace: 'nowrap' }}>
          Min: {formatTemp(temp_min)} / Max: {formatTemp(temp_max)}
        </Typography>
      </Box>
    </Box>
  );
}
