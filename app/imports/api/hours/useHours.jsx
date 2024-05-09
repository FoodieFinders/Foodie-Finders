import React, { useState, useContext, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const HoursContext = createContext();

export const useHours = () => useContext(HoursContext);

export const HoursProvider = ({ children }) => {
  const [hours, setHours] = useState(null);

  const value = useMemo(() => ({ hours, setHours }), [hours]);

  return (
    <HoursContext.Provider value={value}>
      {children}
    </HoursContext.Provider>
  );
};

HoursProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
