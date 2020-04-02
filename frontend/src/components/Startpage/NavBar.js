import React from 'react';
import '../Homepage/navBar.css';
import { Link } from 'react-router-dom';
import logo from '../../pictures/logo.png';

const NavBar = props => (
  <header className="navbar">
    <nav className="navbarNavigation">
      <div></div>
      <div className="navbarLogo">
        <img src={logo} alt="logo-kwiatek"></img>
        <a href="/">LINGUITICA</a>
      </div>
      <div className="spacer"></div>
      <div className="navbarItems">
        <ul>
          <li>
            <h2>UŻYTKOWNIK: </h2>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default NavBar;
