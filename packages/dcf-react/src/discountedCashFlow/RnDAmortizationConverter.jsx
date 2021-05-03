import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CompanyHeading from "../components/CompanyHeading";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import SubSection from "../components/SubSection";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
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
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { DCFControlTypography } from "./ExportToExcel";
import { useMemo } from "react";
import { useCallback } from "react";

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

const getAmortizationInCurrentYear = (incomeStatementsArray, index) => {
  let amortizationThisYear =
    incomeStatementsArray[index].researchDevelopment / index;

  amortizationThisYear =
    amortizationThisYear === Infinity ? 0 : amortizationThisYear;

  return amortizationThisYear;
};

const getSumAmortizationOfResearchAssetForCurrentYear = (
  incomeStatementsArray,
  amortizationPeriod,
) => {
  let sumAmortizationOfResearchAssetForCurrentYear = 0;

  for (let i = 0; i <= amortizationPeriod; i++) {
    sumAmortizationOfResearchAssetForCurrentYear += getAmortizationInCurrentYear(
      incomeStatementsArray,
      i,
    );
  }

  return sumAmortizationOfResearchAssetForCurrentYear;
};

const getSumValueOfResearchAsset = (
  incomeStatementsArray,
  amortizationPeriod,
) => {
  const unamortizedPortionSlice = 1 / amortizationPeriod;
  let sumValueOfResearchAsset = 0;

  for (let i = 0; i <= amortizationPeriod; i++) {
    const currentUnamortizationPortion = unamortizedPortionSlice * i;
    const unamortizedPortion = 1 - currentUnamortizationPortion;
    const unamortizedValue =
      incomeStatementsArray[i].researchDevelopment * unamortizedPortion;

    sumValueOfResearchAsset += unamortizedValue;
  }

  return sumValueOfResearchAsset;
};

const getInitialData = (incomeStatementsArray, amortizationPeriod) => {
  const dataRow = [];
  const unamortizedPortionSlice = 1 / amortizationPeriod;

  for (let i = 0; i <= amortizationPeriod; i++) {
    const year = i === 0 ? "Current" : i * -1;
    const currentUnamortizationPortion = unamortizedPortionSlice * i;
    const unamortizedPortion = 1 - currentUnamortizationPortion;
    const unamortizedValue =
      incomeStatementsArray[i].researchDevelopment * unamortizedPortion;

    dataRow.push({
      year,
      rnDExpenses: incomeStatementsArray[i].researchDevelopment,
      unamortizedPortion,
      unamortizedValue,
      amortizationThisYear: getAmortizationInCurrentYear(
        incomeStatementsArray,
        i,
      ),
      // rnDExpenses: (
      //   <FormatRawNumberToMillion
      //     value={incomeStatementsArray[i].researchDevelopment}
      //     useCurrencySymbol
      //     decimalScale={2}
      //   />
      // ),
      // unamortizedPortion: (
      //   <FormatRawNumber value={unamortizedPortion} decimalScale={2} />
      // ),
      // unamortizedValue: (
      //   <FormatRawNumberToMillion
      //     value={unamortizedValue}
      //     useCurrencySymbol
      //     decimalScale={2}
      //   />
      // ),
      // amortizationThisYear: (
      //   <FormatRawNumberToMillion
      //     value={amortizationThisYear}
      //     useCurrencySymbol
      //     decimalScale={2}
      //   />
      // ),
    });
  }

  return dataRow;
};

const RnDAmortizationConverter = () => {
  const theme = useTheme();
  const setURLInput = useSetURLInput();
  const currentIndustry = useSelector(selectCurrentIndustry);
  const incomeStatements = useSelector(selectYearlyIncomeStatements);
  const incomeStatementsArray = useMemo(() => {
    return Object.values(incomeStatements);
  }, [incomeStatements]);
  const initialAmortizationPeriod = useSelector(selectAmortizationIndustry)
    .amortizationPeriod;
  const marginalTaxRate = useSelector(selectCurrentEquityRiskPremium)
    .marginalTaxRate;
  const [amortizationPeriod, setAmortizationPeriod] = useState(
    initialAmortizationPeriod,
  );
  const [dataRow, setDataRow] = useState(
    getInitialData(incomeStatementsArray, amortizationPeriod),
  );
  const [skipPageReset, setSkipPageReset] = useState(false);
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

  const taxEffectOfRnDExpensing = adjustmentToOperatingIncome * marginalTaxRate;

  useEffect(() => {
    setAmortizationPeriod(initialAmortizationPeriod);
  }, [initialAmortizationPeriod]);

  useEffect(() => {
    setDataRow(getInitialData(incomeStatementsArray, amortizationPeriod));
    setSumValueOfResearchAsset(
      getSumValueOfResearchAsset(incomeStatementsArray, amortizationPeriod),
    );
    setSumAmortizationOfResearchAssetForCurrentYear(
      getSumAmortizationOfResearchAssetForCurrentYear(
        incomeStatementsArray,
        amortizationPeriod,
      ),
    );
  }, [amortizationPeriod, incomeStatementsArray]);

  const resetData = () =>
    setDataRow(getInitialData(incomeStatementsArray, amortizationPeriod));

  useEffect(() => {
    setSkipPageReset(false);
  }, [dataRow]);

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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton variant="outlined">
          <RotateLeftIcon onClick={resetData} />
        </IconButton>
        <DCFControlTypography>Reset</DCFControlTypography>
      </Box>
      <SubSection>
        <TTTable
          columns={amortizationIndustryColumns}
          data={dataRow}
          skipPageReset={skipPageReset}
          updateMyData={(rowIndex, columnId, value) => {
            setSkipPageReset(true);
            setDataRow((prevState) =>
              prevState.map((row, index) => {
                if (index === rowIndex) {
                  return {
                    ...prevState[rowIndex],
                    [columnId]: value,
                  };
                }
                return row;
              }),
            );
          }}
        />
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
              value={taxEffectOfRnDExpensing}
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
