import React, { useState } from "react";
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
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import "./SignUp.css";

function SignUp({ history }) {
  const classes = useStyles();
  // State
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handlers
  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };
  const emailHandler = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const signUp = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/home");
        const uuid = firebase.auth().currentUser.uid;
        const storeUser = {
          userName,
          email,
          id: uuid,
          myAnimeLists: [],
        };

        firebase.firestore().collection("users").add(storeUser);
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
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="User Name"
          id="User Name"
          name="User Name"
          autoComplete="User Name"
          autoFocus
          value={userName}
          onChange={userNameHandler}
        />
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
          onClick={signUp}
        >
          Sign Up
        </Button>
      </div>
    </Container>
  );
}

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

export default SignUp;
