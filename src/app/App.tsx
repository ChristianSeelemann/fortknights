import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FriendCompare from './pages/FriendCompare/FriendCompare';
import Friends from './pages/Friends/Friends';
import FriendStats from './pages/FriendStats/FriendStats';
import Items from './pages/Items/Items';
import Map from './pages/Map/Map';
import News from './pages/News/News';
import Stats from './pages/Stats/Stats';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/items">
          <Items />
        </Route>
        <Route path="/stats">
          <Stats />
        </Route>
        <Route path="/friends">
          <Friends />
        </Route>
        <Route path="/friendstats/:id">
          <FriendStats />
        </Route>
        <Route path="/friendcompare/:id1/:id2">
          <FriendCompare />
        </Route>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="/">
          <News />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
