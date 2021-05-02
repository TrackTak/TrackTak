import {
  setCells,
  setIsYoyGrowthToggled,
  setScope,
} from "../actions/dcfActions";
import {
  getCellsBetween,
  getPreviousRowCellKey,
} from "../../discountedCashFlow/utils";
import isNil from "lodash/isNil";
import { createReducer } from "@reduxjs/toolkit";
import cells from "../../discountedCashFlow/cells";

const initialState = {
  cells,
  isYoyGrowthToggled: false,
  scope: {},
};

export const dcfReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCells, (state, { payload }) => {
    state.cells = payload;
  });
  builder.addCase(setScope, (state, { payload }) => {
    state.scope = {
      ...state.scope,
      ...payload,
    };
  });
  builder.addCase(setIsYoyGrowthToggled, (state, { payload }) => {
    state.isYoyGrowthToggled = payload;

    const cellsBetween = getCellsBetween("C", "M", 2, 17, state.cells);

    cellsBetween.forEach((key) => {
      const currentCell = state.cells[key];
      const previousCellKey = getPreviousRowCellKey(key);
      const previousCell = state.cells[previousCellKey];

      if (!isNil(previousCell.value)) {
        state.cells[key].yoyGrowthValue =
          (currentCell.value - previousCell.value) / currentCell.value;
      }
    });
  });
});
