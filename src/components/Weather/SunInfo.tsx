import { Box, Typography } from '@mui/material';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import type { CurrentWeather } from '../../types/weather';

type Props = { weather: CurrentWeather };

const formatTime = (unix: number): string =>
  new Date(unix * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

export default function SunInfo({ weather }: Props) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      <Box display="flex" gap={1} alignItems="center" flex={1} minWidth={220}>
        <Brightness5Icon />
        <Typography>Amanece: {formatTime(weather.sys.sunrise)}</Typography>
      </Box>
      <Box display="flex" gap={1} alignItems="center" flex={1}>
        <Brightness4Icon />
        <Typography>Anochece: {formatTime(weather.sys.sunset)}</Typography>
      </Box>
    </Box>
  );
}
