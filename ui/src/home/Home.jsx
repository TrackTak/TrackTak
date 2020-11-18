import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

const TickerTextField = withStyles({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
})(TextField);

const SubmitButton = withStyles({
  root: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    position: "relative",
    right: "1px",
  },
})(Button);

const Home = () => {
  return (
    <>
      <Box>
        <Box display="flex" mt={0.5} mb={1.5}>
          <TickerTextField
            variant="filled"
            label="Enter the stocks ticker e.g. AMZN"
            fullWidth
          />
          <SubmitButton
            color="primary"
            variant="contained"
            size="large"
            css="margin-left: 10px;"
          >
            SUBMIT
          </SubmitButton>
        </Box>
      </Box>
      <Typography color="textSecondary">
        * This must be a yahoo finance ticker
      </Typography>
    </>
  );
};

export default Home;
