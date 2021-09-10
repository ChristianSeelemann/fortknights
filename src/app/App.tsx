import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import News from './pages/News/News';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/news">
          <main>
            <News />
          </main>
        </Route>
        <Route path="/">
          <main>
            <News />
          </main>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
