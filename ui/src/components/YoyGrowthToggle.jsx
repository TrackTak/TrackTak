import React from "react";
import selectIsYoyGrowthToggled from "../selectors/dcfSelectors/selectIsYoyGrowthToggled";
import {
  setIsShowFormulasToggled,
  setIsYoyGrowthToggled,
} from "../redux/actions/dcfActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const YoyGrowthToggle = () => {
  const dispatch = useDispatch();
  const isYoyGrowthToggled = useSelector(selectIsYoyGrowthToggled);
  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={isYoyGrowthToggled}
            onChange={() => {
              dispatch(setIsYoyGrowthToggled(!isYoyGrowthToggled));
              dispatch(setIsShowFormulasToggled(false));
            }}
            color="primary"
          />
        }
        label="%YOY Growth"
      />
    </>
  );
};

export default YoyGrowthToggle;
