import { getTable } from "../table/getTable";
import withToolbar from "../withToolbar";
import { getSheet } from "../getSheet";
import { makeGetDataProxy } from "../../core/makeGetDataProxy";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { getBottombar } from "../bottombar";
import { buildSheet } from "./buildSheet";
import { buildDataProxy } from "./buildDataProxy";
import { buildVariablesSpreadsheet } from "./buildVariablesSpreadsheet";
import EventEmitter from "events";
import { modifyEventEmitter } from "../../shared/modifyEventEmitter";
import { getNewOptions } from "./getNewOptions";
import { defaultOptions } from "../../core/defaultOptions";
import { makeGetViewWidthHeight } from "../makeGetSheetViewWidthHeight";
import getDraw from "../../canvas/draw";

export const buildSpreadsheet = (
  rootEl,
  options,
  hyperformula,
  variablesSpreadsheetOptions,
) => {
  let newData;
  let newOptions;

  const eventEmitter = new EventEmitter();

  const getOptions = () => newOptions;

  const setOptions = (options) => {
    newOptions = getNewOptions(
      options,
      defaultOptions,
      hyperformula,
      newData,
      sheet,
    );
  };

  setOptions(options);

  modifyEventEmitter(eventEmitter, getOptions().debugMode, "spreadsheet");

  eventEmitter.on(spreadsheetEvents.sheet.switchData, (data) => {
    newData = data;
  });

  eventEmitter.on(spreadsheetEvents.sheet.addData, (_, __, data) => {});

  const getData = () => newData;

  const getViewWidthHeight = makeGetViewWidthHeight(getOptions, () => {
    return variablesSpreadsheet.getOptions();
  });

  const table = getTable(
    getOptions,
    getData,
    hyperformula,
    eventEmitter,
    getViewWidthHeight,
  );

  const sheetBuilder = buildSheet(getOptions, getData, eventEmitter);

  const dataProxyBuilder = buildDataProxy(getOptions, getData, hyperformula);

  const getDataProxy = makeGetDataProxy(
    dataProxyBuilder,
    hyperformula,
    getOptions,
    eventEmitter,
    getViewWidthHeight,
  );

  const { sheet, toolbar } = withToolbar(
    getSheet(
      sheetBuilder,
      rootEl,
      table,
      eventEmitter,
      hyperformula,
      getOptions,
      getData,
      getDataProxy,
      getViewWidthHeight,
    ),
    variablesSpreadsheetOptions,
  );

  const variablesSpreadsheet = buildVariablesSpreadsheet(
    sheet.el,
    rootEl,
    variablesSpreadsheetOptions,
    hyperformula,
  );

  const draw = getDraw(
    table.el.el,
    getViewWidthHeight().width,
    getViewWidthHeight().height,
  );

  table.setDraw(draw);

  const setDatasheets = sheet.makeSetDatasheets(getDataProxy);

  const bottombar = getBottombar(eventEmitter);

  sheet.el.before(toolbar.el);
  sheet.el.after(bottombar.el);

  return {
    sheet,
    toolbar,
    variablesSpreadsheet,
    rootEl,
    setDatasheets,
    setOptions,
    hyperformula,
    eventEmitter,
  };
};
