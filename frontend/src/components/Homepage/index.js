import React from 'react';
import HomePanel from './Homepage';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

const HomeContent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/homepanel" component={HomePanel} />
      </Switch>
    </BrowserRouter>
  );
};

export default HomeContent;
