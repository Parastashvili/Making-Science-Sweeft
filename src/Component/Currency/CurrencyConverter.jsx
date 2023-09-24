import React from "react";
import NumericField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import DragHandleIcon from "@mui/icons-material/DragHandle";

function CurrencyConverter({
  convertValue,
  conversionRate,
  convert,
  countryData,
  onInputChange,
}) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <NumericField
        fullWidth
        id="standard-number"
        type="number"
        onInput={onInputChange}
        placeholder={"0"}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {countryData.currency && countryData.currency.symbol}
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <DragHandleIcon />
      <NumericField
        disabled
        fullWidth
        id="standard-number"
        type="number"
        value={(convertValue * conversionRate).toFixed(2)}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {convert !== ""
                ? convert
                : countryData.currency && countryData.currency.symbol}
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </div>
  );
}

export default CurrencyConverter;
