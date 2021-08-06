import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createFinancialData, getFinancialData } from "../api/api";
import { getAccessToken } from "./useAuth";
import convertStockAPIData from "../../../packages/intrinsic-valuations/src/shared/convertStockAPIData";
import {
  finTranslations,
  getTTFinancialPlugin,
} from "../../../packages/intrinsic-valuations/src/spreadsheet/plugins/getTTFinancialPlugin";
import {
  getExchangeRatesThunk,
  getFundamentalsThunk,
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../../../packages/intrinsic-valuations/src/redux/thunks/stockThunks";
import { HyperFormula } from "hyperformula";

export const useTTFinancialPlugin = (spreadsheet, spreadsheetData) => {
  const [financialData, setFinancialData] = useState();
  const [hasLoadedFinancialData, setHasLoadedFinancialData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const { id, ticker } = spreadsheetData?.financialData ?? {};

    const fetchData = async (callback) => {
      setHasLoadedFinancialData(false);

      const { data } = await callback();

      setFinancialData(data.financialData);
      setHasLoadedFinancialData(true);
    };

    if (id) {
      const fetchFinancials = async () => {
        return await getFinancialData(id);
      };

      fetchData(fetchFinancials);
    } else if (ticker) {
      const fetchCreateNewFinancials = async () => {
        const { payload: fundamentals } = await dispatch(
          getFundamentalsThunk({
            ticker,
          }),
        );

        const values = await Promise.all([
          dispatch(
            getExchangeRatesThunk({
              currencyCode: fundamentals.general.currencyCode,
              incomeStatement: fundamentals.incomeStatement,
              balanceSheet: fundamentals.balanceSheet,
            }),
          ),
          dispatch(
            getLastPriceCloseThunk({
              ticker,
            }),
          ),

          dispatch(
            getTenYearGovernmentBondLastCloseThunk({
              countryISO: fundamentals.general.countryISO,
            }),
          ),
          getAccessToken(),
        ]);

        const financialData = convertStockAPIData(
          fundamentals,
          values[0].payload,
          values[1].payload,
          values[2].payload,
        );

        const token = values[3];

        return await createFinancialData(
          financialData,
          token?.jwtToken,
          spreadsheetData._id,
        );
      };

      fetchData(fetchCreateNewFinancials);
    }
  }, [dispatch, spreadsheetData]);

  useEffect(() => {
    const FinancialPlugin = getTTFinancialPlugin(
      financialData,
      hasLoadedFinancialData,
    );

    HyperFormula.registerFunctionPlugin(FinancialPlugin, finTranslations);

    if (spreadsheet) {
      spreadsheet.hyperformula.rebuildAndRecalculate();
      spreadsheet.reset();
    }

    return () => {
      HyperFormula.unregisterFunctionPlugin(FinancialPlugin);
    };
  }, [financialData, hasLoadedFinancialData, spreadsheet]);

  return financialData;
};