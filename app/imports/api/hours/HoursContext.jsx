import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const HoursContext = createContext();

export const HoursProvider = ({ children }) => {
  const [hours, setHours] = useState(['09:00', '17:00']);

  const value = useMemo(() => ({ hours, setHours }), [hours, setHours]);

  return (
    <HoursContext.Provider value={value}>
      {children}
    </HoursContext.Provider>
  );
};

HoursProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useHours = () => useContext(HoursContext);
