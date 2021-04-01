import React, { useState } from "react";
import { Box, FormGroup, Typography } from "@material-ui/core";
import {
  cagrInYearsOneToFiveLabel,
  ebitTargetMarginInYearTenLabel,
  yearOfConvergenceLabel,
  salesToCapitalRatioLabel,
} from "../components/ValueDrivingInputs";
import {
  probabilityOfFailureLabel,
  proceedsAsPercentageOfBookValueLabel,
} from "../components/OptionalInputs";
import TTTable from "./TTTable";
import FormGroupSlider from "./FormGroupSlider";
import { makeStyles } from "@material-ui/core/styles";
import { isNil } from "lodash";
import useInputQueryParams from "../hooks/useInputQueryParams";

const useStyles = makeStyles((theme) => ({
  slider: {
    maxWidth: 400,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: -50,
    label: "-50",
  },
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "50",
  },
];

const valueText = (value) => {
  return `${value}`;
};

//onChnage for sldier
const SensitivityAnalysis = () => {
  const classes = useStyles();
  const inputQueryParams = useInputQueryParams();
  const [sliderValue, setSliderValue] = React.useState([10, 40]);
  const [dataTable, setDataTable] = useState([
    {
      label: cagrInYearsOneToFiveLabel,
      value: "cagrYearOneToFive",
      checked: !isNil(inputQueryParams.cagrYearOneToFive),
      step: 1,
      min: -50,
      max: 50,
      data: [
        { dataField: "20%" },
        { dataField: "25%" },
        { dataField: "30%" },
        { dataField: "35%" },
        { dataField: "40%" },
      ],
    },
    {
      label: ebitTargetMarginInYearTenLabel,
      value: "ebitTargetMarginInYearTen",
      checked: !isNil(inputQueryParams.ebitTargetMarginInYearTen),
      step: 1,
      min: -50,
      max: 50,
      data: [
        { dataField: "20%" },
        { dataField: "25%" },
        { dataField: "30%" },
        { dataField: "35%" },
        { dataField: "40%" },
      ],
    },
    {
      label: yearOfConvergenceLabel,
      value: "yearOfConvergence",
      step: 1,
      min: -50,
      max: 50,
      data: [
        { dataField: "0" },
        { dataField: "1" },
        { dataField: "2" },
        { dataField: "3" },
        { dataField: "4" },
      ],
    },
    {
      label: salesToCapitalRatioLabel,
      value: "salesToCapitalRatio",
      step: 1,
      min: -50,
      max: 50,
      data: [
        { dataField: "0" },
        { dataField: "1" },
        { dataField: "2" },
        { dataField: "3" },
        { dataField: "4" },
      ],
    },
    {
      label: probabilityOfFailureLabel,
      value: "probabilityOfFailure",
      step: 1,
      min: -50,
      max: 50,
      data: [
        { dataField: "20%" },
        { dataField: "25%" },
        { dataField: "30%" },
        { dataField: "35%" },
        { dataField: "40%" },
      ],
    },
    {
      label: proceedsAsPercentageOfBookValueLabel,
      value: "proceedsAsAPercentageOfBookValue",
      step: 1,
      min: -50,
      max: 50,
      data: [
        { dataField: "20%" },
        { dataField: "25%" },
        { dataField: "30%" },
        { dataField: "35%" },
        { dataField: "40%" },
      ],
    },
  ]);

  const onSliderChange = (value, sliderValue) => {
    const newSliderValue = dataTable.map((datum) => {
      if (value === datum.value) {
        const data = [sliderValue[0], sliderValue[1]];
        //number between
        return {
          ...datum,
          data,
        };
      }
      return datum;
    });
    setSliderValue(newSliderValue);
  };

  const setChecked = (value, checked) => {
    const newDataTable = dataTable.map((datum) => {
      if (value === datum.value) {
        return {
          ...datum,
          checked,
        };
      }

      return datum;
    });

    setDataTable(newDataTable);
  };

  const columns = [
    {
      Header: "",
      accessor: "dataField",
    },
  ];

  const newDataTable = [...dataTable];
  const checkedValues = newDataTable.filter((x) => x.checked);
  const xElement = checkedValues.length === 2 ? checkedValues[0] : null;
  const yElement = checkedValues.length === 2 ? checkedValues[1] : null;

  if (yElement) {
    columns.push(
      ...yElement.data.map((statement) => {
        return {
          Header: statement.dataField,
          //accessor: statement.value,
        };
      }),
    );
  }

  return (
    <Box sx={{ overflow: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Sensitivity Analysis
      </Typography>
      {xElement && yElement && (
        <Box>
          <Typography
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            variant="h6"
            component="div"
          >
            {yElement.label}
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              {xElement.label}
            </Typography>
            <TTTable columns={columns} data={xElement.data} />
          </Box>
        </Box>
      )}
      <FormGroup aria-label="position" column className={classes.slider}>
        {dataTable.map((dataLabel) => (
          <FormGroupSlider
            marks={marks}
            setChecked={setChecked}
            onSliderChange={onSliderChange}
            dataLabel={dataLabel}
            sliderValue={sliderValue}
            valueText={valueText}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SensitivityAnalysis;
