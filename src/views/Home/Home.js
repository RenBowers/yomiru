import React, { useState } from 'react';
import './Home.css';
import Search from '../Search/Search';
import Profile from '../Profile/Profile';
import PublicLists from '../PublicLists/PublicLists';
import MyLists from '../MyLists/MyLists';
import { AppBar, Tabs, Tab } from '@material-ui/core';


function Home() {

  const [tabValue, setTabValue] = useState(0);

  const tabChangeHandler = (event, newVal) => {
    setTabValue(newVal);
  };

  const currentTab = () => {
    switch(tabValue) {
      case 0:
        return <Search />
      case 1:
        return <PublicLists />
      case 2:
        return <MyLists />
      case 3:
        return <Profile />
      default:
        return;
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={tabChangeHandler} scrollButtons="auto" variant="scrollable">
          <Tab label="Search" />
          <Tab label="Public Lists" />
          <Tab label="My Lists" />
          <Tab label="Profile" />
        </Tabs>
      </AppBar>
      {currentTab()}
    </div>
  );
};

export default Home;