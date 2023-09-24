import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelector from "./CurrencySelector";
import CurrencyConverter from "./CurrencyConverter";

export default function CurrencyWrapper({ allCountry, countryData }) {
  const [curCountry, setCurCountry] = useState("");
  const [convert, setConvert] = useState("");
  const [convertToCode, setConvertToCode] = useState("");
  const [convertValue, setConvertValue] = useState(0);
  const [conversionRate, setConversionRate] = useState(null);

  useEffect(() => {
    const requestURL = `https://api.exchangerate.host/convert?from=${
      countryData.currency && countryData.currency.code
    }&to=${
      convertToCode || (countryData.currency && countryData.currency.code)
    }`;
    axios
      .get(requestURL)
      .then((response) => {
        setConversionRate(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [countryData, curCountry]);

  const handleChange = (event) => {
    setCurCountry(event.target.value);
    const selectedCountryData = allCountry.find(
      (country) => country.name === event.target.value
    );
    if (selectedCountryData.currency) {
      setConvert(selectedCountryData.currency.symbol);
      setConvertToCode(selectedCountryData.currency.code);
    } else {
      console.log("Country not found");
    }
  };

  const onInputChange = (e) => {
    setConvertValue(e.target.value);
  };

  return (
    <div>
      <h2 className="sectionHeader">Currency Exchange</h2>
      <CurrencySelector
        allCountry={allCountry}
        curCountry={curCountry}
        handleChange={handleChange}
        countryData={countryData}
      />
      <CurrencyConverter
        convertValue={convertValue}
        conversionRate={conversionRate}
        convert={convert}
        countryData={countryData}
        onInputChange={onInputChange}
      />
    </div>
  );
}
