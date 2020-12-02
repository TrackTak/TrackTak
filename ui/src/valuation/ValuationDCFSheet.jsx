import React, { useState } from "react";
import { useSelector } from "react-redux";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";
import * as mathjs from "mathjs";
import { useEffect } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import { useCallback } from "react";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import initialData, {
  dataDependentsTree,
  columns,
  numberOfRows,
} from "./initialData";
import {
  getColumnsBetween,
  replacePlaceholderWithValue,
  setAllDependents,
  validateExp,
} from "./utils";
import { getEBITMarginCalculation } from "./expressionCalculations";
import { Cell, Column, Table } from "@blueprintjs/table";
import { useTheme } from "@material-ui/core";

const computeExpr = (key, expr, scope) => {
  let value = null;

  if (expr?.charAt(0) !== "=") {
    return { value: expr, expr: expr };
  } else {
    try {
      value = mathjs.evaluate(expr.substring(1), scope);
    } catch (e) {
      value = null;
    }

    if (value !== null && validateExp([key], expr)) {
      return { className: "equation", value, expr };
    } else {
      return { className: "error", value: "error", expr };
    }
  }
};

const cellUpdate = (data, key, expr) => {
  const scope = {};
  const cellToUpdate = data[key];

  Object.keys(data).forEach((key) => {
    const { value } = data[key];

    scope[key] = value === "" || isNaN(value) ? 0 : parseFloat(value);
  });

  data[key] = {
    ...cellToUpdate,
    ...computeExpr(key, expr, scope),
  };
};

const ValuationDCFSheet = ({
  riskFreeRate,
  costOfCapital,
  valueOfAllOptionsOutstanding,
}) => {
  const input = useSelector((state) => state.input);
  const fundamentals = useSelector((state) => state.fundamentals);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);
  const [data, setData] = useState(initialData);
  const theme = useTheme();

  const updateCell = useCallback(
    (key, value) => {
      const allDependents = {};

      setAllDependents(key, dataDependentsTree, allDependents);

      cellUpdate(data, key, value?.toString());

      const sortedDependents = Object.keys(allDependents);

      sortedDependents.sort((a, b) => {
        return a.localeCompare(b, "en", { numeric: true });
      });

      sortedDependents.forEach((key) => {
        const cell = data[key];

        cellUpdate(data, key, cell.expr);
      });

      setData({ ...data });
    },
    [data]
  );

  const cellRenderer = useCallback(
    (column) => (rowIndex) => {
      const row = (rowIndex += 1);
      const key = column + row;
      const cell = data[key];

      if (!cell) return <Cell />;

      const { value, type } = cell;

      let node = cell.value;

      if (type === "percent") {
        node = <FormatRawNumberToPercent value={value} decimalScale={2} />;
      }
      if (type === "million") {
        node = <FormatRawNumberToMillion value={value} useCurrencySymbol />;
      }
      if (type === "currency") {
        node = <FormatRawNumberToCurrency value={value} />;
      }
      if (type === "number") {
        node = <FormatRawNumber value={value} decimalScale={2} />;
      }

      return (
        <Cell
          style={{
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
            color: key === "B37" ? theme.palette.primary.main : "initial",
          }}
        >
          {node}
        </Cell>
      );
    },
    [data, theme]
  );

  useEffect(() => {
    updateCell("B34", valueOfAllOptionsOutstanding);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueOfAllOptionsOutstanding]);

  useEffect(() => {
    updateCell("C12", costOfCapital);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costOfCapital]);

  useEffect(() => {
    updateCell("M2", riskFreeRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskFreeRate]);

  useEffect(() => {
    updateCell("M6", equityRiskPremium.currentCountry.corporateTaxRate);
    updateCell(
      "M12",
      equityRiskPremium.matureMarketEquityRiskPremium + riskFreeRate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    equityRiskPremium.currentCountry.corporateTaxRate,
    equityRiskPremium.matureMarketEquityRiskPremium,
    input.salesToCapitalRatio,
    riskFreeRate,
  ]);

  useEffect(() => {
    updateCell("B3", fundamentals.ttm.totalRevenue);
    updateCell("B5", fundamentals.ttm.operatingIncome);
    updateCell("B17", fundamentals.investedCapital);
    updateCell("B29", fundamentals.currentBookValueOfDebt);
    updateCell("B30", fundamentals.ttm.minorityInterest);
    updateCell("B31", fundamentals.cashAndShortTermInvestments);
    updateCell("B32", fundamentals.noncontrollingInterestInConsolidatedEntity);
    updateCell("B36", fundamentals.currentPrice);
    updateCell(
      "B37",
      replacePlaceholderWithValue(
        data.B37,
        "sharesOutstanding",
        fundamentals.data.SharesStats.SharesOutstanding
      )
    );
    updateCell("B6", fundamentals.pastThreeYearsAverageEffectiveTaxRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fundamentals.ttm.totalRevenue,
    fundamentals.ttm.operatingIncome,
    fundamentals.investedCapital,
    fundamentals.ttm.minorityInterest,
    fundamentals.currentBookValueOfDebt,
    fundamentals.cashAndShortTermInvestments,
    fundamentals.noncontrollingInterestInConsolidatedEntity,
    fundamentals.currentPrice,
    fundamentals.data.SharesStats.SharesOutstanding,
    fundamentals.pastThreeYearsAverageEffectiveTaxRate,
  ]);

  useEffect(() => {
    updateCell("C16", input.salesToCapitalRatio);
    updateCell(
      "C8",
      replacePlaceholderWithValue(
        data.C8,
        "salesToCapitalRatio",
        input.salesToCapitalRatio
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.salesToCapitalRatio]);

  useEffect(() => {
    updateCell("C2", input.cagrYearOneToFive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.cagrYearOneToFive]);

  useEffect(() => {
    getColumnsBetween(columns, "C", "L").forEach((column) => {
      const ebitMarginKey = `${column}4`;

      updateCell(
        ebitMarginKey,
        getEBITMarginCalculation(
          input.yearOfConvergence,
          input.ebitTargetMarginInYearTen,
          ebitMarginKey
        )
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.yearOfConvergence, input.ebitTargetMarginInYearTen]);

  return (
    <Table
      enableGhostCells
      numRows={numberOfRows}
      columnWidths={columns.map((column) => {
        if (column === "A") {
          return 220;
        }
        return 120;
      })}
    >
      {columns.map((column) => {
        return (
          <Column
            key={column}
            name={column}
            cellRenderer={cellRenderer(column)}
          />
        );
      })}
    </Table>
  );
};

export default ValuationDCFSheet;
