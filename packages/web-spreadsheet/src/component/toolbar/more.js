import Dropdown from "../dropdown";
import DropdownItem from "./dropdown_item";

import { cssPrefix } from "../../config";
import { h } from "../element";
import getIcon from "../icon";

class DropdownMore extends Dropdown {
  constructor() {
    const icon = getIcon("ellipsis");
    const moreBtns = h("div", `${cssPrefix}-toolbar-more`);
    super(icon, "auto", false, "bottom-right", moreBtns);
    this.moreBtns = moreBtns;
    this.contentEl.css("max-width", "420px");
  }
}

export default class More extends DropdownItem {
  constructor(formats) {
    super(formats, "more");
    this.el.hide();
  }

  dropdown() {
    return new DropdownMore();
  }

  show() {
    this.el.show();
  }

  hide() {
    this.el.hide();
  }
}
