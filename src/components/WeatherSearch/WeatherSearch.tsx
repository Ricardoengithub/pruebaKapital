import React, { useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress, Box } from '@mui/material';
import { useCitySearch } from '../../hooks/useCitySearch';
import type { City } from '../../types/weather';
import { useCity } from '../../context/CityContext';

type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

const WeatherSearch: React.FC<Props> = ({ inputValue, setInputValue }) => {
  console.log(inputValue, "==========")
  const { selectedCity, setSelectedCity } = useCity();
  const { data: cities = [], isLoading } = useCitySearch(inputValue);

  const selectedOption =
  cities.find(
    (c) =>
      `${c.name}${c.state ? ', ' + c.state : ''}, ${c.country}`.toLowerCase() ===
      inputValue.toLowerCase()
  ) || selectedCity || null;

  const handleCityChange = (_: any, newValue: City | null) => {
    setSelectedCity(newValue);
    if (newValue) {
      const newText = `${newValue.name}${newValue.state ? ', ' + newValue.state : ''}, ${newValue.country}`;
      setInputValue(newText);
    } else {
      setInputValue('');
    }
  };

  return (
    <Box sx={{ width: 400, margin: '40px auto' }}>
      <Autocomplete
        options={cities}
        getOptionLabel={(option) =>
          `${option.name}${option.state ? ', ' + option.state : ''}, ${option.country}`
        }
        loading={isLoading}
        value={selectedOption}
        onChange={handleCityChange}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
          // No limpies de inmediato el selectedCity — espera a que el usuario lo confirme con onChange
        }}
        disableClearable={false}
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
