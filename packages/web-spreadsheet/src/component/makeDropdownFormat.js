import { getDropdown } from "./getDropdown";
import { h } from "./element";
import { cssPrefix } from "../config";
import spreadsheetEvents from "../core/spreadsheetEvents";

export const makeDropdownFormat = (formats, eventEmitter) => (tag) => {
  let nformats = Object.values(formats).slice(0);

  nformats.splice(2, 0, { key: "divider" });
  nformats.splice(8, 0, { key: "divider" });

  const setTitle = (formatKey) => {
    Object.keys(formats).forEach((key) => {
      if (formatKey === key) {
        dropdown.title.html(formats[key].title());
      }
    });

    dropdown.hide();
  };

  nformats = nformats.map((it) => {
    const item = h("div", `${cssPrefix}-item`);
    if (it.key === "divider") {
      item.addClass("divider");
    } else {
      item.child(it.title()).on("click", () => {
        setTitle(it.title());

        eventEmitter.emit(
          spreadsheetEvents.toolbar.formatChange,
          tag,
          it.title().toLowerCase(),
        );
      });
      if (it.label) {
        item.child(h("div", "label").html(it.label));
      }
    }
    return item;
  });

  const dropdown = getDropdown(
    "Normal",
    "220px",
    true,
    "bottom-left",
    ...nformats,
  );

  return {
    dropdown,
    formats,
    setTitle,
  };
};
