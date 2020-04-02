import React from 'react';
import startpage from './startpage';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

const startContent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/startpage" component={startpage} />
      </Switch>
    </BrowserRouter>
  );
};

export default startContent;
