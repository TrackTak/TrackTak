import { getMore } from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { makeIconItem } from "./makeIconItem";
import { makeToggleItem } from "./makeToggleItem";
import { getDropdownItem } from "./getDropdownItem";
import { makeDropdownBorder } from "../makeDropdownBorder";
import { makeDropdownColor } from "../makeDropdownColor";
import { makeDropdownFontSize } from "../makeDropdownFontSize";
import { makeDropdownFont } from "../makeDropdownFont";
import { makeDropdownFormula } from "../makeDropdownFormula";
import { makeDropdownAlign } from "../makeDropdownAlign";
import { buildDivider } from "./buildDivider";
import { buildUndo } from "./buildUndo";
import { buildRedo } from "./buildRedo";
import { buildFormat } from "./buildFormat";
import { buildItems } from "./buildItems";
import { resize } from "./resize";

export const toolbarHeight = 41;

export const getToolbar = (sheetEl, options, eventEmitter, isHide = false) => {
  const widthFn = options.view.width;
  let data;
  const style = options.style;

  const getIconItem = makeIconItem(eventEmitter);
  const getToggleItem = makeToggleItem(eventEmitter);
  const toolbarType = "toolbar";

  const undoEl = buildUndo(eventEmitter, toolbarType);
  const redoEl = buildRedo(eventEmitter, toolbarType);
  const formatEl = buildFormat(options.formats, eventEmitter, toolbarType);
  const printEl = getIconItem("print", "Ctrl+P");
  const paintformatEl = getToggleItem("paintformat");
  const clearformatEl = getIconItem("clearformat");
  const fontEl = getDropdownItem("font-name", makeDropdownFont(eventEmitter));
  const fontSizeEl = getDropdownItem(
    "font-size",
    makeDropdownFontSize(eventEmitter),
  );
  const boldEl = getToggleItem("font-bold", "Ctrl+B");
  const italicEl = getToggleItem("font-italic", "Ctrl+I");
  const underlineEl = getToggleItem("underline", "Ctrl+U");
  const strikeEl = getToggleItem("strike", "Ctrl+S");
  const textColorEl = getDropdownItem(
    "color",
    makeDropdownColor("color", style.color, eventEmitter),
  );
  const fillColorEl = getDropdownItem(
    "bgcolor",
    makeDropdownColor("bgcolor", style.bgcolor, eventEmitter),
  );
  const borderEl = getDropdownItem("border", makeDropdownBorder(eventEmitter));
  const mergeEl = getToggleItem("merge");
  const alignEl = getDropdownItem(
    "align",
    makeDropdownAlign(["left", "center", "right"], style.align, eventEmitter),
  );
  const valignEl = getDropdownItem(
    "valign",
    makeDropdownAlign(["top", "middle", "bottom"], style.valign, eventEmitter),
  );
  const textwrapEl = getToggleItem("textwrap");
  const freezeEl = getToggleItem("freeze");
  const autofilterEl = getToggleItem("autofilter");
  const formulaEl = getDropdownItem(
    "formula",
    makeDropdownFormula(eventEmitter),
  );
  const moreEl = getMore();
  const items = [
    [formatEl],
    buildDivider(),
    [undoEl, redoEl, printEl, paintformatEl, clearformatEl],
    buildDivider(),
    [fontEl, fontSizeEl],
    buildDivider(),
    [boldEl, italicEl, underlineEl, strikeEl, textColorEl],
    buildDivider(),
    [fillColorEl, borderEl, mergeEl],
    buildDivider(),
    [alignEl, valignEl, textwrapEl],
    buildDivider(),
    [freezeEl, autofilterEl, formulaEl, moreEl],
  ];

  const el = h("div", `${cssPrefix}-toolbar`);
  const buttonsEl = h("div", `${cssPrefix}-toolbar-btns`);

  sheetEl.before(el);

  buildItems(items, buttonsEl);

  el.child(buttonsEl);

  const paintformatActive = () => {
    return paintformatEl.toggleItem.active();
  };

  const paintformatToggle = () => {
    paintformatEl.toggleItem.toggle();
  };

  const resetData = (datum) => {
    data = datum;
    reset(isHide, data, undoEl, redoEl, formatEl);
  };

  const reset = () => {
    if (isHide) return;
    const style = data.getSelectedCellStyle();

    undoEl.iconItem.setDisabled(!data.canUndo());
    redoEl.iconItem.setDisabled(!data.canRedo());
    mergeEl.toggleItem.setActive(data.canUnmerge());
    mergeEl.item.el.disabled(!data.selector.multiple());
    autofilterEl.toggleItem.setActive(!data.canAutofilter());

    const { font, format } = style;

    formatEl.dropdown.setTitle(format);
    fontEl.dropdown.dropdown.setTitle(font.name);
    fontSizeEl.dropdown.dropdown.setTitle(font.size);
    boldEl.toggleItem.setActive(font.bold);
    italicEl.toggleItem.setActive(font.italic);
    underlineEl.toggleItem.setActive(style.underline);
    strikeEl.toggleItem.setActive(style.strike);
    textColorEl.dropdown.setTitle(style.color);
    fillColorEl.dropdown.setTitle(style.bgcolor);
    alignEl.dropdown.setTitle(style.align);
    valignEl.dropdown.setTitle(style.valign);
    textwrapEl.toggleItem.setActive(style.textwrap);
    freezeEl.toggleItem.setActive(data.freezeIsActive());
  };

  return {
    paintformatActive,
    paintformatToggle,
    el,
    reset,
    resetData,
    strikeEl,
    underlineEl,
    boldEl,
    italicEl,
    resize: () => resize(isHide, items, reset, el, buttonsEl, moreEl, widthFn),
  };
};