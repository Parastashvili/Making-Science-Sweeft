import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
export default function CurrencyAndAirport({ value, setValue }) {
  return (
    <div>
      <Box sx={{ width: "50%", m: "auto" }} style={{ scale: "1.3" }}>
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
    </div>
  );
}
