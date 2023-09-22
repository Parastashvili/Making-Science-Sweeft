import React, { useState, useEffect } from "react";
import axios from "axios";

function Location() {
  const [userCountry, setUserCountry] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAuLUgCrkoCCLmC-JkYNF9YdE_iYg745do`
            );
            const countryData = response.data.results.find((result) =>
              result.types.includes("country")
            );
            if (countryData) {
              setUserCountry(countryData.formatted_address);
            } else {
              setUserCountry("We are unable to find your country");
            }
          } catch (error) {
            console.error("Error:", error);
            setUserCountry("");
          }
        });
      } else {
        console.error("Error");
        setUserCountry("");
      }
    };

    // get list of countries
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    getLocation();
  }, []);

  // dropdown countries menu handler
  const handleCountryChange = (event) => {
    setUserCountry(event.target.value);
  };

  return (
    <div>
      {userCountry && (
        <div>
          <h2>Your Country</h2>
          <p>{userCountry}</p>
        </div>
      )}
      <label htmlFor="countrySelect">Select your country:</label>
      <select
        id="countrySelect"
        value={userCountry}
        onChange={handleCountryChange}
      >
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Location;
