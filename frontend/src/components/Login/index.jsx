import React from 'react';
import LoginPanel from './LoginPanel';
import { Route, BrowserRouter } from 'react-router-dom';
import PasswordReset from './PasswordReset';
import Register from '../Register';
import Homepage from '../Homepage';

const Login = () => {
  return (
    <div className="loginPanel">
      <BrowserRouter>
        <Route exact path="/login" component={LoginPanel} />
        <Route exact path="/passwordreset" component={PasswordReset} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Homepage} />
      </BrowserRouter>
    </div>
  );
};

export default Login;
