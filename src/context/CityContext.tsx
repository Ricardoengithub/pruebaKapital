import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { City } from '../types/weather';

type CityContextType = {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityContext;
