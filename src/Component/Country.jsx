import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const apiKey = import.meta.env.VITE_AIRPORTS_API_KEY;
function CountryWithAirports() {
  const { code3 } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allCountry, setAllCountry] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,currencies,region,subregion,continents,population,borders,flags"
      )
      .then((response) => {
        console.log("got");
        const countryList = response.data.map((country) => {
          const currencyCode = Object.keys(country.currencies)[0];
          const currencyInfo = country.currencies[currencyCode];
          const formattedCurrency = currencyInfo
            ? {
                name: currencyInfo.name,
                symbol: currencyInfo.symbol,
              }
            : null;
          return {
            name: country.name.common,
            nameOff: country.name.official,
            code: country.cca2,
            code3: country.cca3,
            capital: country.capital,
            currency: formattedCurrency,
            region: country.region,
            subregion: country.subregion,
            continent: country.continents,
            population: country.population,
            borders: country.borders,
            flag: country.flags.png,
          };
        });
        setAllCountry(countryList);
        setCountryData(countryList.find((c) => c.code3 === code3));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [code3]);
  useEffect(() => {
    if (countryData) {
      const AIRPORTS_URL = `https://api.api-ninjas.com/v1/airports?country=${countryData.code}`;
      const fetchData = async () => {
        try {
          const response = await axios.get(AIRPORTS_URL, {
            headers: {
              "X-Api-Key": apiKey,
            },
          });
          setAirports(response.data.filter((entry) => entry.iata !== ""));
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, [countryData, apiKey]);
  const handleCountryChange = (e) => {
    const selectedCountryName = e.target.value;
    const selectedCountryData = allCountry.find(
      (country) => country.name === selectedCountryName
    );
    console.log(selectedCountryData);
    if (selectedCountryData) {
      setSelectedCountry(selectedCountryData.name);
      navigate(`/${selectedCountryData.code3}`);
    } else {
      console.log("Country not found");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const borderCountries = allCountry
    .filter((country) => countryData.borders.includes(country.code3))
    .map((country) => country.name)
    .sort()
    .join(", ");
  const formattedNumber = countryData.population.toLocaleString();
  const continent = countryData.continent
    .map((e) => e.trim())
    .filter((e) => e !== "")
    .join(", ");
  return (
    <div>
      <div>
        <label>Select your country:</label>
        <select
          id="countrySelect"
          default={"Georgia"}
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">Select a country</option>
          {allCountry.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h1>{countryData.nameOff}</h1>
        <img src={countryData.flag} alt="country flag" />
      </div>
      <p>Capital: {countryData.capital}</p>
      <p>Continent: {continent}</p>
      <p>
        Currency:{" "}
        {countryData.currency
          ? `${countryData.currency.name} (${countryData.currency.symbol})`
          : "N/A"}
      </p>
      <p>Population: {formattedNumber}</p>
      <p>
        Region: {countryData.region}, {countryData.subregion}
      </p>
      <p>Borders: {borderCountries}</p>
      {airports.length > 0 ? (
        <div>
          <h2>Airports</h2>
          <ul>
            {airports.map((airport, index) => (
              <li key={index}>
                {airport.iata} - {airport.name} ({airport.city})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>There are no airports in this country</p>
      )}
    </div>
  );
}
export default CountryWithAirports;
