import React, { createContext, useState, useContext, useEffect } from "react";

const ZipCodeContext = createContext();

export const ZipCodeProvider = ({ children }) => {
  const [zipCode, setZipCode] = useState("11225"); // Default ZIP code

  useEffect(() => {
    const fetchZipCodeFromLocation = async () => {
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
              // Filter through the results to find a feature that includes a postcode
              const postCodeFeature = data.features.find((feature) =>
                feature.place_type.includes("postcode")
              );
              if (postCodeFeature) {
                setZipCode(postCodeFeature.text); // Assumes the postcode is stored in the `text` field
              }
            } catch (error) {
              console.error("Failed to fetch zip code", error);
            }
          },
          (error) => {
            console.error("Error obtaining location", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchZipCodeFromLocation();
  }, []);

  return (
    <ZipCodeContext.Provider value={{ zipCode, setZipCode }}>
      {children}
    </ZipCodeContext.Provider>
  );
};

// Custom hook to use the ZIP code context
export const useZipCode = () => useContext(ZipCodeContext);
