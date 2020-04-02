import React, { Component } from 'react';
import Body from './body';
import NavBar from './NavBar';

class Homepage extends Component {
  render() {
    return (
      <div className="homepanel">
        <NavBar />
        <Body />
      </div>
    );
  }
}

export default Homepage;
