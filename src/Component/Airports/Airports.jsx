import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Airports({ airports, isLoading }) {
  const [filter, setFilter] = useState("");
  const [filteredAirports, setFilteredAirports] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const filtered = airports.filter((airport) =>
        airport.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredAirports(filtered);
    }
  }, [filter, airports, isLoading]);

  return (
    <div>
      <>
        <h2 className="sectionHeader">Airports</h2>
        {isLoading ? (
          <div className="grid">
            {Array.from({ length: 4 }, (_, index) => (
              <Box key={index} sx={{ width: 340 }}>
                <Skeleton height={30} animation="wave" />
              </Box>
            ))}
          </div>
        ) : (
          <>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  m: "0 0 20px 0",
                  width: "200px",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="standard-multiline-flexible"
                  label="Search for airport"
                  variant="standard"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </Box>
            <div className="grid">
              {filteredAirports.length > 0 ? (
                filteredAirports.map((airport, index) => (
                  <div key={index}>
                    {airport.iata} - {airport.name} ({airport.city})
                  </div>
                ))
              ) : (
                <p>There are no airports is this country</p>
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
}
