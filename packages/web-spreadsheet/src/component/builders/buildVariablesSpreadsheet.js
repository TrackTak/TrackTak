import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import { modifyEventEmitter } from "../../shared/modifyEventEmitter";
import { getNewOptions } from "./getNewOptions";
import { defaultVariablesSpreadsheetOptions } from "../../core/defaultOptions";
import { getTable } from "../table/getTable";
import { makeGetVariablesSheetViewWidthHeight } from "../makeGetVariablesSheetViewWidthHeight";
import getDraw from "../../canvas/draw";
import { cssPrefix } from "../../config";

export const buildVariablesSpreadsheet = (
  eventEmitter,
  toolbar,
  formulaBar,
  print,
  mainSheet,
  rootEl,
  options,
  hyperformula,
) => {
  let newData;
  let newOptions;

  const getOptions = () => newOptions;

  const setOptions = (options) => {
    newOptions = getNewOptions(
      options,
      defaultVariablesSpreadsheetOptions,
      hyperformula,
      newData,
      sheet,
    );
  };

  setOptions(options);

  modifyEventEmitter(
    eventEmitter,
    getOptions().debugMode,
    "variablesSpreadsheet",
  );

  const getViewWidthHeight = makeGetVariablesSheetViewWidthHeight(getOptions);

  const getData = () => {
    return newData;
  };

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  const table = getTable(getOptions, getData, hyperformula, getViewWidthHeight);

  const draw = getDraw(
    table.el.el,
    getViewWidthHeight().width,
    getViewWidthHeight().height,
  );

  table.setDraw(draw);

  const sheetBuilder = buildSheet(
    getOptions,
    getData,
    eventEmitter,
    getViewWidthHeight,
  );

  const dataProxyBuilder = buildDataProxy(getOptions, getData, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    hyperformula,
    getOptions,
    eventEmitter,
    getViewWidthHeight,
  );

  const { sheet } = getSheet(
    toolbar,
    print,
    sheetBuilder,
    rootEl,
    table,
    eventEmitter,
    hyperformula,
    getOptions,
    getData,
    getDataProxy,
    getViewWidthHeight,
    () => {
      mainSheet.setLastFocused(false);
    },
  );

  sheet.el.addClass(`${cssPrefix}-variables-sheet`);

  const setVariableDatasheets = sheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(eventEmitter, sheet.getDataValues, () =>
    getData().getData(),
  );

  mainSheet.el.before(toolbar.el);
  mainSheet.el.before(formulaBar.el);
  mainSheet.el.before(sheet.el);
  mainSheet.el.before(bottombar.el);

  return {
    sheet,
    rootEl,
    setVariableDatasheets,
    setOptions,
    getOptions,
    eventEmitter,
    getData,
  };
};
