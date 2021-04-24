import { createSelector } from "@reduxjs/toolkit";
import selectCurrentIndustry from "./selectCurrentIndustry";
import industryAmortizationPeriodJson from "../../data/industryAmortizationPeriod.json";

const selectAmortizationIndustry = createSelector(
  selectCurrentIndustry,
  ({ industryName }) => {
    const mappedAmortizationIndustry =
      industryAmortizationPeriodJson[industryName];

    return mappedAmortizationIndustry;
  },
);

export default selectAmortizationIndustry;
