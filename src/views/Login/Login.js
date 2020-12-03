import React, { useState } from "react";
import "./Login.css";
import firebase from "firebase";
import {
  CssBaseline,
  Container,
  makeStyles,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ history }) {
  const classes = useStyles();

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handlers
  const emailHandler = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={emailHandler}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={passwordHandler}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          onClick={login}
        >
          Login
        </Button>
        {/* <Link to='/signup'> */}
          <Button to="/signup" component={Link} variant="contained" color="primary" type="submit" className={classes.submit} fullWidth>
            Create Account
          </Button>
        {/* </Link> */}
      </div>
    </Container>
  );
}

export default Login;
