import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import RoundButton from "./RoundButton";
import { useTheme } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import TracktakLogoSvg from "../icons/tracktak-purple.svg";
import GoogleIcon from "@material-ui/icons/Google";
import FacebookIcon from "@material-ui/icons/Facebook";

const SignInForm = ({
  onSubmit,
  onSwitchToSignUpClick,
  onSwitchToForgotPasswordClick,
}) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e, {
      email,
      password,
    });
  };

  const handleGoogleLogin = () => {
    window.open(process.env.GATSBY_SOCIAL_LOGIN_GOOGLE);
  };

  const handleFacebookLogin = () => {
    window.open(process.env.GATSBY_SOCIAL_LOGIN_FACEBOOK);
  };

  return (
    <Box
      sx={{
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TracktakLogoSvg />
      <Typography
        variant="h5"
        sx={{
          mt: (theme) => theme.spacing(1),
          color: (theme) => theme.palette.primary.mainTextColor,
        }}
      >
        Sign in
      </Typography>
      <Box
        sx={{
          marginTop: theme.spacing(3),
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                sx={{
                  display: "flex",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{
                  display: "flex",
                }}
              />
            </Grid>
          </Grid>
          <RoundButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              margin: theme.spacing(3, 0, 2),
              textTransform: "none",
            }}
          >
            Sign In
          </RoundButton>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component="div" display="block">
                Or sign in with
              </Typography>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item onClick={handleGoogleLogin}>
                <GoogleIcon
                  fontSize="large"
                  sx={{
                    color: theme.palette.icons.google,
                    cursor: "pointer",
                  }}
                />
              </Grid>
              <Grid item onClick={handleFacebookLogin}>
                <FacebookIcon
                  fontSize="large"
                  sx={{
                    color: theme.palette.icons.facebook,
                    cursor: "pointer",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                color="primary"
                disableRipple
                sx={{
                  textTransform: "none",
                }}
                onClick={onSwitchToForgotPasswordClick}
                type="button"
              >
                Forgot Password
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                disableRipple
                sx={{
                  textTransform: "none",
                }}
                onClick={onSwitchToSignUpClick}
                type="button"
              >
                Don't have an account? Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default SignInForm;
