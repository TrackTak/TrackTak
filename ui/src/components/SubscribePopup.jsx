import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import SubscribeMailingList from "./SubscribeMailingList";
import { setItem, getItem } from "../shared/guardedLocalStorage";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";

const SubscribePopup = () => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const subscribePopupShown = getItem("subscribePopupShown");
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();

  const handleClose = (_, reason) => {
    if (reason !== "backdropClick") {
      setItem("subscribePopupShown", "true");
      setOpen(false);
    }
  };

  return subscribePopupShown !== "true" && hasAllRequiredInputsFilledIn ? (
    <Dialog
      open={open}
      fullScreen={isOnMobile}
      onClose={handleClose}
      aria-labelledby="subscribe-popup-title"
    >
      <DialogTitle id="subscribe-popup-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          Want new features and <b>free</b> valuations immediately?
        </DialogContentText>
        <SubscribeMailingList subscribeText="Sign Up" locationSignup="Popup" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};

export default SubscribePopup;
