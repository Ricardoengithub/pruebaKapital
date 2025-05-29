import {
  Card,
  CardContent,
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

  return (
    <Card
      sx={{
        mt: 4,
        background,
        color: '#fff',
        borderRadius: 4,
        boxShadow: 6,
        overflow: 'hidden',
      }}
    >
      <CardContent>
        <WeatherHeader weather={weather} />
        <TemperatureInfo weather={weather} />
        <AtmosphericInfo weather={weather} />
        <WindInfo weather={weather} />
        <SunInfo weather={weather} />
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
