import React from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
export default function Search({
  allCountry,
  country,
  setIsLoading,
  setCountry,
  setValue,
}) {
  const navigate = useNavigate();
  const handleCountryChange = (e) => {
    const selectedCountryName = e.target.value;
    const selectedCountryData = allCountry.find(
      (country) => country.name === selectedCountryName
    );
    if (selectedCountryData) {
      setCountry(selectedCountryData.name);
      navigate(`/${selectedCountryData.code3}`);
      setIsLoading(true);
      setValue(0);
    } else {
      console.log("Country not found");
    }
  };
  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            onChange={handleCountryChange}
            MenuProps={{
              PaperProps: {
                style: { maxHeight: "300px" },
              },
            }}
          >
            {allCountry.map((country, index) => (
              <MenuItem key={index} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}
