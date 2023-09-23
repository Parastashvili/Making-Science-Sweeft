import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CountryInfo from "./CountryInfo";
import Airports from "./Airports";
import Search from "./Search";
import CurrencyAndAirport from "./CurrencyAndAirport";
const apiKey = import.meta.env.VITE_AIRPORTS_API_KEY;
export default function Wrapper({ country, setCountry }) {
  const { code3 } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allCountry, setAllCountry] = useState([]);
  const [airports, setAirports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [found, setFound] = useState(true);
  const [value, setValue] = useState(0);
  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,currencies,region,subregion,continents,population,borders,flags"
      )
      .then((response) => {
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
        setCountry(countryList.find((c) => c.code3 === code3).name);
        setCountryData(countryList.find((c) => c.code3 === code3));
        setFound(false);
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
          setIsLoading(false);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }
  }, [countryData, apiKey]);
  if (found) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "red",
          height: "100vh",
        }}
      >
        Country not found try again
      </div>
    );
  }
  return (
    <Outer>
      <Search
        allCountry={allCountry}
        country={country}
        setIsLoading={setIsLoading}
        setCountry={setCountry}
        setValue={setValue}
      />
      <CountryInfo countryData={countryData} allCountry={allCountry} />
      <div>
        <ul>
          <CurrencyAndAirport value={value} setValue={setValue} />
          <Airports airports={airports} value={value} isLoading={isLoading} />
        </ul>
      </div>
    </Outer>
  );
}
const Outer = styled.div`
  max-width: 1200px;
  margin: auto;
  border: 1px solid #0000001e;
  border-radius: 5px;
  line-height: 1;
  padding: 30px;
  p {
    margin: 0px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
    row-gap: 20px;
  }
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
  .sectionHeader {
    font-family: "Roboto", sans-serif;
    font-size: 34px;
    font-weight: 500;
  }
  ul {
    padding: 20px;
    border-radius: 5px;
    margin: 30px 0;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.12),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);
  }
`;
