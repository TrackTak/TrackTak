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
  const initialAmortizationPeriod = useSelector(selectAmortizationIndustry)
    .amortizationPeriod;
  const [amortizationPeriod, setAmortizationPeriod] = useState(
    initialAmortizationPeriod,
  );
  const [dataRow, setDataRow] = useState([]);

  const currencyCode = useSelector(
    (state) => state.fundamentals.incomeStatement.currencyCode,
  );
  const currencySymbol = getSymbolFromCurrency(currencyCode);

  useEffect(() => {
    setAmortizationPeriod(initialAmortizationPeriod);
  }, [initialAmortizationPeriod]);

  useEffect(() => {
    const dataRow = [];
    const incomeStatementsArray = Object.values(incomeStatements);
    const unamortizedPortionSlice = 1 / amortizationPeriod;

    for (let i = 0; i <= amortizationPeriod; i++) {
      const year = i === 0 ? "Current" : i * -1;
      const currentUnamortizationPortion = unamortizedPortionSlice * i;
      const unamortizedPortion = 1 - currentUnamortizationPortion;
      const unamortizedValue =
        incomeStatementsArray[i].researchDevelopment * unamortizedPortion;
      const amortizationThisYear =
        incomeStatementsArray[i].researchDevelopment / year;

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
  }, [amortizationPeriod, incomeStatements]);

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
        <RnDAmortizationTextField
          label={<Typography>Value of Research Asset </Typography>}
        />
        <RnDAmortizationTextField
          label={
            <Typography>
              Amortization of research asset for current year
            </Typography>
          }
        />
        <RnDAmortizationTextField
          label={<Typography>Adjustment to Operating Income</Typography>}
        />
        <RnDAmortizationTextField
          label={<Typography>Tax Effect of R&amp;D Expensing</Typography>}
        />
      </Box>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(RnDAmortizationConverter);
