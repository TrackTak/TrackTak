import React from "react";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import FormatInputToMillion from "./FormatInputToMillion";
import FormatRawNumber from "./FormatRawNumber";
import FormatInputToNumber from "./FormatInputToNumber";

export const TableMillionFormatter = (props) => (
  <FormatRawNumberToMillion decimalScale={2} {...props} />
);

export const TableInputMillionCurrencyFormatter = (props) => (
  <FormatInputToMillion useCurrencySymbol decimalScale={2} {...props} />
);

export const TableInputNumberFormatter = (props) => (
  <FormatInputToNumber decimalScale={2} {...props} />
);

export const TableNumberFormatter = (props) => (
  <FormatRawNumber decimalScale={2} {...props} />
);
