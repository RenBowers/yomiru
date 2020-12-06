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
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

const JIKAN = "https://api.jikan.moe/v3";

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
    flexDirection: "row",
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
      .then((res) => res.json())
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
          alert("searchJikan", error);
        }
      );
  };

  //Component Functions
  const displayResults = () => {
    if (searchResult !== undefined && searchResult.results !== undefined) {
      const mappedSearchResults = searchResult.results.map((item, i) => {
        return (
          <ListItem
            key={item.mal_id}
            button
            divider
            onClick={() => {
              const win = window.open(item.url, "_blank");
              if (win != null) {
                win.focus();
              }
            }}
          >
            <ListItemAvatar>
              <Avatar
                style={{ height: "100%", width: "100px", marginRight: 10 }}
                variant="square"
                alt="mal anime image"
                src={item.image_url}
              />
            </ListItemAvatar>
            {/* Maybe wrap some text in typography */}
            <ListItemText primary={item.title} secondary={item.synopsis} />
            <ListItemSecondaryAction>
              <IconButton>
                <AddCircle />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
      return <List>{mappedSearchResults}</List>;
    }
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Search For Anime or Manga
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <TextField
            variant="outlined"
            margin="normal"
            label="Search"
            id="Search"
            name="Search"
            autoFocus
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Box marginLeft={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={searchJikan}
            >
              Search
            </Button>
          </Box>
        </Grid>
        {displayResults()}
      </div>
    </Container>
  );
}

export default Search;
