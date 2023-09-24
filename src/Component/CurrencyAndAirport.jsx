import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Airports from "./Airports";
import CurrencyWrapper from "./Currency/CurrencyWrapper";

export default function CurrencyAndAirport({
  value,
  setValue,
  airports,
  isLoading,
  allCountry,
  countryData,
}) {
  const handleNavigationChange = (event, newValue) => {
    const currentPath = window.location.pathname;
    if (newValue === 1 && !currentPath.includes("/airports")) {
      const newPath = currentPath + "/airports";
      window.history.pushState({}, "", newPath);
    } else if (newValue === 0 && currentPath.includes("/airports")) {
      const newPath = currentPath.replace("/airports", "");
      window.history.pushState({}, "", newPath);
    }
    setValue(newValue);
  };
  
  return (
    <div>
      {" "}
      <Box sx={{ width: "50%", m: "auto" }} style={{ scale: "1.3" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={handleNavigationChange}
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
      <div>
        {value === 0 && (
          <CurrencyWrapper allCountry={allCountry} countryData={countryData} />
        )}
        {value === 1 && <Airports airports={airports} isLoading={isLoading} />}
      </div>
    </div>
  );
}
