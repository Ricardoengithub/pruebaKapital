import React, { useState } from 'react';
import { Autocomplete, TextField, CircularProgress, Box } from '@mui/material';
import { useCitySearch } from '../../hooks/useCitySearch';
import type { City } from '../../types/weather';
import { useCity } from '../../context/CityContext';

const WeatherSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { setSelectedCity } = useCity();
  const { data: cities = [], isLoading } = useCitySearch(inputValue);

  const handleCityChange = (_: any, newValue: City | null) => {
    setSelectedCity(newValue);
  };

  return (
    <Box sx={{ width: 400, margin: '40px auto' }}>
      <Autocomplete
        options={cities}
        getOptionLabel={(option) =>
          `${option.name}${option.state ? ', ' + option.state : ''}, ${option.country}`
        }
        loading={isLoading}
        onChange={handleCityChange}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar ciudad"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        noOptionsText="No se encontraron ciudades"
      />
    </Box>
  );
};

export default WeatherSearch;