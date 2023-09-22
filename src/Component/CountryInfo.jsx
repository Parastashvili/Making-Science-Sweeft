import React from "react";

function CountryInfo({ userCountryData, countries }) {
  let matchingCountryNames = "";
  try {
    matchingCountryNames = countries
      .filter((country) => userCountryData.borders.includes(country.code3))
      .map((country) => country.name)
      .sort()
      .join(", ");
  } catch (error) {
    console.error("Error:", error);
  }

  const formattedNumber = userCountryData.population.toLocaleString();
  return (
    <div>
      <p>
        {userCountryData.nameOff}
        <img src={userCountryData.flag} alt="country flag" />
      </p>
      <p>Capital: {userCountryData.capital}</p>
      <p>Continent: {userCountryData.continent}</p>
      <p>
        Currency:{" "}
        {userCountryData.currency
          ? `${userCountryData.currency.name} (${userCountryData.currency.symbol})`
          : "N/A"}
      </p>
      <p>Population: {formattedNumber}</p>
      <p>
        Region: {userCountryData.region}, {userCountryData.subregion}
      </p>
      <p>Borders: {matchingCountryNames}</p>
    </div>
  );
}

export default CountryInfo;
