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

export default function SignUp() {
  const classes = styles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  //handle redux state
  const errorsObject = {};
  const isLoading = false;

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfirmChange = (e) => setConfirmPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <Grid className={classes.form} container>
        <Grid item sm />
        <Grid item sm>
          <Typography className={classes.pageSubTitle} variant="h3">
            Регистрация
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
              value={email}
              onChange={handleEmailChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              id="username"
              name="username"
              type="text"
              label="Имя пользователя"
              helperText={errorsObject.username}
              error={errorsObject.username}
              value={username}
              onChange={handleUsernameChange}
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
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Подтверждение пароля"
              helperText={password !== confirmPassword && "Пароли не совпадают"}
              error={password !== confirmPassword && "Пароли не совпадают"}
              value={confirmPassword}
              onChange={handlePasswordConfirmChange}
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
                "Зарегистрироваться"
              )}
            </Button>
            <Link href="/login">
              <Typography component="a" className={classes.authLink}>
                Уже зарегистрированы? Войти
              </Typography>
            </Link>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </>
  );
}
