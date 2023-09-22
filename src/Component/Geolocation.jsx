import { useEffect } from "react";
import axios from "axios";

function Geolocation({ setUserCountry, setUserCountryCode }) {
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAuLUgCrkoCCLmC-JkYNF9YdE_iYg745do`
              );
              const countryData = response.data.results.find((result) =>
                result.types.includes("country")
              );
              if (countryData) {
                setUserCountry(countryData.formatted_address);
                setUserCountryCode(
                  countryData.address_components[0]?.short_name || null
                );
              } else {
                setUserCountry("country data not found");
              }
            } catch (error) {
              console.error("error:", error);
              setUserCountry("error fetching country data");
            }
          },
          () => {
            console.error("location error");
            setUserCountry("");
          }
        );
      } else {
        console.error("not available");
        setUserCountry("");
      }
    };

    getLocation();
  }, [setUserCountry, setUserCountryCode]);

  return null;
}

export default Geolocation;
