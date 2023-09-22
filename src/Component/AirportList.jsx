import React, { useState, useEffect } from "react";
import axios from "axios";

function AirportList({ countryCode }) {
  const [airports, setAirports] = useState([]);
  //gets airports if country code is correct and is not empty string
  if (countryCode != "") {
    useEffect(() => {
      const AIRPORTS_URL = `https://api.api-ninjas.com/v1/airports?country=${countryCode}`;
      const API_KEY = "f9sgzo0a+YJ17NbUkdo/9g==Uf9CkVrxHy39Fdvn";
      const fetchData = async () => {
        try {
          const response = await axios.get(AIRPORTS_URL, {
            headers: {
              "X-Api-Key": API_KEY,
            },
          });
          setAirports(response.data.filter((entry) => entry.iata !== ""));
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchData();
    }, [countryCode]);
  }
  return (
    <div>
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
        <p>There is no airports in this country</p>
      )}
    </div>
  );
}
export default AirportList;
