import { createReducer } from "@reduxjs/toolkit";
import { clearMessage, setMessage } from "../actions/snackbarsActions";

const initialState = [];

export const snackbarsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setMessage, (state, action) => {
    const { message, severity = "info" } = action.payload;
    state.push({
      severity,
      message,
    });
  });
  builder.addCase(clearMessage, (state) => {
    state.shift();
  });
});
