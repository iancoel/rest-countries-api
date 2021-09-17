import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [preferencesName, setPreferencesName] = React.useState(null);
  const [preferencesRegion, setPreferencesRegion] = React.useState(null);

  return (
    <GlobalContext.Provider
      value={{
        preferencesName,
        setPreferencesName,
        preferencesRegion,
        setPreferencesRegion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
