import { useEffect, useState } from "react";
import axios from "axios";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
import { useNavigate } from "react-router-dom";
export default function UserDirect({ setCountry }) {
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            if (response.data.status === "OK") {
              const countryData = response.data.results.find((result) =>
                result.types.includes("country")
              );
              if (countryData) {
                const userCountry = countryData.address_components.find(
                  (component) => component.types.includes("country")
                ).short_name;
                setUserCode(userCountry);
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
  }, []);

  useEffect(() => {
    if (userCode) {
      axios
        .get("https://restcountries.com/v3.1/all?fields=name,cca2,cca3")
        .then((response) => {
          const countryList = response.data.map((country) => {
            return {
              name: country.name.common,
              code: country.cca2,
              code3: country.cca3,
            };
          });
          const selectedCountryData = countryList.find(
            (country) => country.code === userCode
          );
          if (selectedCountryData) {
            setCountry(selectedCountryData.name);
            navigate(`/${selectedCountryData.code3}`);
          } else {
            console.log("Country not found");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [userCode]);
  return null;
}
