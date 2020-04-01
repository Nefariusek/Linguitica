import React from 'react';
import RegisterPanel from './registerPanel';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

const RegisterContent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={RegisterPanel} />
      </Switch>
    </BrowserRouter>
  );
};

export default RegisterContent;
