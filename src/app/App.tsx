import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import News from './pages/News/News';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/">
          <News />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
