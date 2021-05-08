import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TracktakLogoSvg from "../assets/tracktak-purple.svg";
import RoundButton from "./RoundButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import { useFormStyles } from "./Form.styles";
import { useTheme } from "@material-ui/styles";

const SignUpForm = ({ onSubmit, onSwitchToSignInClick }) => {
  const theme = useTheme()
  const classes = useFormStyles(theme);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    onSubmit(e, {
      name,
      email,
      password,
    });
  };

  return (
    <div className={classes.paper}>
      <TracktakLogoSvg />
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              name="name"
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <RoundButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </RoundButton>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography component="div" display="block">
              Or sign up with
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <FacebookIcon className={classes.facebookIcon} fontSize="large" />
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Button
              color="primary"
              disableRipple
              className={classes.link}
              onClick={onSwitchToSignInClick}
              type="button"
            >
              Already have an account? Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SignUpForm;
