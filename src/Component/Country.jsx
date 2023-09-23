import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import styled from "styled-components";
const apiKey = import.meta.env.VITE_AIRPORTS_API_KEY;
function Country({ country, setCountry }) {
  const { code3 } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allCountry, setAllCountry] = useState([]);
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
    if (selectedCountryData) {
      setCountry(selectedCountryData.name);
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
    <Outer>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            onChange={handleCountryChange}
          >
            {allCountry.map((country, index) => (
              <MenuItem key={index} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <InfoWrapper>
        <div className="nameandflag">
          <h1 className="countryName">{countryData.nameOff}</h1>
          <img className="flag" src={countryData.flag} alt="country flag" />
        </div>
        <div className="grid">
          <p className="info">
            <Name>Capital:</Name>
            <Dsc>{countryData.capital}</Dsc>
          </p>
          <p className="info">
            <Name>Continent:</Name>
            <Dsc>{continent}</Dsc>
          </p>
          <p className="info">
            <Name>Currency:</Name>
            <Dsc>
              {countryData.currency
                ? `${countryData.currency.name} (${countryData.currency.symbol})`
                : "N/A"}
            </Dsc>
          </p>
          <p className="info">
            <Name>Population:</Name>
            <Dsc>{formattedNumber}</Dsc>
          </p>
          <p className="info">
            <Name>Region:</Name>
            <Dsc>
              {countryData.region}, {countryData.subregion}
            </Dsc>
          </p>
          <p className="info">
            <Name>Borders:</Name>
            <Dsc>{borderCountries}</Dsc>
          </p>
        </div>
      </InfoWrapper>
      <div>
        <ul>
          <Box sx={{ width: 250 }}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                label="Currency"
                icon={<CurrencyExchangeIcon />}
              />
              <BottomNavigationAction
                label="Airports"
                icon={<AirplanemodeActiveIcon />}
              />
            </BottomNavigation>
          </Box>
          {value === 1 ? (
            <>
              <h2 className="sectionHeader">Airports</h2>
              <div className="grid">
                {airports.length > 0 ? (
                  airports.map((airport, index) => (
                    <Dsc key={index}>
                      {airport.iata} - {airport.name} ({airport.city})
                    </Dsc>
                  ))
                ) : (
                  <p>There are no airports in this country</p>
                )}
              </div>
            </>
          ) : (
            <div>
              <h2 className="sectionHeader">Currency Exchange</h2>
              <p>currency not availabe working on it :D </p>
            </div>
          )}
        </ul>
      </div>
    </Outer>
  );
}
export default Country;
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
`;
const InfoWrapper = styled.div`
  padding: 20px;
  border-radius: 5px;
  margin: 30px 0;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.12),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);
  .nameandflag {
    display: flex;
    align-items: center;
    gap: 20px;
    .countryName {
      font-family: "Roboto", sans-serif;
    }
    .flag {
      width: 45px;
      height: 30px;
    }
  }

  .info {
    display: flex;
  }
`;

const Name = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 16px;
  min-width: 120px;
  line-height: 20px;
`;
const Dsc = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 16px;
  margin-left: 10px;
  line-height: 20px;
`;
