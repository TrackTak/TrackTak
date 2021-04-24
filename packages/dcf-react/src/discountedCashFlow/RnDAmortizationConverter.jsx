import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CompanyHeading from "../components/CompanyHeading";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import SubSection from "../components/SubSection";
import { Box, TextField, Typography, useTheme } from "@material-ui/core";
import { textFieldRootStyles } from "../shared/utils";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import getSymbolFromCurrency from "currency-symbol-map";
import TTTable from "../components/TTTable";
import useSetURLInput from "../hooks/useSetURLInput";
import selectAmortizationIndustry from "../selectors/fundamentalSelectors/selectAmortizationIndustry";
import FormatInputToYear from "../components/FormatInputToYear";
import { useState } from "react";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import selectYearlyIncomeStatements from "../selectors/fundamentalSelectors/selectYearlyIncomeStatements";
import FormatRawNumber from "../components/FormatRawNumber";
import BoldValueLabel from "../components/BoldValueLabel";

const amortizationIndustryColumns = [
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "R&D Expenses (mln)",
    accessor: "rnDExpenses",
  },
  {
    Header: "Unamortized Portion",
    accessor: "unamortizedPortion",
  },
  {
    Header: "Unamortized Value (mln)",
    accessor: "unamortizedValue",
  },
  {
    Header: "Amortization this year (mln)",
    accessor: "amortizationThisYear",
  },
];

const RnDAmortizationTextField = (props) => (
  <TextField
    {...props}
    sx={{
      ...textFieldRootStyles,
      "& .MuiFormHelperText-root": {
        marginLeft: 0,
      },
    }}
  />
);

const RnDAmortizationConverter = () => {
  const theme = useTheme();
  const setURLInput = useSetURLInput();
  const currentIndustry = useSelector(selectCurrentIndustry);
  const incomeStatements = useSelector(selectYearlyIncomeStatements);
  const incomeStatementsArray = Object.values(incomeStatements);
  const initialAmortizationPeriod = useSelector(selectAmortizationIndustry)
    .amortizationPeriod;
  const [amortizationPeriod, setAmortizationPeriod] = useState(
    initialAmortizationPeriod,
  );
  const [dataRow, setDataRow] = useState([]);
  const [sumValueOfResearchAsset, setSumValueOfResearchAsset] = useState(0);
  const [
    sumAmortizationOfResearchAssetForCurrentYear,
    setSumAmortizationOfResearchAssetForCurrentYear,
  ] = useState(0);

  const currencyCode = useSelector(
    (state) => state.fundamentals.incomeStatement.currencyCode,
  );
  const currencySymbol = getSymbolFromCurrency(currencyCode);
  const adjustmentToOperatingIncome =
    incomeStatementsArray[0].researchDevelopment -
    sumAmortizationOfResearchAssetForCurrentYear;

  useEffect(() => {
    setAmortizationPeriod(initialAmortizationPeriod);
  }, [initialAmortizationPeriod]);

  useEffect(() => {
    const dataRow = [];
    const unamortizedPortionSlice = 1 / amortizationPeriod;
    let sumValueOfResearchAsset = 0;
    let sumAmortizationOfResearchAssetForCurrentYear = 0;

    for (let i = 0; i <= amortizationPeriod; i++) {
      const year = i === 0 ? "Current" : i * -1;
      const currentUnamortizationPortion = unamortizedPortionSlice * i;
      const unamortizedPortion = 1 - currentUnamortizationPortion;
      const unamortizedValue =
        incomeStatementsArray[i].researchDevelopment * unamortizedPortion;

      let amortizationThisYear =
        incomeStatementsArray[i].researchDevelopment / i;

      amortizationThisYear =
        amortizationThisYear === Infinity ? 0 : amortizationThisYear;

      sumValueOfResearchAsset += unamortizedValue;
      sumAmortizationOfResearchAssetForCurrentYear += amortizationThisYear;

      dataRow.push({
        year,
        rnDExpenses: (
          <FormatRawNumberToMillion
            value={incomeStatementsArray[i].researchDevelopment}
            useCurrencySymbol
            decimalScale={2}
          />
        ),
        unamortizedPortion: (
          <FormatRawNumber value={unamortizedPortion} decimalScale={2} />
        ),
        unamortizedValue: (
          <FormatRawNumberToMillion
            value={unamortizedValue}
            useCurrencySymbol
            decimalScale={2}
          />
        ),
        amortizationThisYear: (
          <FormatRawNumberToMillion
            value={amortizationThisYear}
            useCurrencySymbol
            decimalScale={2}
          />
        ),
      });
    }

    setDataRow(dataRow);
    setSumValueOfResearchAsset(sumValueOfResearchAsset);
    setSumAmortizationOfResearchAssetForCurrentYear(
      sumAmortizationOfResearchAssetForCurrentYear,
    );
  }, [
    amortizationPeriod,
    incomeStatements,
    sumValueOfResearchAsset,
    sumAmortizationOfResearchAssetForCurrentYear,
    adjustmentToOperatingIncome,
    incomeStatementsArray,
  ]);

  return (
    <React.Fragment>
      <CompanyHeading />
      <SubSection>
        <Typography variant="h5" gutterBottom>
          R&amp;D Amortization Converter
        </Typography>
        <Box>
          <Typography style={{ fontWeight: theme.typography.fontWeightBold }}>
            {currentIndustry.industryName}
          </Typography>
          <Typography>
            In mln ({currencyCode}:{currencySymbol})
          </Typography>
        </Box>
      </SubSection>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          gap: theme.spacing(2),
        }}
      >
        <RnDAmortizationTextField
          label={<Typography>R&amp;D Amortization Year Life</Typography>}
          value={amortizationPeriod}
          onBlur={(value) => {
            setURLInput("amortizationYearLife", value);
          }}
          InputProps={{
            inputComponent: FormatInputToYear,
          }}
          onChange={(event) => {
            setAmortizationPeriod(event.target.value);
          }}
        />
      </Box>
      <SubSection>
        <TTTable columns={amortizationIndustryColumns} data={dataRow} />
      </SubSection>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          gap: theme.spacing(2),
        }}
      >
        <BoldValueLabel
          value={
            <FormatRawNumberToMillion
              suffix="mln"
              decimalScale={2}
              useCurrencySymbol
              value={sumValueOfResearchAsset}
            />
          }
          label="Sum of Unamortized Value of Research Asset"
        />
        <BoldValueLabel
          value={
            <FormatRawNumberToMillion
              suffix="mln"
              decimalScale={2}
              useCurrencySymbol
              value={sumAmortizationOfResearchAssetForCurrentYear}
            />
          }
          label="Sum of Amortization of research asset for current year"
        />
        <BoldValueLabel
          value={
            <FormatRawNumberToMillion
              value={adjustmentToOperatingIncome}
              suffix="mln"
              decimalScale={2}
              useCurrencySymbol
            />
          }
          label="Adjustment to Operating Income"
        />
        <BoldValueLabel
          value={
            <FormatRawNumberToMillion
              suffix="mln"
              decimalScale={2}
              useCurrencySymbol
            />
          }
          label="Tax Effect of R&amp;D Expensing"
        />
      </Box>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(RnDAmortizationConverter);
