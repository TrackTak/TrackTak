import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";

export const millionModifier = 1.0e6;

const FormatRawNumberToMillion = ({ value, useCurrencySymbol, ...props }) => {
  const currencySymbol = useSelector(
    (state) => state.fundamentals.valuationCurrency
  );

  const newValue = value ? parseFloat(value) / millionModifier : undefined;

  return (
    <FormatRawNumber
      value={newValue}
      prefix={useCurrencySymbol ? currencySymbol : undefined}
      {...props}
    />
  );
};

export default FormatRawNumberToMillion;
