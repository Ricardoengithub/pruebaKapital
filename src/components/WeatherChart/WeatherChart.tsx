import React, { useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

type DataPoint = {
  date: string;
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  humidity_avg: number;
  wind_avg: number;
  pressure_avg: number;
  clouds_avg: number;
  rain_total: number;
};

type Props = {
  data: DataPoint[];
};

const WeatherChart: React.FC<Props> = ({ data }) => {
  const [metric, setMetric] = useState<
    'temperature' | 'humidity' | 'wind' | 'pressure' | 'clouds' | 'rain'
  >('temperature');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (_: any, newMetric: typeof metric) => {
    if (newMetric) setMetric(newMetric);
  };

  const renderLines = () => {
    switch (metric) {
      case 'temperature':
        return [
          <Line key="min" type="monotone" dataKey="temp_min" stroke="#8884d8" name="Temp. mínima" />,
          <Line key="max" type="monotone" dataKey="temp_max" stroke="#82ca9d" name="Temp. máxima" />,
          <Line key="avg" type="monotone" dataKey="temp_avg" stroke="#ff7300" name="Temp. promedio" />,
        ];
      case 'humidity':
        return [<Line key="hum" type="monotone" dataKey="humidity_avg" stroke="#8884d8" name="Humedad (%)" />];
      case 'wind':
        return [<Line key="wind" type="monotone" dataKey="wind_avg" stroke="#82ca9d" name="Viento (m/s)" />];
      case 'pressure':
        return [<Line key="pres" type="monotone" dataKey="pressure_avg" stroke="#ff7300" name="Presión (hPa)" />];
      case 'clouds':
        return [<Line key="clouds" type="monotone" dataKey="clouds_avg" stroke="#8884d8" name="Nubosidad (%)" />];
      case 'rain':
        return [<Line key="rain" type="monotone" dataKey="rain_total" stroke="#00aaff" name="Lluvia (mm)" />];
    }
  };

  return (
    <Box
      mt={5}
      sx={{
        px: isMobile ? 1 : 4,
        width: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        Datos históricos ({metric})
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <ToggleButtonGroup
          color="primary"
          value={metric}
          exclusive
          onChange={handleChange}
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <ToggleButton value="temperature" sx={{ whiteSpace: 'nowrap' }}>🌡️ Temperatura</ToggleButton>
          <ToggleButton value="humidity" sx={{ whiteSpace: 'nowrap' }}>💧 Humedad</ToggleButton>
          <ToggleButton value="wind" sx={{ whiteSpace: 'nowrap' }}>💨 Viento</ToggleButton>
          <ToggleButton value="pressure" sx={{ whiteSpace: 'nowrap' }}>📊 Presión</ToggleButton>
          <ToggleButton value="clouds" sx={{ whiteSpace: 'nowrap' }}>☁️ Nubes</ToggleButton>
          <ToggleButton value="rain" sx={{ whiteSpace: 'nowrap' }}>🌧️ Lluvia</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {renderLines()}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default WeatherChart;
