import { FunctionPlugin, InvalidArgumentsError } from "hyperformula";
import matureMarketEquityRiskPremium from "../../shared/matureMarketEquityRiskPremium";
import dayjs from "dayjs";
import convertSubCurrencyToCurrency from "../../shared/convertSubCurrencyToCurrency";

export const makeFinancialPlugin = (data) => {
  const {
    incomeStatements = {
      ttm: {},
      yearly: {},
    },
    balanceSheets = {
      ttm: {},
      yearly: {},
    },
    cashFlowStatements = {
      ttm: {},
      yearly: {},
    },
    currentEquityRiskPremium,
    currentIndustry,
    general,
    highlights,
    exchangeRates,
    ...financialData
  } = data;

  const lastExchangeRate = exchangeRates
    ? Object.values(exchangeRates)[0].close
    : 1;

  const ttmData = {
    ...financialData,
    ...incomeStatements.ttm,
    ...balanceSheets.ttm,
    ...cashFlowStatements.ttm,
    ...currentEquityRiskPremium,
    ...currentIndustry,
    ...general,
    ...highlights,
    lastExchangeRate,
    matureMarketEquityRiskPremium,
  };

  const historicalDataArrays = {
    incomeStatements: {
      yearly: Object.values(incomeStatements.yearly || {}),
    },
    balanceSheets: {
      yearly: Object.values(balanceSheets.yearly || {}),
    },
    cashFlowStatements: {
      yearly: Object.values(cashFlowStatements.yearly || {}),
    },
  };

  const getTypeOfStatementToUse = (attribute) => {
    if (incomeStatements.ttm[attribute]) {
      return "incomeStatements";
    }

    if (balanceSheets.ttm[attribute]) {
      return "balanceSheets";
    }

    if (cashFlowStatements.ttm[attribute]) {
      return "cashFlowStatements";
    }

    return null;
  };

  class FinancialPlugin extends FunctionPlugin {
    financial({ args }) {
      if (!args.length) {
        return new InvalidArgumentsError(1);
      }

      const attribute = args[0].value;

      // TODO: Add proper error checking here later
      if (args.length === 1) {
        if (attribute === "currencyCode") {
          const currencyCode = ttmData[attribute];

          return convertSubCurrencyToCurrency(currencyCode);
        }

        return ttmData[attribute] || "";
      }

      const startDate = args[1].value;
      const statementType = getTypeOfStatementToUse(attribute);

      if (args.length === 2) {
        if (attribute === "description") {
          return ttmData[attribute];
        }

        return data[statementType].yearly[startDate][attribute] || "";
      }

      const endDate = args[2].value;

      if (args.length === 3) {
        const startDateDayjs = dayjs(startDate);
        const endDateDayjs = dayjs(endDate);

        return historicalDataArrays[statementType].yearly
          .filter(({ date }) => {
            return dayjs(date).isBetween(
              startDateDayjs,
              endDateDayjs,
              "day",
              "[]",
            );
          })
          .map((datum) => datum[attribute]);
      }
    }
  }

  FinancialPlugin.implementedFunctions = {
    FINANCIAL: {
      method: "financial",
    },
  };

  FinancialPlugin.aliases = {
    FIN: "FINANCIAL",
  };

  return FinancialPlugin;
};

export const finTranslations = {
  enGB: {
    FIN: "FIN",
  },
};