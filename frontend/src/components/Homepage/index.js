import React from 'react';
import HomePanel from './homePanel';
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
