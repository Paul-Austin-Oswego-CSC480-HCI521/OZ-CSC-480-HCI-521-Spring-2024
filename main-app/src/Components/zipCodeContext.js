import React, { createContext, useState, useContext } from "react";

const ZipCodeContext = createContext();

export const ZipCodeProvider = ({ children }) => {
  const [zipCode, setZipCode] = useState("13126"); // Default ZIP code

  return (
    <ZipCodeContext.Provider value={{ zipCode, setZipCode }}>
      {children}
    </ZipCodeContext.Provider>
  );
};

// Custom hook to use the ZIP code context
export const useZipCode = () => useContext(ZipCodeContext);
