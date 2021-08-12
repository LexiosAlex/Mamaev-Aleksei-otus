import React from "react";

import Link from "next/link";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { AppBar, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = makeStyles((theme) => ({
  header: {
    padding: "0 20px",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.light,
  },
  logoContainer: {
    margin: "20px",
    cursor: "pointer",
    letterSpacing: 5,
    textTransform: "upperCase",
  },
  navItemContainer: {
    margin: "0 20px",
  },
  navLink: {
    color: theme.palette.primary.black,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.contrastText,
    },
    "&:focus": {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const Navbar = () => {
  const classes = styles();

  //handle username from redux store
  const username = "test";
  const isLogin = false;

  return (
    <AppBar position="static" className={classes.header}>
      <Box className={classes.logoContainer}>
        <Link href="/">
          <Typography component="a">My-courses</Typography>
        </Link>
      </Box>
      <Toolbar>
        <Box className={classes.navItemContainer}>
          <Link href="/">
            <Typography className={classes.navLink} component="a">
              Курсы
            </Typography>
          </Link>
        </Box>
        {isLogin ? (
          <>
            <Box className={classes.navItemContainer}>
              <Typography>{username}</Typography>
            </Box>
            <Box className={classes.navItemContainer}>
              <Button>Выйти</Button>
            </Box>
          </>
        ) : (
          <>
            <Box className={classes.navItemContainer}>
              <Link href="/signup">
                <Typography className={classes.navLink} component="a">
                  Регистрация
                </Typography>
              </Link>
            </Box>
            <Box className={classes.navItemContainer}>
              <Link href="/login">
                <Typography component="a" className={classes.navLink}>
                  Вход
                </Typography>
              </Link>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
