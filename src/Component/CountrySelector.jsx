import React from "react";

function CountrySelector({ userCountryData, countries, onCountryChange }) {
  const handleSelectChange = (event) => {
    const selectedCountryName = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.name === selectedCountryName
    );
    onCountryChange(selectedCountry);
  };
  return (
    <div>
      <label>Select your country:</label>
      <select
        id="countrySelect"
        value={userCountryData.name}
        onChange={handleSelectChange}
      >
        {countries.map((country, index) => (
          <option key={index} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CountrySelector;
