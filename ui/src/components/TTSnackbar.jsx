import React from "react";
import { Snackbar, Alert, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import selectSnackbars from "../selectors/selectSnackbars";
import { clearMessage } from "../redux/actions/snackbarsActions";

const TTSnackbar = () => {
  const snackbar = useSelector(selectSnackbars)[0];
  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    dispatch(clearMessage());
  };

  return snackbar ? (
    <Box
      sx={{
        "& .MuiSnackbar-root": {
          top: (theme) => `${theme.mixins.toolbar.minHeight + 4}px`,
          "& .MuiSnackbarContent-message": {
            margin: "0 auto",
          },
        },
      }}
    >
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!snackbar.message}
        onClose={handleClose}
      >
        {snackbar.message && (
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        )}
      </Snackbar>
    </Box>
  ) : null;
};

export default TTSnackbar;
