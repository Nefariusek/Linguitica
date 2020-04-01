import React from 'react';
import ReactDOM from 'react-dom';
import Login from './views/Login';
import Register from './views/Register';
import Homepage from './components/Homepage/Homepage';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/homepage" component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
