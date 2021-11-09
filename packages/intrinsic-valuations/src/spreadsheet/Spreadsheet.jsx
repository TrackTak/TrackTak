import React, { useState } from "react";
import { useEffect } from "react";
import { Box } from "@material-ui/core";
import { AlwaysSparse, HyperFormula } from "hyperformula";
import "@tracktak/powersheet/dist/index.css";
import {
  Spreadsheet as PowerSpreadsheet,
  Toolbar,
  FormulaBar,
  Exporter,
  BottomBar,
  FunctionHelper,
} from "@tracktak/powersheet";
import { currencySymbolMap } from "currency-symbol-map";
import {
  finTranslations,
  getTTFinancialPlugin,
  ttFinancialAliases,
  ttFinancialImplementedFunctions,
} from "./plugins/getTTFinancialPlugin";
import finFunctionHelperData from "./templates/finFunctionHelperData";
import "./Spreadsheet.css";

const buildPowersheet = () => {
  const hyperformula = HyperFormula.buildEmpty({
    chooseAddressMappingPolicy: new AlwaysSparse(),
    // We use our own undo/redo instead
    undoLimit: 0,
    licenseKey: "gpl-v3",
  });

  const trueArgs = ["TRUE", "=TRUE()"];
  const falseArgs = ["FALSE", "=FALSE()"];

  if (hyperformula.isItPossibleToAddNamedExpression(...trueArgs)) {
    hyperformula.addNamedExpression(...trueArgs);
  }

  if (hyperformula.isItPossibleToAddNamedExpression(...falseArgs)) {
    hyperformula.addNamedExpression(...falseArgs);
  }

  const functionHelper = new FunctionHelper(finFunctionHelperData);
  const toolbar = new Toolbar();
  const formulaBar = new FormulaBar();
  const exporter = new Exporter([
    {
      implementedFunctions: ttFinancialImplementedFunctions,
      aliases: ttFinancialAliases,
    },
  ]);
  const bottomBar = new BottomBar();

  const spreadsheet = new PowerSpreadsheet({
    hyperformula,
    toolbar,
    formulaBar,
    exporter,
    bottomBar,
    functionHelper,
    hyperformulaConfig: {
      currencySymbol: Object.values(currencySymbolMap),
    },
  });

  toolbar.setToolbarIcons([
    {
      elements: [
        toolbar.iconElementsMap.undo.buttonContainer,
        toolbar.iconElementsMap.redo.buttonContainer,
      ],
    },
    {
      elements: [toolbar.buttonElementsMap.textFormatPattern.buttonContainer],
    },
    {
      elements: [toolbar.buttonElementsMap.fontSize.buttonContainer],
    },
    {
      elements: [
        toolbar.iconElementsMap.bold.buttonContainer,
        toolbar.iconElementsMap.italic.buttonContainer,
        toolbar.iconElementsMap.underline.buttonContainer,
        toolbar.iconElementsMap.strikeThrough.buttonContainer,
        toolbar.iconElementsMap.fontColor.buttonContainer,
      ],
    },
    {
      elements: [
        toolbar.iconElementsMap.backgroundColor.buttonContainer,
        toolbar.iconElementsMap.borders.buttonContainer,
        toolbar.iconElementsMap.merge.buttonContainer,
      ],
    },
    {
      elements: [
        toolbar.iconElementsMap.horizontalTextAlign.buttonContainer,
        toolbar.iconElementsMap.verticalTextAlign.buttonContainer,
        toolbar.iconElementsMap.textWrap.buttonContainer,
      ],
    },
    {
      elements: [
        toolbar.iconElementsMap.freeze.buttonContainer,
        toolbar.iconElementsMap.functions.buttonContainer,
        toolbar.iconElementsMap.formula.buttonContainer,
      ],
    },
    {
      elements: [toolbar.iconElementsMap.export.buttonContainer],
    },
    {
      elements: [toolbar.iconElementsMap.autosave.buttonContainer],
    },
    {
      elements: [toolbar.iconElementsMap.functionHelper.buttonContainer],
    },
  ]);

  spreadsheet.spreadsheetEl.prepend(formulaBar.formulaBarEl);
  spreadsheet.spreadsheetEl.prepend(toolbar.toolbarEl);
  spreadsheet.spreadsheetEl.appendChild(bottomBar.bottomBarEl);
  spreadsheet.sheets.sheetEl.appendChild(functionHelper.functionHelperEl);

  spreadsheet.functionHelper.setDrawer();

  return spreadsheet;
};

const Spreadsheet = ({ sheetData, financialData, saveSheetData, ...props }) => {
  const [spreadsheet, setSpreadsheet] = useState();
  const [containerEl, setContainerEl] = useState();
  const currencySymbol = financialData?.general?.currencySymbol;
  const name = sheetData?.name;

  useEffect(() => {
    const FinancialPlugin = getTTFinancialPlugin(financialData);

    HyperFormula.registerFunctionPlugin(FinancialPlugin, finTranslations);

    spreadsheet?.hyperformula.rebuildAndRecalculate();
    spreadsheet?.updateViewport();

    return () => {
      HyperFormula.unregisterFunctionPlugin(FinancialPlugin);
    };
  }, [financialData, spreadsheet]);

  useEffect(() => {
    const spreadsheet = buildPowersheet();

    setSpreadsheet(spreadsheet);

    return () => {
      spreadsheet?.destroy();
      spreadsheet?.hyperformula.destroy();
    };
  }, []);

  useEffect(() => {
    const persistData = async (sheetData, done) => {
      await saveSheetData(sheetData);

      done();
    };

    spreadsheet?.eventEmitter.on("persistData", persistData);

    return () => {
      spreadsheet?.eventEmitter.off("persistData", persistData);
    };
  }, [saveSheetData, spreadsheet]);

  useEffect(() => {
    if (spreadsheet && sheetData) {
      if (containerEl) {
        containerEl.appendChild(spreadsheet.spreadsheetEl);
        spreadsheet.setData(sheetData.data);
        spreadsheet.initialize();

        if (sheetData.data) {
          // TODO: Figure out why setTimeout needed
          // raise an issue with material components
          setTimeout(() => {
            spreadsheet?.setOptions({
              showFunctionHelper: true,
            });
          }, 500);
        }
      }
    }
  }, [containerEl, sheetData, spreadsheet]);

  useEffect(() => {
    const options = {
      exportSpreadsheetName: `${name}.xlsx`,
      textPatternFormats: {
        currency: `${currencySymbol}#,##0.##`,
        million: "#,###.##,,",
        "million-currency": `${currencySymbol}#,###.##,,`,
      },
    };

    spreadsheet?.setOptions(options);
  }, [currencySymbol, name, spreadsheet]);

  if (!spreadsheet) return null;

  return <Box {...props} ref={setContainerEl} />;
};

export default Spreadsheet;
