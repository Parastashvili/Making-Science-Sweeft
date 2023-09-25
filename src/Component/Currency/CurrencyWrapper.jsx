import React, { useState } from "react";
import { useQuery } from "react-query";
import CurrencySelector from "./CurrencySelector";
import CurrencyConverter from "./CurrencyConverter";
import axios from "axios";


const fetchConversionRate = async (fromCurrency, toCurrency) => {
  const requestURL = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`;
  const response = await axios.get(requestURL);
  return response.data.result;
};

export default function CurrencyWrapper({ allCountry, countryData }) {
  const [curCountry, setCurCountry] = useState("");
  const [convert, setConvert] = useState("");
  const [convertToCode, setConvertToCode] = useState("");
  const [convertValue, setConvertValue] = useState(0);

  const { data: conversionRate } = useQuery(
    ["conversionRate", countryData.currency?.code, convertToCode],
    () => fetchConversionRate(countryData.currency?.code, convertToCode),
    {
      enabled: !!countryData.currency?.code && !!convertToCode,
    }
  );

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
