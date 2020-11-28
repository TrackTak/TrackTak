import React, { forwardRef } from "react";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";

const FormatInputToCurrency = forwardRef(({ defaultValue, ...props }, ref) => {
  const { onChange, ...other } = props;
  const [valueAsNumber, setValue] = useState();
  const currencySymbol = useSelector(
    (state) => state.fundamentals.data.General.CurrencySymbol
  );

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      defaultValue={defaultValue}
      onBlur={(e) => {
        props.onBlur(valueAsNumber, e);
      }}
      onValueChange={(values) => {
        setValue(values.floatValue);
        onChange({
          target: {
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator
      prefix={currencySymbol}
    />
  );
});

export default FormatInputToCurrency;
