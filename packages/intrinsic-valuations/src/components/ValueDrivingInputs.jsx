import { Box, TextField, Typography, useTheme } from "@material-ui/core";
import React, { useEffect } from "react";
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
import { useSelector } from "react-redux";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import { isNil } from "lodash-es";
import {
  cagrInYears_1_5Label,
  ebitTargetMarginInYear_10Label,
  salesToCapitalRatioLabel,
  yearOfConvergenceLabel,
} from "../discountedCashFlow/templates/freeCashFlowFirmSimple/inputQueryNames";
import { requiredInputsId } from "../discountedCashFlow/templates/freeCashFlowFirmSimple/getRequiredInputs";

const ValueDrivingTextField = (props) => (
  <TextField
    {...props}
    sx={{
      ...textFieldRootStyles,
      "& .MuiFormHelperText-root": {
        marginLeft: 0,
      },
    }}
    helperText="Required"
  />
);

const ValueDrivingInputs = () => {
  const theme = useTheme();
  const inputQueryParams = useInputQueryParams();
  const setURLInput = useSetURLInput();
  const location = useLocation();
  const currentIndustry = useSelector(selectCurrentIndustry);
  const isFocusedOnValueDrivingInputs = location.hash?.includes(
    requiredInputsId,
  );

  useEffect(() => {
    if (isNil(inputQueryParams.salesToCapitalRatio)) {
      setURLInput("salesToCapitalRatio", currentIndustry["sales/Capital"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Typography variant="h5" gutterBottom id={requiredInputsId}>
        <InfoOutlinedIconWrapper text={<InfoTextValueDrivingInputs />}>
          {/* {valueDrivingInputsHeader} */}
        </InfoOutlinedIconWrapper>
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}>
        <ValueDrivingTextField
          label={cagrInYears_1_5Label}
          value={inputQueryParams.cagrInYears_1_5}
          onBlur={(value) => {
            setURLInput("cagrInYears_1_5", value);
          }}
          InputProps={{
            inputComponent: FormatInputToPercent,
          }}
        />
        <ValueDrivingTextField
          label={ebitTargetMarginInYear_10Label}
          value={inputQueryParams.ebitTargetMarginInYear_10}
          onBlur={(value) => {
            setURLInput("ebitTargetMarginInYear_10", value);
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
