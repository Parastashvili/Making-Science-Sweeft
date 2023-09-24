import React from "react";
import styled from "styled-components";

export default function CountryInfo({ countryData, allCountry }) {
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
    <InfoWrapper>
      <div className="nameandflag">
        <h1 className="countryName">{countryData.nameOff}</h1>
        <img className="flag" src={countryData.flag} alt="country flag" />
      </div>
      <div className="grid">
        <span className="info">
          <Name>Capital:</Name>
          <Dsc>{countryData.capital}</Dsc>
        </span>
        <span className="info">
          <Name>Continent:</Name>
          <Dsc>{continent}</Dsc>
        </span>
        <span className="info">
          <Name>Currency:</Name>
          <Dsc>
            {countryData.currency
              ? `${countryData.currency.name} (${countryData.currency.symbol})`
              : null}
          </Dsc>
        </span>
        <span className="info">
          <Name>Population:</Name>
          <Dsc>{formattedNumber}</Dsc>
        </span>
        <span className="info">
          <Name>Region:</Name>
          <Dsc>
            {countryData.region}, {countryData.subregion}
          </Dsc>
        </span>
        <span className="info">
          <Name>Borders:</Name>
          <Dsc>{borderCountries}</Dsc>
        </span>
      </div>
    </InfoWrapper>
  );
}
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
