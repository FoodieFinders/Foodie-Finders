
import React, { useState, useContext, createContext } from 'react';

// Define context for useHours
const HoursContext = createContext();

// Custom hook to consume the hours context
export const useHours = () => useContext(HoursContext);

// Context provider component to wrap components and provide access to hours state
export const HoursProvider = ({ children }) => {
  const [hours, setHours] = useState(null);

  return (
    <HoursContext.Provider value={{ hours, setHours }}>
      {children}
    </HoursContext.Provider>
  );
};
