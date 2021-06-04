import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { padCellKeys, styleMap, styles } from "./utils";
import { Alert, Box, useMediaQuery, useTheme, Link } from "@material-ui/core";
import useInputQueryParams from "../hooks/useInputQueryParams";
import selectCostOfCapital from "../selectors/fundamentalSelectors/selectCostOfCapital";
import selectRiskFreeRate from "../selectors/fundamentalSelectors/selectRiskFreeRate";
import selectValueOfAllOptionsOutstanding from "../selectors/fundamentalSelectors/selectValueOfAllOptionsOutstanding";
import selectRecentIncomeStatement from "../selectors/fundamentalSelectors/selectRecentIncomeStatement";
import selectRecentBalanceSheet from "../selectors/fundamentalSelectors/selectRecentBalanceSheet";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import useInjectQueryParams from "../hooks/useInjectQueryParams";
import { AnchorLink, navigate } from "../shared/gatsby";
import { useLocation } from "@reach/router";
import selectThreeAverageYearsEffectiveTaxRate from "../selectors/fundamentalSelectors/selectThreeAverageYearsEffectiveTaxRate";
import matureMarketEquityRiskPremium from "../shared/matureMarketEquityRiskPremium";
import sortAlphaNumeric from "./sortAlphaNumeric";
import getChunksOfArray from "../shared/getChunksOfArray";
import selectValuationCurrencySymbol from "../selectors/fundamentalSelectors/selectValuationCurrencySymbol";
import selectScope from "../selectors/dcfSelectors/selectScope";
import cells from "./cells";
import {
  setCells,
  setScope,
  setSheetsSerializedValues,
} from "../redux/actions/dcfActions";
import { isNil } from "lodash-es";
import {
  convertFromCellIndexToLabel,
  formatNumberRender,
} from "../../../web-spreadsheet/src/core/helper";
import getSpreadsheet, {
  spreadsheetEvents,
} from "../../../web-spreadsheet/src";
import {
  getRequiredInputs,
  requiredInputsId,
  requiredInputsSheetName,
} from "./templates/freeCashFlowFirmSimple/getRequiredInputs";
import { getOptionalInputs } from "./templates/freeCashFlowFirmSimple/getOptionalInputs";
import useSetURLInput from "../hooks/useSetURLInput";
import { camelCase } from "change-case";
import { allInputNameTypeMappings } from "./scopeNameTypeMapping";
import { queryNames } from "./templates/freeCashFlowFirmSimple/inputQueryNames";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";

const defaultColWidth = 110;
const columnAWidth = 170;

const columns = [];

for (let index = 0; index < 13; index++) {
  columns.push({ width: index === 0 ? 220 : defaultColWidth });
}

const cellKeysSorted = padCellKeys(Object.keys(cells).sort(sortAlphaNumeric));
const rowCells = cellKeysSorted.map((key) => {
  const cell = cells[key];

  return {
    text: cell?.expr ?? cell?.value ?? "",
    style: styleMap[cell?.type],
  };
});

const dcfValuationId = "dcf-valuation";

const getDataSheets = (isOnMobile) => {
  const rows = {};

  getChunksOfArray(rowCells, columns.length).forEach((data, i) => {
    rows[i] = {
      cells: data,
    };
  });

  const dataSheets = [
    {
      name: "DCF Valuation",
      cols: {
        0: {
          width: columnAWidth,
        },
      },
      rows,
      styles,
    },
  ];

  // Do not put this as a ternary with undefined on the data
  // the moronic chinese coder is checking for existence of keys
  // so it will crash... :(
  if (!isOnMobile) {
    dataSheets[0].freeze = "B38";
  }

  return dataSheets;
};

const getDatasheetsColWidths = (colWidth, isOnMobile) => {
  const dataSheets = getDataSheets(isOnMobile);
  const newDataSheets = dataSheets.map((dataSheet, datasheetIndex) => {
    const newCols = {};

    dataSheet.rows[0].cells.forEach((_, columnIndex) => {
      newCols[columnIndex] = {
        width:
          datasheetIndex === 0 && columnIndex === 0 ? columnAWidth : colWidth,
      };
    });

    return {
      ...dataSheet,
      cols: newCols,
    };
  });

  return newDataSheets;
};

