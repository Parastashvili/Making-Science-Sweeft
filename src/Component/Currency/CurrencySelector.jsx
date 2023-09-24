import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function CurrencySelector({
  allCountry,
  curCountry,
  handleChange,
  countryData,
}) {
  return (
    <FormControl
      style={{ margin: "20px 0 30px 0" }}
      variant="standard"
      sx={{ m: 1, minWidth: 120 }}
    >
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={curCountry != "" ? curCountry : countryData.name}
        onChange={handleChange}
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
  );
}

export default CurrencySelector;
