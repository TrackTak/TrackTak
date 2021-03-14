import React, { useState, useEffect, Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import { Box, ListItemText, useMediaQuery } from "@material-ui/core";
import wikiContent from "../data/wikiContent";
import { replaceSpaceWithHyphen } from "@tracktak/dcf-react";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { navigate } from "gatsby";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  const top = theme.mixins.toolbar.minHeight - 2;

  return {
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.down(1550)]: {
        width: ({ open }) => (open ? drawerWidth : "initial"),
      },
    },
    drawerPaper: {
      top,
      width: drawerWidth,
      height: `calc(100% - ${top}px)`,
    },
    menuButton: {
      position: "fixed",
      padding: 0,
      left: 0,
      top: theme.mixins.toolbar.minHeight + 10,
    },
  };
});

const removeNonHashableChars = (str) => {
  const newStr = replaceSpaceWithHyphen(str);

  return newStr.replace(/\?|\(|\)|,|&/g, "");
};

const Docs = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ open });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>{getTitle("How to do a Discounted Cash Flow (DCF)")}</title>
        <link rel="canonical" href={`${resourceName}/how-to-do-a-dcf`} />
      </Helmet>
      <Box className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant={isOnMobile ? "persistent" : "permanent"}
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {isOnMobile && (
            <>
              <Box className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </Box>
              <Divider />
            </>
          )}
          <List>
            {wikiContent.map(({ title }) => {
              const to = `/how-to-do-a-dcf#${removeNonHashableChars(title)}`;

              return (
                <ListItem
                  key={title}
                  component={AnchorLink}
                  onAnchorLinkClick={() => {
                    navigate(to);
                  }}
                  to={to}
                  button
                >
                  <ListItemText primary={title} />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        {isOnMobile && (
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
          >
            <ChevronRightIcon />
          </IconButton>
        )}
        <Box component="main">
          {wikiContent.map(({ title, text, cellsText = "" }) => {
            return (
              <Fragment key={title}>
                <Typography
                  variant="h6"
                  gutterBottom
                  id={removeNonHashableChars(title)}
                >
                  {cellsText ? title.concat(` - Cells: ${cellsText}`) : title}
                </Typography>
                <Typography paragraph>{text}</Typography>
              </Fragment>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
export default Docs;