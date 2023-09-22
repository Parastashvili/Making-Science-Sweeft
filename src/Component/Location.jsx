import React, { useState, useEffect } from "react";
import axios from "axios";
import CountrySelector from "./CountrySelector";
import CountryInfo from "./CountryInfo";
import AirportList from "./AirportList";
import Geolocation from "./Geolocation";
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
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,currencies,region,subregion,continents,population,borders,flags"
      )
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
  }, []);
  const handleCountryChange = (selectedCountry) => {
    const updatedCountryData = {
      ...selectedCountry,
    };

    if (selectedCountry.currency) {
      const currencyCode = Object.keys(selectedCountry.currency)[0];
      const currencyInfo = selectedCountry.currency[currencyCode];

      if (currencyInfo) {
        updatedCountryData.currency = {
          name: currencyInfo.name,
          symbol: currencyInfo.symbol,
        };
      }
    }

    setUserCountryData(updatedCountryData);
  };

  return (
    <div>
      <Geolocation
        countries={countries}
        userCountryData={userCountryData}
        setUserCountryData={setUserCountryData}
      />
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
