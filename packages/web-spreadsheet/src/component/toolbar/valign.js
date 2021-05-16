import DropdownItem from "./dropdown_item";
import DropdownAlign from "../dropdown_align";

export default class Valign extends DropdownItem {
  constructor(formats, value) {
    super(formats, "valign", "", value);
  }

  dropdown() {
    const { value } = this;
    return new DropdownAlign(["top", "middle", "bottom"], value);
  }
}