const getDatasheetsYOYGrowth = (spreadsheet, isOnMobile) => {
  const dataSheets = getDataSheets(isOnMobile);
  const dataSheetsValues = spreadsheet?.hyperformula?.getAllSheetsValues();

  const newDataSheets = dataSheets.map((dataSheet, dataSheetIndex) => {
    const formulaSheet = dataSheetsValues[dataSheet.name];
    const newRows = {};

    Object.keys(dataSheet.rows).forEach((rowKey) => {
      const cells = dataSheet.rows[rowKey].cells;
      const formulaRow = formulaSheet[rowKey];

      newRows[rowKey] = {
        ...dataSheet.rows[rowKey],
        cells: cells.map((cell, i) => {
          const previousFormulaValue = formulaRow[i - 1]
            ? formulaRow[i - 1]
            : null;
          let currentFormulaValue = formulaRow[i];

          if (
            typeof previousFormulaValue === "number" &&
            typeof currentFormulaValue === "number" &&
            (rowKey !== "0" || dataSheetIndex !== 0)
          ) {
            return {
              ...cell,
              text:
                (currentFormulaValue - previousFormulaValue) /
                currentFormulaValue,
              style: styleMap.percent,
            };
          }

          return {
            ...cell,
            text: currentFormulaValue,
          };
        }),
      };
    });
    return {
      ...dataSheet,
      rows: newRows,
    };
  });

  return newDataSheets;
};

