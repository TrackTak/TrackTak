import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import selectYearlyIncomeStatements from "../selectors/fundamentalSelectors/selectYearlyIncomeStatements";
import BoldValueLabel from "../components/BoldValueLabel";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import EditableCell from "../components/EditableCell";
import {
  TableInputMillionCurrencyFormatter,
  TableInputNumberFormatter,
} from "../components/TableFormatters";
import { setRndAdjustmentToOperatingIncome } from "../redux/actions/fundamentalsActions";

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

  amortizationThisYear = isFinite(amortizationThisYear)
    ? amortizationThisYear
    : 0;
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

const getDataRows = (incomeStatementsArray, amortizationPeriod) => {
  const dataRow = [];
  const unamortizedPortionSlice = 1 / amortizationPeriod;

  for (let i = 0; i <= amortizationPeriod; i++) {
    const year = i === 0 ? 0 : i * -1;
    const currentUnamortizationPortion = unamortizedPortionSlice * i;
    const unamortizedPortion = 1 - currentUnamortizationPortion;
    const unamortizedValue =
      incomeStatementsArray[i].researchDevelopment * unamortizedPortion;
    const rndExpenses = incomeStatementsArray[i].researchDevelopment;

    dataRow.push({
      year: {
        FormatInput: TableInputNumberFormatter,
        value: year,
      },
      rnDExpenses: {
        FormatInput: TableInputMillionCurrencyFormatter,
        value: rndExpenses,
      },
      unamortizedPortion: {
        FormatInput: TableInputNumberFormatter,
        value: unamortizedPortion,
      },
      unamortizedValue: {
        FormatInput: TableInputMillionCurrencyFormatter,
        value: unamortizedValue,
      },
      amortizationThisYear: {
        FormatInput: TableInputMillionCurrencyFormatter,
        value: getAmortizationInCurrentYear(incomeStatementsArray, i),
      },
    });
  }

  return dataRow;
};

const RnDAmortizationConverter = () => {
  const theme = useTheme();
  const setURLInput = useSetURLInput();
  const dispatch = useDispatch();
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
    getDataRows(incomeStatementsArray, amortizationPeriod),
  );
  const [sumValueOfResearchAsset, setSumValueOfResearchAsset] = useState(0);
  const [isError, setIsError] = useState(false);
  const [
    sumAmortizationOfResearchAssetForCurrentYear,
    setSumAmortizationOfResearchAssetForCurrentYear,
  ] = useState(0);
  const [userEdits, setUserEdits] = useState(incomeStatementsArray);

  const currencyCode = useSelector(
    (state) => state.fundamentals.incomeStatement.currencyCode,
  );
  const currencySymbol = getSymbolFromCurrency(currencyCode);
  const adjustmentToOperatingIncome =
    incomeStatementsArray[0].researchDevelopment -
    sumAmortizationOfResearchAssetForCurrentYear;

  const taxEffectOfRnDExpensing = adjustmentToOperatingIncome * marginalTaxRate;

  const maxYear = incomeStatementsArray.length;

  const checkAmortizationYearLifeIsValid = (event) => {
    const value = event.target.value;

    if (value >= maxYear || value <= 0) {
      setIsError(true);
      return;
    }
    setAmortizationPeriod(value);

    setIsError(false);
  };

  useEffect(() => {
    setAmortizationPeriod(initialAmortizationPeriod);
  }, [initialAmortizationPeriod]);

  useEffect(() => {
    setDataRow(getDataRows(incomeStatementsArray, amortizationPeriod));
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

  useEffect(() => {
    dispatch(setRndAdjustmentToOperatingIncome(adjustmentToOperatingIncome));
  }, [adjustmentToOperatingIncome, dispatch]);

  useEffect(() => {
    setDataRow(getDataRows(userEdits, amortizationPeriod));
  }, [userEdits, amortizationPeriod]);

  //sets all values to zero
  const resetData = () =>
    setUserEdits(getDataRows(incomeStatementsArray, amortizationPeriod));

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
          error={isError}
          label={<Typography>R&amp;D Amortization Year Life</Typography>}
          value={amortizationPeriod}
          helperText={
            isError
              ? `Amortization year cannot be higher than ${
                  maxYear - 1
                } or zero.`
              : null
          }
          onBlur={(value) => {
            setURLInput("amortizationYearLife", value);
          }}
          InputProps={{
            inputComponent: FormatInputToYear,
          }}
          onChange={checkAmortizationYearLifeIsValid}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton>
          <RotateLeftIcon
            sx={{ width: "35px", height: "35px" }}
            color="primary"
            onClick={resetData}
          />
        </IconButton>
        <Typography>Reset</Typography>
      </Box>
      <SubSection>
        <TTTable
          tableOptions={{
            defaultColumn: {
              Cell: EditableCell,
            },
          }}
          columns={amortizationIndustryColumns}
          data={dataRow}
          updateMyData={(rowIndex, columnId, value) => {
            setUserEdits((prevState) =>
              prevState.map((row, index) => {
                if (index === rowIndex) {
                  return {
                    ...row,
                    [columnId]: {
                      ...row[columnId],
                      value,
                    },
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
