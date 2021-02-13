import {
  AppBar,
  Box,
  Button,
  Container,
  Hidden,
  Menu,
  MenuItem,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchTicker from "./SearchTicker";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import { ReactComponent as TracktakPurpleSmall } from "../icons/tracktak-logo-small.svg";
import { ReactComponent as TracktakPurple } from "../icons/tracktak-purple.svg";

const rightLinks = [
  { to: "/how-to-do-a-dcf", text: "Docs" },
  { to: "/stock-valuations", text: "Valuations" },
  { to: "/contact-us", text: "Contact" },
  {
    to: "/about-us",
    text: "About us",
  },
];

const allLinks = [...rightLinks];

const useStyles = makeStyles((theme) => ({
  app: {
    padding: "16px 30px",
    background: "#fff",
    transition: "all 0.3s ease-out 0s",
    borderRadius: "10px",
    top: "30px",
    width: "100%",
    position: "relative",
    boxShadow: "none",
  },
}));

const HeaderLink = ({ to, text, sx }) => {
  return (
    <Box sx={{ mx: 1, whiteSpace: "nowrap", ...sx }}>
      <Button
        style={{
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 600,
          color: "#313450",
        }}
        to={to}
        component={Link}
      >
        {text}
      </Button>
    </Box>
  );
};

const Header = ({ hideSearch }) => {
  const classes = useStyles();
  const theme = useTheme();
  const extraMargin = 20;
  const mb = `${theme.mixins.toolbar.minHeight + extraMargin}px`;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar className={classes.app}>
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "left",
            }}
          >
            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
              <Hidden mdDown>
                <TracktakPurple src="icons/tracktak-purple.svg" alt="" />
              </Hidden>
              <Hidden mdUp>
                <Link to="/">
                  <TracktakPurpleSmall width={52} height={38} />
                </Link>
              </Hidden>
            </Box>
            <Box
              sx={{ flex: "0 1 450px", minWidth: "120px", ml: 1, mr: "auto" }}
            >
              {!hideSearch && <SearchTicker removeInputPadding />}
            </Box>
            <Hidden mdDown>
              {rightLinks.map((link, i) => (
                <HeaderLink sx={{ ml: i === 0 ? 2 : 0 }} {...link} />
              ))}
            </Hidden>
            <Hidden mdUp>
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MenuIcon color="primary" />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {allLinks.map((link) => (
                    <MenuItem
                      to={link.to}
                      component={Link}
                      onClick={handleClose}
                    >
                      {link.text}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Hidden>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
