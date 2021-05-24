import { createReducer } from "@reduxjs/toolkit";
import {
  setLastPriceClose,
  setFundamentals,
  setExchangeRates,
  setTenYearGovernmentBondLastClose,
  setRndAdjustmentToOperatingIncome,
} from "../actions/fundamentalsActions";

const initialState = {
  governmentBondTenYearYield: null,
  priceLastClose: null,
  general: null,
  highlights: null,
  sharesStats: null,
  exchangeRates: null,
  balanceSheet: null,
  incomeStatement: null,
  cashFlowStatement: null,
  rndAdjustmentToOperatingIncome: null,
};

const setFundamentalsReducer = (state, action) => {
  const {
    general,
    highlights,
    sharesStats,
    incomeStatement,
    balanceSheet,
    cashFlowStatement,
  } = action.payload;

  state.general = general;
  state.highlights = highlights;
  state.sharesStats = sharesStats;
  state.incomeStatement = incomeStatement;
  state.balanceSheet = balanceSheet;
  state.cashFlowStatement = cashFlowStatement;
};

const setLastPriceCloseReducer = (state, action) => {
  const priceLastClose = action.payload;

  state.priceLastClose = priceLastClose;
};

const setGovernmentBondTenYearLastCloseReducer = (
  state,
  { payload = null },
) => {
  state.governmentBondTenYearYield = payload / 100;
};

const setExchangeRateReducer = (state, { payload = {} }) => {
  const values = Object.values(payload);

  if (values.length) {
    state.exchangeRates = payload;
  } else {
    state.exchangeRates = null;
  }
};

const setRndAdjustmentToOperatingIncomeReducer = (state, action) => {
  const rndAdjustmentToOperatingIncome = action.payload;

  state.rndAdjustmentToOperatingIncome = rndAdjustmentToOperatingIncome;
};

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLastPriceClose, setLastPriceCloseReducer);
  builder.addCase(setFundamentals, setFundamentalsReducer);

  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer,
  );
  builder.addCase(setExchangeRates, setExchangeRateReducer);
  builder.addCase(
    setRndAdjustmentToOperatingIncome,
    setRndAdjustmentToOperatingIncomeReducer,
  );
});
