import React from 'react';
import NavBar from './NavBar';
import Body from './body';

//+ plus appbar
class startpage extends React.Component {
  render() {
    return (
      <div className="homepanel">
        <NavBar />

        <Body />
      </div>
    );
  }
}

export default startpage;
