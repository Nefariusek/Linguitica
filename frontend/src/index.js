import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './components/Homepage/Homepage';
import Login from './views/Login';
import Register from './views/Register';
import Startpage from './components/Startpage';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PasswordReset from './components/Login/passwordReset';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/passwordreset" component={PasswordReset} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/startpage" component={Startpage} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
