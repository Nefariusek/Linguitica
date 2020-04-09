import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Layout, Menu } from 'antd';

const { Header } = Layout;
const NavBar = (props) => (
  <Layout className="layout-navbar">
    <Header className="header">
      <div className="logo">
        <img src={logo} alt="logo-kwiatek"></img>
        <a href="/">LINGUITICA</a>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} className="menuBar">
        <Menu.Item key="1" className="menuItem">
          <Link to="/flashsets">Twoje zestawy</Link>
        </Menu.Item>
        <Menu.Item key="2" className="menuItem">
          <Link to="/login">Zaloguj się</Link>
        </Menu.Item>
        <Menu.Item key="3" className="menuItem">
          <Link to="/register">Zarejestruj się</Link>
        </Menu.Item>
      </Menu>
    </Header>
  </Layout>

  /*<header className="navbar">
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
            <Link to="/login">Zaloguj się</Link>
          </li>
          <li>
            <Link to="/register">Zarejestruj się</Link>
          </li>
        </ul>
      </div>
    </nav>
  </header> */
);

export default NavBar;
