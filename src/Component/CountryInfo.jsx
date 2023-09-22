import React from "react";

function CountryInfo({ userCountryData }) {
  return (
    <div>
      <p>
        {userCountryData.nameOff}
        <img src={userCountryData.flag} alt="country flag" />
      </p>
      <div>
        <p>Capital: {userCountryData.capital}</p>
        <p>
          Currency:{" "}
          {userCountryData.currency
            ? `${userCountryData.currency.name} ${userCountryData.currency.symbol}`
            : "N/A"}
        </p>
        <p>Region: {userCountryData.region}</p>
      </div>
      <div>
        <p>Continent: {userCountryData.continent}</p>
        <p>Population: {userCountryData.population}</p>
        <p>Borders: {userCountryData.borders}</p>
      </div>
    </div>
  );
}

export default CountryInfo;
