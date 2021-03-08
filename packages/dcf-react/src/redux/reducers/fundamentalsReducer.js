import { createReducer } from "@reduxjs/toolkit";
import {
  setLastPriceClose,
  setFundamentals,
  setExchangeRates,
  setTenYearGovernmentBondLastClose,
} from "../actions/fundamentalsActions";

const initialState = {
  governmentBondTenYearYield: null,
  priceLastClose: null,
  general: null,
  highlights: null,
  sharesStats: null,
  balanceSheet: null,
  incomeStatement: null,
  exchangeRates: null,
};

const setFundamentalsReducer = (state, action) => {
  state.general = action.general;
  state.highlights = action.highlights;
  state.sharesStats = action.sharesStats;
  state.incomeStatement = action.incomeStatement;
  state.balanceSheet = action.balanceSheet;
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

export const fundamentalsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLastPriceClose, setLastPriceCloseReducer);
  builder.addCase(setFundamentals, setFundamentalsReducer);
  builder.addCase(
    setTenYearGovernmentBondLastClose,
    setGovernmentBondTenYearLastCloseReducer,
  );
  builder.addCase(setExchangeRates, setExchangeRateReducer);
});
