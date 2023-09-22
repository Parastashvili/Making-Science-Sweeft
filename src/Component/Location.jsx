import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySelector from "./CountrySelector";
import CountryInfo from "./CountryInfo";
import AirportList from "./AirportList";
function Location() {
  const [userCountryData, setUserCountryData] = useState({
    name: "",
    code: null,
    capital: "",
    currency: {
      name: "",
      symbol: "",
    },
    region: "",
    continent: "",
    population: "",
    borders: "",
    flag: "",
  });
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
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
                const countryName = countryData.address_components.find(
                  (component) => component.types.includes("country")
                ).long_name;
                setUserCountryData({ ...userCountryData, name: countryName });
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
    axios
      .get(
        "https://restcountries.com/v3.1/all"
      )
      // ?fields=name,cca2,capital,currencies,region,subregion,continents,population,borders,flags
      .then((response) => {
        const countryList = response.data.map((country) => ({
          name: country.name.common,
          nameOff: country.name.official,
          code: country.cca2,
          code3: country.cca3,
          capital: country.capital,
          currency: country.currencies,
          region: country.region,
          subregion: country.subregion,
          continent: country.continents,
          population: country.population,
          borders: country.borders,
          flag: country.flags.png,
        }));
        setCountries(countryList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleCountryChange = (selectedCountry) => {
    if (selectedCountry) {
      setUserCountryData({
        ...selectedCountry,
        currency: {
          name: selectedCountry.currency[
            Object.keys(selectedCountry.currency)[0]
          ].name,
          symbol:
            selectedCountry.currency[Object.keys(selectedCountry.currency)[0]]
              .symbol,
        },
      });
    } else {
      setUserCountryData({
        ...userCountryData,
        name: "",
        code: null,
      });
    }
  };
  return (
    <div>
      <CountrySelector
        userCountryData={userCountryData}
        countries={countries}
        onCountryChange={handleCountryChange}
      />
      <CountryInfo userCountryData={userCountryData} countries={countries} />
      <AirportList countryCode={userCountryData.code} />
    </div>
  );
}
export default Location;
