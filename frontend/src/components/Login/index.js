import React from 'react';
import LoginPanel from './loginPanel';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

const LoginContent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPanel} />
      </Switch>
    </BrowserRouter>
  );
};

export default LoginContent;
