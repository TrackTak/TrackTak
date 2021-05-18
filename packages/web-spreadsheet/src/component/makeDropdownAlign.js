import { getDropdown } from "./dropdown";
import { h } from "./element";
import { cssPrefix } from "../config";
import getIcon from "./getIcon";
import spreadsheetEvents from "../core/spreadsheetEvents";

function buildItemWithIcon(iconName) {
  return h("div", `${cssPrefix}-item`).child(getIcon(iconName));
}

export const makeDropdownAlign = (aligns, align, eventEmitter) => (tag) => {
  const icon = getIcon(`align-${align}`);
  const naligns = aligns.map((it) => {
    const name = `align-${it}`;

    return buildItemWithIcon(name).on("click", () => {
      eventEmitter.emit(spreadsheetEvents.toolbar.alignChange, tag, it);
    });
  });

  const dropdown = getDropdown(icon, "auto", true, "bottom-left", ...naligns);

  const setTitle = (align) => {
    icon.setName(`align-${align}`);
    dropdown.hide();
  };

  return {
    dropdown,
    setTitle,
  };
};
