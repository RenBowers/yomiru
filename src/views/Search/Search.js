import React, { useState } from "react";
import "./Search.css";
import {
  CssBaseline,
  Container,
  makeStyles,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

const JIKAN = "https://api.jikan.moe/v3"

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
  search: {
    flexDirection: "column",
    flex: 1,
    width: "%100",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Search() {
  const classes = useStyles();

  //States
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState({});

  //functions
  const searchJikan = () => {
    fetch(`${JIKAN}/search/anime?q=${searchText}&page=1&order_by=title`)
      .then(res => res.json())
      .then(
        (result) => {
          setSearchResult(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          alert(error);
        }
      )
  }
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Search For Anime or Manga
        </Typography>
        <div className={classes.search}>
          <TextField
            variant="outlined"
            margin="normal"
            label="Search"
            id="Search"
            name="Search"
            autoFocus
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" onClick={searchJikan} >Search</Button>
        </div>
      </div>
    </Container>
  );
}

export default Search;
