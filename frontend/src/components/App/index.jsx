import React from 'react';
import { Layout } from 'antd';
import { Switch, BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';
import Login from '../Login';
import Register from '../Register';
import Guestpage from '../Guestpage';
import Homepage from '../Homepage';
import Flashsets from '../Flashsets';
import Profile from '../Profile';
import Quests from '../Quests';
import Flashcards from '../Flashcards';
import PlantCreation from '../PlantCreation';

import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Layout.Header>
          <NavBar />
        </Layout.Header>
        <Layout.Content>
          <Switch>
            <PublicRoute exact path="/" component={Guestpage} />
            <PublicRoute exact path="/register" component={Register} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/home" component={Homepage} />
            <PrivateRoute exact path="/flashsets" component={Flashsets} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/quests" component={Quests} />
            <PrivateRoute exact path="/flashcards" component={Flashcards} />
            <PrivateRoute exact path="/plantCreation" component={PlantCreation} />
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Linguitica ©2020</Layout.Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
