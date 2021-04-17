import React from "react";
import { useSelector } from "react-redux";
import CompanyHeading from "../components/CompanyHeading";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import SubSection from "../components/SubSection";
import {
  Box,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { textFieldRootStyles } from "../shared/utils";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import getSymbolFromCurrency from "currency-symbol-map";
import TTTable from "../components/TTTable";
import {FormatInputToMillionCurrency} from "../components/FormatInputToMillion";
import useSetURLInput from "../hooks/useSetURLInput"

const data =
  (() => [
    {
      col1: "Hello",
      col2: "World",
    },
    {
      col1: "react-table",
      col2: "rocks",
    },
    {
      col1: "whatever",
      col2: "you want",
    },
  ],
  []);

const columns =
  (() => [
    {
      Header: "Column 1",
      accessor: "col1", // accessor is the "key" in the data
    },
    {
      Header: "Column 2",
      accessor: "col2",
    },
  ],
  []);

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
  const currentIndustry = useSelector(selectCurrentIndustry);
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const setURLInput = useSetURLInput();
  const currencyCode = useSelector(
    (state) => state.fundamentals.incomeStatement.currencyCode,
  );
  const currencySymbol = getSymbolFromCurrency(currencyCode);

  return (
    <React.Fragment>
      <CompanyHeading />
      <SubSection>
        <Typography variant="h5" gutterBottom>
          R&D Amortization Converter
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
          label={<Typography>R&D Amortization Year Life</Typography>}
        />
        <RnDAmortizationTextField
          label={<Typography>Current year's R&D expense</Typography>}
          value={incomeStatement.researchDevelopment}
          onBlur={(value) => {
            setURLInput("researchDevelopment", value);
          }}
          InputProps={{
            inputComponent: FormatInputToMillionCurrency,
            //million/use currency/optional inputs
          }}
        />
      </Box>
      <Box>
        <TTTable columns={columns} data={data} />
      </Box>
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
          label={<Typography>Tax Effect of R&D Expensing</Typography>}
        />
      </Box>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(RnDAmortizationConverter);
