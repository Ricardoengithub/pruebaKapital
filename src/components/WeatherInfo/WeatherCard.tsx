import {
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import WeatherHeader from './WeatherHeader';
import TemperatureInfo from './TemperatureInfo';
import WindInfo from './WindInfo';
import SunInfo from './SunInfo';
import AtmosphericInfo from './AtmosphericInfo';
import type { CurrentWeather } from '../../types/weather';
import { getDayPhase, gradients } from '../../util/weather';

type Props = {
  weather: CurrentWeather;
};

const WeatherCard: React.FC<Props> = ({ weather }) => {
  const phase = getDayPhase(weather.dt, weather.sys.sunrise, weather.sys.sunset);
  const background = gradients[phase];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        mt: 4,
        background,
        color: '#fff',
        borderRadius: 4,
        boxShadow: 6,
        overflow: 'hidden',
        width: '100%',
        px: isMobile ? 1 : 3,
      }}
    >
      <CardContent sx={{ px: isMobile ? 1 : 3, py: isMobile ? 2 : 4 }}>
        {!weather.main ? (
          <Typography>No hay datos disponibles en este momento.</Typography>
        ) : (
          <>
            <WeatherHeader weather={weather} />
            <TemperatureInfo weather={weather} />
            <AtmosphericInfo weather={weather} />
            <WindInfo weather={weather} />
            <SunInfo weather={weather} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
