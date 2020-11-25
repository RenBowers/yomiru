import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCAu9-6mGwfTrbxw6XJJOBCQ-7W2q03-XI",
  authDomain: "yomiru-2b533.firebaseapp.com",
  databaseURL: "https://yomiru-2b533.firebaseio.com",
  projectId: "yomiru-2b533",
  storageBucket: "yomiru-2b533.appspot.com",
  messagingSenderId: "703209185546",
  appId: "1:703209185546:web:91b53a3325f1a2a131daf3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
