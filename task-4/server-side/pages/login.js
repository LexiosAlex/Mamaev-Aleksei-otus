import React, { useState } from "react";

import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import Navbar from "../components/Navbar";

const styles = makeStyles((theme) => ({
  form: {
    marginTop: "100px",
    textAlign: "center",
  },
  pageSubTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
  },
  customError: {
    marginTop: 10,
    color: "red",
    fontSize: "0.8rem",
  },
  authForm: {
    display: "flex",
    flexDirection: "column",
  },
  authLink: {
    cursor: "pointer",
    marginTop: 15,
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
    "&:focus": {
      color: theme.palette.primary.dark,
    },
  },
}));

export default function SignIn() {
  const classes = styles();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleEmailChange = (e) => setEmailValue(e.target.value);
  const handlePasswordChange = (e) => setPasswordValue(e.target.value);
  //handle redux state
  const errorsObject = {};
  const isLoading = false;

  const handleSubmit = (event) => {
    event.preventDefault();

    //handle Redux events
  };
  return (
    <>
      <Navbar />
      <Grid className={classes.form} container>
        <Grid item sm />
        <Grid item sm>
          <Typography className={classes.pageSubTitle} variant="h3">
            Вход
          </Typography>
          <form className={classes.authForm} noValidate onSubmit={handleSubmit}>
            <TextField
              className={classes.textField}
              id="email"
              name="email"
              type="email"
              label="Электронная почта"
              helperText={errorsObject.email}
              error={errorsObject.email}
              value={emailValue}
              onChange={handleEmailChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              id="password"
              name="password"
              type="password"
              label="Пароль"
              helperText={errorsObject.password}
              error={errorsObject.password}
              value={passwordValue}
              onChange={handlePasswordChange}
              fullWidth
            />
            {(errorsObject.general || errorsObject.error) && (
              <Typography variant="body2" className={classes.customError}>
                {errorsObject.general}
                {errorsObject.error}
              </Typography>
            )}
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  size={30}
                  className={classes.progress}
                  color="primary"
                />
              ) : (
                "Login"
              )}
            </Button>
            <Link href="/signup">
              <Typography component="a" className={classes.authLink}>
                Нет аккаунта? Зарегистрируйтесь
              </Typography>
            </Link>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </>
  );
}