const DiscountedCashFlowTable = ({
  showFormulas,
  showYOYGrowth,
  SubscribeCover,
}) => {
  const containerRef = useRef();
  const [spreadsheet, setSpreadsheet] = useState();
  const theme = useTheme();
  const location = useLocation();
  const currencySymbol = useSelector(selectValuationCurrencySymbol);
  const scope = useSelector(selectScope);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const inputQueryParams = useInputQueryParams();
  const incomeStatement = useSelector(selectRecentIncomeStatement);
  const balanceSheet = useSelector(selectRecentBalanceSheet);
  const currentEquityRiskPremium = useSelector(selectCurrentEquityRiskPremium);
  const price = useSelector(selectPrice);
  const costOfCapital = useInjectQueryParams(selectCostOfCapital);
  const riskFreeRate = useSelector(selectRiskFreeRate);
  const sharesOutstanding = useSelector(selectSharesOutstanding);
  const valueOfAllOptionsOutstanding = useInjectQueryParams(
    selectValueOfAllOptionsOutstanding,
  );
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
  const pastThreeYearsAverageEffectiveTaxRate = useSelector(
    selectThreeAverageYearsEffectiveTaxRate,
  );
  const setURLInput = useSetURLInput();
  const isFocusedOnValueDrivingInputs = location.hash?.includes(
    requiredInputsId,
  );
  const currentIndustry = useSelector(selectCurrentIndustry);

  useEffect(() => {
    if (isNil(inputQueryParams[queryNames.salesToCapitalRatio])) {
      setURLInput(
        queryNames.salesToCapitalRatio,
        currentIndustry["sales/Capital"],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let spreadsheet;

    const dcfValuationElement = document.getElementById(`${dcfValuationId}`);

    const formats = {
      currency: {
        key: "currency",
        title: () => "Currency",
        type: "number",
        format: "currency",
        label: `${currencySymbol}10.00`,
        render: (v) => {
          if (isNil(v)) return "";

          return currencySymbol + formatNumberRender(v);
        },
      },
      million: {
        key: "million",
        title: () => "Million",
        format: "million",
        type: "number",
        label: "(000)",
        render: (v) => {
          if (isNil(v)) return "";

          return formatNumberRender(v) / 1000000;
        },
      },
      "million-currency": {
        key: "million-currency",
        title: () => "Million Currency",
        format: "million-currency",
        type: "number",
        label: `${currencySymbol}(000)`,
        render: (v) => {
          if (isNil(v)) return "";

          const value = v / 1000000;

          return formats.currency.render(value);
        },
      },
    };

    const width = () => {
      if (containerRef?.current) {
        const containerStyle = getComputedStyle(containerRef.current);
        const paddingX =
          parseFloat(containerStyle.paddingLeft) +
          parseFloat(containerStyle.paddingRight);
        const borderX =
          parseFloat(containerStyle.borderLeftWidth) +
          parseFloat(containerStyle.borderRightWidth);
        const elementWidth =
          containerRef.current.offsetWidth - paddingX - borderX;

        return elementWidth;
      }
    };
    const debugMode = process.env.NODE_ENV === "development";

    const options = {
      debugMode,
      col: {
        width: defaultColWidth,
      },
      formats,
      view: {
        height: () => 1250,
        width,
      },
    };

    const variablesSpreadsheetOptions = {
      debugMode,
      formats,
      view: {
        width,
      },
    };

    spreadsheet = getSpreadsheet(
      dcfValuationElement,
      options,
      variablesSpreadsheetOptions,
    );

    spreadsheet.variablesSpreadsheet.variablesSheet.el.el.id = requiredInputsId;

    setSpreadsheet(spreadsheet);

    return () => {
      spreadsheet?.destroy();
    };
  }, [currencySymbol]);

  useEffect(() => {
    if (spreadsheet) {
      spreadsheet.variablesSpreadsheet.eventEmitter.on(
        spreadsheetEvents.sheet.cellEdited,
        (_, value, cellAddress) => {
          const label = spreadsheet.hyperformula.getCellValue({
            ...cellAddress,
            col: cellAddress.col - 1,
          });

          if (label) {
            const urlName = camelCase(label);

            if (allInputNameTypeMappings[urlName]) {
              setURLInput(camelCase(label), value);
            }
          }
        },
      );
    }
  }, [setURLInput, spreadsheet]);

  useEffect(() => {
    if (!hasAllRequiredInputsFilledIn && spreadsheet) {
      spreadsheet.setDatasheets([]);
    }
  }, [hasAllRequiredInputsFilledIn, spreadsheet, isOnMobile]);

  useEffect(() => {
    if (spreadsheet && scope) {
      spreadsheet.setOptions({
        variables: scope,
      });
    }
  }, [scope, spreadsheet]);

  useEffect(() => {
    if (spreadsheet && hasAllRequiredInputsFilledIn && scope) {
      const dataSheets = getDataSheets(isOnMobile);

      spreadsheet.setDatasheets(dataSheets);

      const sheetName = "DCF Valuation";
      const dataSheetFormulas = spreadsheet.hyperformula.getAllSheetsFormulas();
      const dataSheetValues = spreadsheet.hyperformula.getAllSheetsValues();
      const cells = {};

      dataSheetValues[sheetName].forEach((columns, rowIndex) => {
        columns.forEach((_, columnIndex) => {
          const label = convertFromCellIndexToLabel(columnIndex, rowIndex + 1);
          const expr = dataSheetFormulas[sheetName][rowIndex][columnIndex];
          let value = dataSheetValues[sheetName][rowIndex][columnIndex];

          cells[label] = {
            ...cells[label],
            value,
            expr,
          };
        });
      });

      dispatch(setCells(cells));
      dispatch(
        setSheetsSerializedValues(
          spreadsheet.hyperformula.getAllSheetsSerialized(),
        ),
      );
    }
  }, [hasAllRequiredInputsFilledIn, isOnMobile, spreadsheet, dispatch, scope]);

  useEffect(() => {
    if (spreadsheet) {
      spreadsheet.variablesSpreadsheet.setVariableDatasheets([
        getRequiredInputs(inputQueryParams, theme),
        getOptionalInputs(inputQueryParams),
      ]);
    }
  }, [inputQueryParams, spreadsheet, theme]);

  useEffect(() => {
    if (spreadsheet && hasAllRequiredInputsFilledIn) {
      if (showYOYGrowth) {
        spreadsheet.setDatasheets(
          getDatasheetsYOYGrowth(spreadsheet, isOnMobile),
        );
      } else if (showFormulas) {
        spreadsheet.setOptions({
          showAllFormulas: true,
        });
        spreadsheet.setDatasheets(getDatasheetsColWidths(200, isOnMobile));
      } else {
        spreadsheet.setOptions({
          showAllFormulas: false,
        });
        spreadsheet.setDatasheets(getDataSheets(isOnMobile));
      }
      // TODO: refactor this cause it's terrible
      spreadsheet.sheet.switchData(spreadsheet.sheet.getDatas()[0]);
    }
  }, [
    showYOYGrowth,
    spreadsheet,
    isOnMobile,
    hasAllRequiredInputsFilledIn,
    showFormulas,
  ]);

  useEffect(() => {
    // Dispatch only when we have all the data from the API
    if (
      hasAllRequiredInputsFilledIn &&
      !isNil(price) &&
      !isNil(costOfCapital.totalCostOfCapital)
    ) {
      dispatch(
        setScope({
          matureMarketEquityRiskPremium,
          pastThreeYearsAverageEffectiveTaxRate,
          totalRevenue: incomeStatement.totalRevenue,
          operatingIncome: incomeStatement.operatingIncome,
          investedCapital: balanceSheet.investedCapital,
          bookValueOfDebt: balanceSheet.bookValueOfDebt,
          cashAndShortTermInvestments: balanceSheet.cashAndShortTermInvestments,
          minorityInterest: balanceSheet.minorityInterest,
          marginalTaxRate: currentEquityRiskPremium.marginalTaxRate,
          sharesOutstanding,
          price,
          bookValueOfEquity: balanceSheet.bookValueOfEquity,
          valueOfAllOptionsOutstanding,
          riskFreeRate,
          totalCostOfCapital: costOfCapital.totalCostOfCapital,
          cagrInYears_1_5: inputQueryParams[queryNames.cagrInYears_1_5],
          yearOfConvergence: inputQueryParams[queryNames.yearOfConvergence],
          ebitTargetMarginInYear_10:
            inputQueryParams[queryNames.ebitTargetMarginInYear_10],
          salesToCapitalRatio: inputQueryParams[queryNames.salesToCapitalRatio],
          nonOperatingAssets: inputQueryParams[queryNames.nonOperatingAssets],
          netOperatingLoss: inputQueryParams[queryNames.netOperatingLoss],
          probabilityOfFailure:
            inputQueryParams[queryNames.probabilityOfFailure],
          proceedsAsAPercentageOfBookValue:
            inputQueryParams[queryNames.proceedsAsAPercentageOfBookValue],
        }),
      );
    }
  }, [
    balanceSheet.bookValueOfDebt,
    balanceSheet.bookValueOfEquity,
    balanceSheet.cashAndShortTermInvestments,
    balanceSheet.investedCapital,
    balanceSheet.minorityInterest,
    costOfCapital.totalCostOfCapital,
    currentEquityRiskPremium.marginalTaxRate,
    dispatch,
    incomeStatement.operatingIncome,
    incomeStatement.totalRevenue,
    pastThreeYearsAverageEffectiveTaxRate,
    price,
    riskFreeRate,
    sharesOutstanding,
    valueOfAllOptionsOutstanding,
    hasAllRequiredInputsFilledIn,
    inputQueryParams,
  ]);

  const to = `${location.pathname}#${requiredInputsId}`;
  const zIndex = 100;

  return (
    <Box
      sx={{
        position: "relative",
        "& .x-spreadsheet-comment": {
          fontFamily: theme.typography.fontFamily,
        },
        "& .x-spreadsheet-variables-sheet": isFocusedOnValueDrivingInputs
          ? {
              boxShadow: `0 0 5px ${theme.palette.primary.main}`,
              border: `1px solid ${theme.palette.primary.main}`,
            }
          : {},
      }}
      ref={containerRef}
    >
      <Box id={dcfValuationId} />
      {SubscribeCover ? (
        <SubscribeCover
          sx={{
            zIndex,
          }}
        />
      ) : null}
      {!hasAllRequiredInputsFilledIn && (
        <Alert
          severity="warning"
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            zIndex,
            transform: "translate(-50%, -50%)",
            "& .MuiAlert-icon": {
              alignItems: "center",
            },
            "& .MuiAlert-message": {
              fontSize: 18,
            },
          }}
        >
          The green&nbsp;
          <Link
            component={AnchorLink}
            to={to}
            onAnchorLinkClick={() => {
              navigate(to);
            }}
          >
            {requiredInputsSheetName.slice(0, -1)}
          </Link>
          &nbsp;cells above need to be filled out first to generate your DCF.
        </Alert>
      )}
    </Box>
  );
};

export default DiscountedCashFlowTable;
