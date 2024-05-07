import React, { createContext, useState, useContext, useEffect } from "react";

const ZipCodeContext = createContext();

export const ZipCodeProvider = ({ children }) => {
  const [zipCode, setZipCode] = useState(null); // Start with null or a suitable default
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    setLoading(true); // Start loading
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const accessToken =
            "pk.eyJ1IjoiaGpyb3NlMjkiLCJhIjoiY2x1MGFmbzNmMDJxYTJrbnAyY3J6MWN1NiJ9.T_K7aTjSSiqtAIeRbL5Msw";
          const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}&types=postcode`;

          try {
            const response = await fetch(url);
            const data = await response.json();
            const postCodeFeature = data.features.find((feature) =>
              feature.place_type.includes("postcode")
            );
            if (postCodeFeature) {
              setZipCode(postCodeFeature.text);
            } else {
              setZipCode("Default Zip Code"); // Set a default or previous valid zip code
            }
            setLoading(false); // End loading
          } catch (error) {
            console.error("Failed to fetch zip code", error);
            setLoading(false); // Ensure loading is false on error
          }
        },
        (error) => {
          console.error("Error obtaining location", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  return (
    <ZipCodeContext.Provider value={{ zipCode, setZipCode }}>
      {children}
    </ZipCodeContext.Provider>
  );
};

// Custom hook to use the ZIP code context
export const useZipCode = () => useContext(ZipCodeContext);
