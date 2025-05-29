import { Box, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import type { CurrentWeather } from '../../types/weather';

type Props = { weather: CurrentWeather };

export default function TemperatureInfo({ weather }: Props) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      <Box display="flex" gap={1} alignItems="center" flex={1} minWidth={220}>
        <ThermostatIcon />
        <Typography>
          Temp actual: {weather.main.temp}°C
        </Typography>
      </Box>
      <Box display="flex" gap={1} alignItems="center" flex={1}>
        <ThermostatIcon />
        <Typography>
          Sensación: {weather.main.feels_like}°C
        </Typography>
      </Box>
      <Box display="flex" gap={1} alignItems="center" flex={1}>
        <ThermostatIcon />
        <Typography>
          Min: {weather.main.temp_min}°C / Max: {weather.main.temp_max}°C
        </Typography>
      </Box>
    </Box>
  );
}
