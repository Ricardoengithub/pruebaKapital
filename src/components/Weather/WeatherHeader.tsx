import { Box, Typography } from '@mui/material';
import type { CurrentWeather } from '../../types/weather';

type Props = { weather: CurrentWeather };

export default function WeatherHeader({ weather }: Props) {
  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const description = weather.weather[0].description.toUpperCase();

  return (
    <Box textAlign="center">
      <Typography variant="h4">{weather.name}</Typography>
      <img src={iconUrl} alt={description} width={100} />
      <Typography variant="h6">{description}</Typography>
    </Box>
  );
}
