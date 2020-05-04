import React, { useEffect, useContext } from 'react';
import { Layout } from 'antd';
import { Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios';

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
import Statistics from '../Statistics';
import Learning from '../Learning';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute';
import Store from '../../Store';

import './App.css';

const App = () => {
  const { isLogged, changeStore } = useContext(Store);

  useEffect(() => {
    if (!isLogged) return;

    (async () => {
      await axios({
        url: 'api/users/userInfo',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      }).then(
        (res) => {
          changeStore('isLogged', true);
          changeStore('userProfile', res.data);
        },
        (err) => {
          console.log(err);
        },
      );
    })();
  }, [changeStore, isLogged]);

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
            <PrivateRoute exact path="/statistics" component={Statistics} />
            <PrivateRoute exact path="/learning" component={Learning} />
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>Linguitica ©2020</Layout.Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
