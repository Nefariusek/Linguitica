import React from 'react';
import ReactDOM from 'react-dom';
import Login from './views/Login';
import Register from './views/Register';
import Homepage from './components/Homepage/Homepage';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PasswordReset from './components/Login/passwordReset';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/homepage" component={Homepage} />
        <Route exact path="/" component={Login} />
        <Route exact path="/login/passwordreset" component={PasswordReset} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
