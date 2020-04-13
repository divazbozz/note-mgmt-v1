import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import * as firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    width: "70%",
  },
  buttonRoot: {
    marginTop: "2px",
  },
}));
const Login = () => {
  const classes = useStyles();

  const [email, _setEmail] = useState("");
  const setEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    _setEmail(event.target.value as string);
  };
  const [password, _setPassword] = useState("");
  const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    _setPassword(event.target.value as string);
  };
  const onLogin = (_event: React.MouseEvent) => {
    console.log(`[onLogin]`);
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch((e) => {
      console.log(e.message);
    });
  };
  return (
    <div className={classes.root}>
      <TextField
        label="Email"
        value={email}
        fullWidth={true}
        variant="standard"
        onChange={setEmail}
      />
      <TextField
        label="Password"
        fullWidth={true}
        value={password}
        variant="standard"
        onChange={setPassword}
        type="password"
      />
      <Grid container className={classes.buttonRoot} spacing={1}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={onLogin}>
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Sign up (dead)
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
