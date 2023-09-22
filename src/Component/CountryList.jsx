import { useEffect } from "react";
import axios from "axios";

function CountryList({ setCountries, setUserCountry }) {
  useEffect(() => {
    // get list of countries
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryList = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2 || null,
        }));
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error:", error);
        setUserCountry("Error fetching country list");
      });
  }, [setCountries, setUserCountry]);

  return null; 
}

export default CountryList;
