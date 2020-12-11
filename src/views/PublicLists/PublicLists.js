import {
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  AddCircle,
  DeleteForever,
  ExpandLess,
  ExpandMore,
  RemoveCircle,
} from "@material-ui/icons";

import firebase from "firebase";
import './PublicLists.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  root2: {
    width: "85%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
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

function PublicLists() {
  const classes = useStyles();
  const db = firebase.firestore();

  const [currentListIDs, setCurrentListIDs] = useState([]);
  const [currentLists, setCurrenLists] = useState([]);
  const [update, setUpdate] = useState(false);
  const [collapseList, setCollapseList] = useState({});

  //Get user ID
  useEffect(() => {
    const fetchData = async () => {
      let currentIDs;
      let list = [];
      let docs = await db
        .collection("animeLists")
        .where("public", "==", true)
        .get();
      docs.forEach((doc) => {
        // currentIDs = doc.data().myAnimeLists;
        console.log("doc id", doc.id);
        console.log("doc data", doc.data());
        list.push({ id: doc.id, list: doc.data() });
      });
      setCurrenLists(list);
    };

    fetchData();
  }, [update]);

  //Remove functions
  const removeFromList = async (item) => {
    db.collection("animeLists")
      .doc(item.id)
      .update({
        contents: firebase.firestore.FieldValue.arrayRemove(item.list),
      });
  };

  //Component Functions
  const displayResults = () => {
    if (currentLists.length) {
      const mappedSearchResults = currentLists.map((item, i) => {
        // let newObj = collapseList;
        // newObj[item.id] = false;
        // setCollapseList(newObj);
        return (
          <>
            <ListItem
              key={item.list.name}
              button
              divider
              onClick={() => {
                console.log("Before", collapseList[item.id]);
                let newObj = collapseList;
                newObj[item.id] = !newObj[item.id];
                setCollapseList(newObj);
                console.log("After", collapseList[item.id]);
              }}
            >
            
              <ListItemText
                primary={item.list.name}
                primaryTypographyProps={{ variant: "h5", component: "h2" }}
              />
            </ListItem>
            {/* item.list.contents.map */}
            <List className={classes.root2}>
              {item.list.contents.map((element, i) => {
                return (
                  <ListItem
                    key={element.mal_id}
                    button
                    divider
                    onClick={() => {
                      const win = window.open(element.url, "_blank");
                      if (win != null) {
                        win.focus();
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        style={{
                          height: "100%",
                          width: "50px",
                          marginRight: 10,
                        }}
                        variant="square"
                        alt="mal anime image"
                        src={element.image_url}
                      />
                    </ListItemAvatar>
                    {/* Maybe wrap some text in typography */}
                    <ListItemText
                      primary={element.title}
                      secondary={element.synopsis}
                    />
                  </ListItem>
                );
              })}
            </List>
          </>
        );
      });
      return <List className={classes.root}>{mappedSearchResults}</List>;
    }
  };
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Here are all viewable Lists
        </Typography>
        {displayResults()}
      </div>
    </Container>
  );
};

export default PublicLists;
