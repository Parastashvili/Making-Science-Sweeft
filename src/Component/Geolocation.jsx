import { useEffect } from "react";
import axios from "axios";
function LocationGeolocation({ setUserCountryData }) {
  let userCountryCode = "";
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAuLUgCrkoCCLmC-JkYNF9YdE_iYg745do`
            );
            if (response.data.status === "OK") {
              const countryData = response.data.results.find((result) =>
                result.types.includes("country")
              );
              if (countryData) {
                userCountryCode = countryData.address_components.find(
                  (component) => component.types.includes("country")
                ).short_name;
              } else {
                console.error("Country data not found in geocoding response");
              }
            } else {
              console.error(
                "Geocoding API request failed with status:",
                response.data.status
              );
            }
          } catch (error) {
            console.error("Error fetching geolocation data:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      console.error("Geolocation not available");
    }
  }, [setUserCountryData]);
  return null;
}

export default LocationGeolocation;
