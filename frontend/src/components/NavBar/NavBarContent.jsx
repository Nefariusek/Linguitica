import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { Menu, Modal, Input, message } from 'antd';
import axios from 'axios';

import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';
import { Component } from 'react';

class NavBar extends Component {
  state = {
    newPassword: '',
    repeatPassword: '',
    visible: false,
    invalidData: false,
  };
  static contextType = Store;

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.context.changeStore('isLogged', false);
    this.context.changeStore('userProfile', null);
    this.context.changeStore('hasPlant', null);
    window.location.reload();
  };

  putPassword = async () => {
    await axios({
      method: 'PUT',
      url: `/api/users/${this.context.userProfile._id}/password`,
      headers: setHeaders(),
      data: {
        password: this.state.newPassword,
      },
    }).then(
      (res) => {
        console.log(res.data);
        if (res.status === 200) {
          message.success('Hasło zmienione', 3).then(
            this.setState({
              visible: true,
            }),
          );
        }
      },
      (err) => {
        message.error(err.response.data);
      },
    );
  };

  passwordValidate = () => {
    if (this.state.newPassword.length < 8) {
      message.error('Password must be at least 8 characters long.', 3);
      this.setState({ invalidData: true });
    }
    if (this.state.repeatPassword !== this.state.newPassword) {
      message.error('Both passwords must be the same.', 3);
      this.setState({ invalidData: true });
    }
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = async (e) => {
    this.setState({ invalidData: false });
    e.preventDefault();
    await this.passwordValidate();
    if (this.state.invalidData === false) {
      await this.putPassword();
    }
    this.setState({
      visible: false,
    });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        {!this.context.isLogged && (
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
        {this.context.isLogged && !this.context.hasPlant && (
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
                <Menu.Item className="menuItem" onClick={this.showModal}>
                  Zmiana hasła
                </Menu.Item>
                <Menu.Item className="menuItem" onClick={this.handleLogout}>
                  Wyloguj się
                </Menu.Item>
              </Menu>
            </div>
          </div>
        )}

        {this.context.isLogged && this.context.hasPlant && (
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
                <Menu.Item className="menuItem" onClick={this.showModal}>
                  Zmiana hasła
                </Menu.Item>
                <Modal
                  title="Zmiana hasła"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="NOWE HASŁO"
                    onChange={this.handleChange}
                    value={this.state.newPassword}
                  ></Input>

                  <Input
                    type="password"
                    name="repeatPassword"
                    placeholder="POWTÓRZ NOWE HASŁO"
                    onChange={this.handleChange}
                    value={this.state.repeatPassword}
                  ></Input>
                </Modal>
                <Menu.Item className="menuItem" onClick={this.handleLogout}>
                  Wyloguj się
                </Menu.Item>
              </Menu>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default NavBar;
