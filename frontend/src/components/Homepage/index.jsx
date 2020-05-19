import React from 'react';
import HomepageContent from './HomepageContent';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../Login';
import Flashsets from '../Flashsets';
import Profile from '../Profile';
import Quests from '../Quests';
import Flashcards from '../Flashcards';

const Homepage = () => {
  return (
    <div className="HomepageContent">
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={HomepageContent} />
        <Route exact path="/flashsets" component={Flashsets} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/quests" component={Quests} />
        <Route exact path="/flashcards" component={Flashcards} />
      </BrowserRouter>
    </div>
  );
};

export default Homepage;
