import React, {useState} from 'react';
import firebase from 'firebase'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import SignUp from './views/SignUp/SignUp';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserID, setCurrentUserID] = useState("");
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setCurrentUserID(user.uid);
    } 
  })
  return (
    <Router>
      <div className="App">
        <Switch>  
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          {(currentUserID !== "") ?
          <>
              <Route path="/home" component={Home} />
          </> : <Redirect to="/" />}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
