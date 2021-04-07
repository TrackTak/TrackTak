import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  FormGroup,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import TTTable from "./TTTable";
import CheckboxSlider from "./CheckboxSlider";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { isNil } from "lodash";
import { useSelector } from "react-redux";
import selectCells from "../selectors/dcfSelectors/selectCells";
import selectScope from "../selectors/dcfSelectors/selectScope";
import FormatRawNumberToCurrency from "./FormatRawNumberToCurrency";
import useSensitivityAnalysisDataTable, {
  findType,
  getSliderValuesFromMinMax,
} from "../hooks/useSensitivityAnalysisDataTable";
import useInputQueryParams, {
  inputQueries,
} from "../hooks/useInputQueryParams";
import dcfModelWorker from "../workers";
import getChunksOfArray from "../shared/getChunksOfArray";
import { Fragment } from "react";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";

const useStyles = makeStyles((theme) => ({
  slider: {
    maxWidth: 400,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const getColumns = (yElement) => {
  if (yElement) {
    return yElement.data.map((value, i) => {
      const Formatter = yElement.formatter;

      return {
        Header: (
          <b>
            <Formatter value={value} />
          </b>
        ),
        accessor: i.toString(),
      };
    });
  }

  return [];
};

const getModelScopes = (scope, xElement, yElement) => {
  const doesScopeExist =
    !isNil(scope[xElement?.name]) && !isNil(scope[yElement?.name]);

  if (!doesScopeExist) return null;

  const scopes = xElement.data.flatMap((xElementValue) => {
    return yElement.data.map((yElementValue, i) => {
      return {
        [xElement.name]: xElementValue,
        [yElement.name]: yElementValue,
      };
    });
  });

  return scopes;
};

const SensitivityAnalysis = () => {
  const classes = useStyles();
  const theme = useTheme();
  const cells = useSelector(selectCells);
  const scope = useSelector(selectScope);
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useSensitivityAnalysisDataTable();
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const inputQueryParams = useInputQueryParams();
  const [isLoading, setIsLoading] = useState();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [checkedItems, setCheckedItems] = useState([
    {
      name: "cagrYearOneToFive",
      value: true,
    },
    {
      name: "ebitTargetMarginInYearTen",
      value: true,
    },
  ]);
  const dataTableValues = dataTable.filter((x) =>
    checkedItems.some((z) => z.name === x.name),
  );
  const xElement = dataTableValues[0];
  const yElement = dataTableValues[1];

  const onSliderChangeCommitted = (name, sliderValue) => {
    const type = findType(inputQueries, name);

    let minPoint = sliderValue[0];
    let maxPoint = sliderValue[1];

    if (type === "percent") {
      minPoint /= 100;
      maxPoint /= 100;
    }

    const newDataTable = dataTable.map((datum) => {
      if (name === datum.name) {
        return {
          ...datum,
          data: getSliderValuesFromMinMax(minPoint, maxPoint),
        };
      }
      return datum;
    });

    setDataTable(newDataTable);
  };

  const setChecked = (name, checked) => {
    let newCheckedItems = [...checkedItems];
    const existingItem = checkedItems.find((x) => x.name === name);

    if (existingItem) {
      newCheckedItems = checkedItems.filter((x) => x.name !== name);
    } else {
      if (checkedItems.length === 2) {
        newCheckedItems.shift();
      }
      newCheckedItems.push({
        name,
        value: checked,
      });
    }

    setCheckedItems(newCheckedItems);
  };

  const columns = [
    {
      Header: "",
      accessor: "dataField",
    },
    ...getColumns(yElement),
  ];

  useEffect(() => {
    const currentScopes = getModelScopes(scope, xElement, yElement);

    if (currentScopes) {
      setIsLoading(true);

      dcfModelWorker.postMessage({
        cells,
        existingScope: scope,
        currentScopes,
      });

      dcfModelWorker.onmessage = ({ data }) => {
        const chunkedData = getChunksOfArray(data, xElement.data.length);
        const XFormatter = xElement.formatter;

        const rowData = chunkedData.map((chunk, i) => {
          const row = {
            dataField: (
              <b>
                <XFormatter value={xElement.data[i]} />
              </b>
            ),
          };

          chunk.forEach((model, z) => {
            let sx;

            if (cells.B36.value === model.B36.value) {
              sx = {
                color: theme.palette.primary.main,
              };
            }

            row[z.toString()] = (
              <Box sx={sx}>
                <FormatRawNumberToCurrency value={model.B36.value} />
              </Box>
            );
          });

          return row;
        });

        setIsLoading(false);
        setData(rowData);
      };
    }
  }, [cells, scope, theme.palette.primary.main, xElement, yElement]);

  return (
    <Fragment>
      <Typography variant="h5" gutterBottom>
        Sensitivity Analysis
      </Typography>
      <Box
        sx={{
          display: "flex",
          gridColumnGap: theme.spacing(8.75),
          gridRowGap: theme.spacing(2),
          flexWrap: "wrap",
        }}
      >
        <FormGroup column className={classes.slider}>
          {dataTable.map(({ modifier, data, name, ...datum }) => {
            const disabled = isNil(inputQueryParams[name]);

            return (
              <CheckboxSlider
                {...datum}
                disabled={disabled || !hasAllRequiredInputsFilledIn}
                checked={
                  checkedItems.find((x) => x.name === name)?.value ?? false
                }
                name={name}
                value={[modifier(data[0]), modifier(data[data.length - 1])]}
                setChecked={setChecked}
                onChangeCommitted={onSliderChangeCommitted}
              />
            );
          })}
        </FormGroup>
        {xElement && yElement && (
          <Box sx={{ flex: 1 }}>
            {smDown && (
              <Box sx={{ mb: 2 }}>
                <Box mb={1}>X = {xElement.label}</Box>
                <Box>Y = {yElement.label}</Box>
              </Box>
            )}
            <Typography align="center" variant="h6">
              {smDown ? "Y" : yElement.label}
            </Typography>
            <Box
              style={{ display: "flex", alignItems: "center", gridGap: "10px" }}
            >
              <Typography
                variant="h6"
                style={{
                  flex: "0 1 auto",
                  textAlign: "center",
                }}
              >
                {smDown ? "X" : xElement.label}
              </Typography>
              {isLoading ? (
                <Box
                  sx={{
                    width: "100%",
                    height: 322,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <TTTable sx={{ flex: 1 }} columns={columns} data={data} />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default SensitivityAnalysis;
