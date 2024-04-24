import React, { createContext, useContext, useState } from 'react';

const HoursContext = createContext();

export const HoursProvider = ({ children }) => {
  const [hours, setHours] = useState(['09:00', '17:00']);

  return (
    <HoursContext.Provider value={{ hours, setHours }}>
      {children}
    </HoursContext.Provider>
  );
};

export const useHours = () => useContext(HoursContext);
