import React, { useEffect, useState } from "react";
import "./Search.css";
import firebase from "firebase";
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
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Checkbox,
  ListItemIcon,
} from "@material-ui/core";
import { AddCircle, CheckBox } from "@material-ui/icons";

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
  const db = firebase.firestore();

  //States
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDocID, setUserDocID] = useState("");

  //List States
  const [currentAnimeLists, setCurrentAnimeLists] = useState(null);
  const [currentMangaLists, setCurrentMangaLists] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [listType, setListType] = useState("Anime");
  const [listName, setListName] = useState("");
  const [publicList, setPublicList] = useState(false);
  const [newList, setNewList] = useState(false);

  //Use Effects
  //Get user ID
  useEffect(() => {
    db.collection("users")
      .where("id", "==", firebase.auth().currentUser.uid)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          setUserDocID(doc.id);
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      var listIDs = [];
      await db
        .collection("users")
        .where("id", "==", firebase.auth().currentUser.uid)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            listIDs = doc.data().myAnimeLists;
            console.log("listIds", listIDs);
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
      var lists = [];
      for (const id of listIDs) {
        let name;
        await db
          .collection("animeLists")
          .doc(id)
          .get()
          .then((doc) => {
            name = doc.data().name;
            console.log(name);
          })
          .catch((error) => {
            console.log("getListsNames", error);
            alert("getListsNames", error);
          });
        lists.push({ id, name });
      }
      console.log("nameLists", lists);
      setCurrentAnimeLists(lists);
    };
    fetchData();
    // !selectedItem && selectedItem.episodes !== undefined
    //   ? setListType("Anime")
    //   : setListType("Manga");
  }, [newList, dialogOpen, db]);

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

  const promptAddToList = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
    console.log("currentAnimeLists", currentAnimeLists);
  };

  const createList = async () => {
    const storeItem = {
      contents: [selectedItem],
      name: listName,
      public: publicList,
      owner: firebase.auth().currentUser.uid,
    };

    let listDoc;
    listDoc = await db.collection("animeLists").add(storeItem);

    db.collection("users")
      .doc(userDocID)
      .update({
        myAnimeLists: firebase.firestore.FieldValue.arrayUnion(listDoc.id),
      })
      .then(() => {
        console.log(listType + " List Created!");
      });
    setPublicList(false);
    setListName("");
    setSelectedItem(null);
    setNewList(false);
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
              <IconButton onClick={() => promptAddToList(item)}>
                <AddCircle />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
      return <List>{mappedSearchResults}</List>;
    }
  };

  const displayDialogContent = () => {
    if (selectedItem) {
      if (
        !newList &&
        ((currentAnimeLists && listType === "Anime") ||
          (currentMangaLists && listType === "Manga"))
      ) {

        const test = currentAnimeLists.map((item, i) => {
          console.log("listItems", item);
          return (
            <ListItem
              key={item.id}
              button
              divider
              onClick={() => {
                db.collection("animeLists")
                  .doc(item.id)
                  .update({
                    contents: firebase.firestore.FieldValue.arrayUnion(
                      selectedItem
                    ),
                  })
                  .then(() => {
                    console.log(listType + " List Created!");
                  });
                setDialogOpen(false);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          );
        });
        console.log(test);
        return (
          <>
            <DialogTitle id="simple-dialog-title">
              Select List to Add to
            </DialogTitle>
            <List>
              {test}
              <ListItem
                button
                divider
                onClick={() => {
                  setNewList(true);
                }}
              >
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="Create New List" />
              </ListItem>
            </List>
          </>
        );
      } else {
        return (
          <>
            <DialogTitle id="List Creator">
              Create New {listType} List
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="normal"
                id="name"
                label="List Name"
                fullWidth
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Typography variant="body1">Public List</Typography>
              <Checkbox
                checked={publicList}
                onChange={() => setPublicList(!publicList)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <Button onClick={() => setDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  createList();
                  setDialogOpen(false);
                }}
                color="primary"
              >
                Create
              </Button>
            </DialogActions>
          </>
        );
      }
    }
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Search For Anime
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
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-labelledby="Add to List"
          maxWidth={false}
        >
          {displayDialogContent()}
        </Dialog>
      </div>
    </Container>
  );
}

export default Search;
