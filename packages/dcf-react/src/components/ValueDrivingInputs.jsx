import {
  Box,
  TextField,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React from "react";
import FormatInputToPercent from "./FormatInputToPercent";
import FormatInputToYear from "./FormatInputToYear";
import FormatInputToNumber from "./FormatInputToNumber";
import { textFieldRootStyles } from "../shared/utils";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import { InfoTextValueDrivingInputs } from "./InfoText";
import useSetURLInput from "../hooks/useSetURLInput";
import useInputQueryParams from "../hooks/useInputQueryParams";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import { useLocation } from "@reach/router";

const ValueDrivingTextField = withStyles({
  root: {
    ...textFieldRootStyles,
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
    },
  },
})((props) => <TextField helperText="Required" {...props} />);

export const cagrInYearsOneToFiveLabel = "CAGR in Years 1-5";
export const ebitTargetMarginInYearTenLabel =
  "Operating Target Margin in Year 10";
export const yearOfConvergenceLabel = "Year of Convergence";
export const salesToCapitalRatioLabel = "Sales to Capital Ratio";
export const valueDrivingInputsHeader = "Value Driving Inputs";
export const valueDrivingInputsId = "value-driving-inputs";

const ValueDrivingInputs = () => {
  const theme = useTheme();
  const inputQueryParams = useInputQueryParams();
  const setURLInput = useSetURLInput();
  const location = useLocation();
  const isFocusedOnValueDrivingInputs = location.hash.includes(
    valueDrivingInputsId,
  );

  return (
    <Box
      sx={
        isFocusedOnValueDrivingInputs
          ? {
              boxShadow: `0 0 5px ${theme.palette.primary.main}`,
              border: `1px solid ${theme.palette.primary.main}`,
              padding: "5px",
              borderRadius: "2px",
              margin: "0 -5px",
            }
          : null
      }
    >
      <Typography variant="h5" gutterBottom id={valueDrivingInputsId}>
        <InfoOutlinedIconWrapper text={<InfoTextValueDrivingInputs />}>
          {valueDrivingInputsHeader}
        </InfoOutlinedIconWrapper>
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}>
        <ValueDrivingTextField
          label={cagrInYearsOneToFiveLabel}
          value={inputQueryParams.cagrYearOneToFive}
          onBlur={(value) => {
            setURLInput("cagrYearOneToFive", value);
          }}
          InputProps={{
            inputComponent: FormatInputToPercent,
          }}
        />
        <ValueDrivingTextField
          label={ebitTargetMarginInYearTenLabel}
          value={inputQueryParams.ebitTargetMarginInYearTen}
          onBlur={(value) => {
            setURLInput("ebitTargetMarginInYearTen", value);
          }}
          InputProps={{
            inputComponent: FormatInputToPercent,
          }}
        />
        <ValueDrivingTextField
          label={yearOfConvergenceLabel}
          value={inputQueryParams.yearOfConvergence}
          onBlur={(value) => {
            setURLInput("yearOfConvergence", value);
          }}
          InputProps={{
            inputComponent: FormatInputToYear,
          }}
        />
        <ValueDrivingTextField
          label={salesToCapitalRatioLabel}
          value={inputQueryParams.salesToCapitalRatio}
          onBlur={(value) => {
            setURLInput("salesToCapitalRatio", value);
          }}
          InputProps={{
            inputComponent: FormatInputToNumber,
          }}
        />
      </Box>
    </Box>
  );
};
export default withFundamentalsLoaded(ValueDrivingInputs);
