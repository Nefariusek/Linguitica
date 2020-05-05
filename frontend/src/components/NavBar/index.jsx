import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Menu } from 'antd';
import { useContext } from 'react';
import Store from '../../Store';

const NavBar = () => {
  const { isLogged, changeStore, hasPlant } = useContext(Store);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    changeStore('isLogged', false);
    changeStore('userProfile', null);
    changeStore('hasPlant', null);
    window.location.reload();
  };

  return (
    <>
      {!isLogged && (
        <>
          <div className="logo">
            <img src={logo} alt="logo-kwiatek"></img>
            <a href="/">LINGUITICA</a>
          </div>
          <Menu theme="dark" mode="horizontal" className="menuBar">
            <Menu.Item key="2" className="menuItem">
              <Link to="/login">Zaloguj się</Link>
            </Menu.Item>
            <Menu.Item key="3" className="menuItem">
              <Link to="/register">Zarejestruj się</Link>
            </Menu.Item>
          </Menu>
        </>
      )}
      {isLogged && !hasPlant && (
        <div className="mainBar">
          <div className="leftBar">
            <Menu theme="dark" mode="horizontal" className="menuBar">
              <Menu.Item className="menuItem">
                <Link to="/plantCreation">Tworzenie rośliny</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="rightBar">
            <Menu theme="dark" mode="horizontal" className="menuBar">
              <Menu.Item className="menuItem">
                <Link to="/profile">Profil</Link>
              </Menu.Item>
              <Menu.Item className="menuItem" onClick={handleLogout}>
                Wyloguj się
              </Menu.Item>
            </Menu>
          </div>
        </div>
      )}

      {isLogged && hasPlant && (
        <div className="mainBar">
          <div className="leftBar">
            <Menu theme="dark" mode="horizontal" className="menuBar">
              <Menu.Item className="menuItem">
                <Link to="/home">Home</Link>
              </Menu.Item>
              <Menu.Item className="menuItem">
                <Link to="/flashsets">Zestawy</Link>
              </Menu.Item>
              <Menu.Item className="menuItem">
                <Link to="/quests">Zadania</Link>
              </Menu.Item>
              <Menu.Item className="menuItem">
                <Link to="/flashcards">Fiszki</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="rightBar">
            <Menu theme="dark" mode="horizontal" className="menuBar">
              <Menu.Item className="menuItem">
                <Link to="/profile">Profil</Link>
              </Menu.Item>
              <Menu.Item className="menuItem" onClick={handleLogout}>
                Wyloguj się
              </Menu.Item>
            </Menu>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
