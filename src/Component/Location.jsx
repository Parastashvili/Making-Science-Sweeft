import React, { useState } from "react";
import Geolocation from "./Geolocation";
import CountryList from "./CountryList";
import AirportList from "./AirportList";

function Location() {
  const [userCountry, setUserCountry] = useState("Selecting your country...");
  const [userCountryCode, setUserCountryCode] = useState("GE");
  const [countries, setCountries] = useState([]);

  // choose country
  const handleCountryChange = (event) => {
    const selectedCountryName = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.name === selectedCountryName
    );
    if (selectedCountry) {
      setUserCountry(selectedCountry.name);
      setUserCountryCode(selectedCountry.code);
    } else {
      setUserCountry(selectedCountryName);
      setUserCountryCode(null);
    }
  };

  return (
    <div>
      <div>
        <h2>Your Country</h2>
        <p>{userCountry}</p>
      </div>
      <label htmlFor="countrySelect">Select your country:</label>
      <select
        id="countrySelect"
        value={userCountry}
        onChange={handleCountryChange}
      >
        {countries.map((country, index) => (
          <option key={index} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      <Geolocation
        setUserCountry={setUserCountry}
        setUserCountryCode={setUserCountryCode}
      />
      <CountryList
        setCountries={setCountries}
        setUserCountry={setUserCountry}
      />
      <AirportList countryCode={userCountryCode} />
    </div>
  );
}

export default Location;
