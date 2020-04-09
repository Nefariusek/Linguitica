import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Guestpage from './components/Guestpage';
import Homepage from './components/Homepage';
import Flashsets from './components/Flashsets';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Guestpage} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/flashsets" component={Flashsets} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
